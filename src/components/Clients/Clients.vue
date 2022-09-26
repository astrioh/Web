<template>
  <NavbarSearchLimit
    v-if="showFreeModal"
    @cancel="showFreeModal = false"
  />
  <ModalBoxAddClient
    v-if="showAddClient"
    title="Добавить клиента"
    @cancel="showAddClient = false"
    @save="onAddNewClient"
  />
  <NavBarClients
    title="Контакты"
    class="pt-[8px]"
    @search="requestClients"
    @clickAddClient="clickAddClient"
  />
  <div
    class="bg-white rounded-xl min-h-[80%] px-[40px] py-[20px]"
  >
    <table>
      <tr>
        <th>Имя</th>
        <th>Номер телефона</th>
        <th>Email</th>
        <th>Комментарий</th>
      </tr>
      <ClientsSkeleton v-if="status === 'loading'" />
      <template v-if="status === 'success'">
        <tr
          v-for="client in clients"
          :key="client?.uid"
          :class="client?.uid === selectedClient?.uid ? 'bg-[#F4F5F7]' : ''"
          @click.stop="showClientProperties(client)"
        >
          <td>
            <div class="content max-w-[150px] xl:max-w-[250px]">
              <span class="truncate">
                {{ client.name }}
              </span>
            </div>
          </td>
          <td>
            <div class="content max-w-[150px] xl:max-w-[250px]">
              <span class="truncate">
                {{ client.phone }}
              </span>
            </div>
          </td>
          <td>
            <div class="content max-w-[150px] xl:max-w-[250px]">
              <span class="truncate">
                {{ client.email }}
              </span>
            </div>
          </td>
          <td>
            <div class="content max-w-[150px] xl:max-w-[250px]">
              <span class="truncate">
                {{ client.comment }}
              </span>
            </div>
          </td>
        </tr>
      </template>
    </table>
  </div>
  <Pagination
    v-model="currentPage"
    class="my-3 flex justify-center"
    :disabled="status === 'loading'"
    :total="paging.pages"
    :max-visible-buttons="6"
    @update:modelValue="changePage"
  />
</template>
<script>
// письма с интегрированного email
import * as IMAP from '@/store/actions/imap.js'

import * as CLIENTS from '@/store/actions/clients'
import * as CLIENTS_CHAT from '@/store/actions/clientfilesandmessages.js'
import NavBarClients from '@/components/Clients/NavBarClients.vue'
import ModalBoxAddClient from './ModalBoxAddClient.vue'
import ClientsSkeleton from '@/components/Clients/ClientsSkeleton.vue'
import Pagination from '../Pagination.vue'

export default {
  components: {
    NavBarClients,
    ModalBoxAddClient,
    ClientsSkeleton,
    Pagination
  },
  data () {
    return {
      showAddClient: false,
      currentPage: 1,
      wasLoaded: true
    }
  },
  computed: {
    clients () {
      return this.$store.state.clients.clients
    },
    selectedClient () {
      return this.$store.state.clients.selectedClient
    },
    paging () {
      return this.$store.state.clients.paging
    },
    status () {
      return this.$store.state.clients.status
    },
    user () {
      return this.$store.state.user.user
    },
    currentPageRouter () {
      return Number(this.$route.query.page) || 1
    }
  },
  watch: {
    status (value) {
      value === 'loading' && (this.wasLoaded = true)
    },
    async clients () {
      if (!this.wasLoaded) await this.requestClients()
      this.wasLoaded = false
    },
    currentPageRouter () {
      this.requestClients()
    }
  },
  mounted () {
    this.requestClients()
  },
  methods: {
    async requestClients () {
      if (this.$route.query.page < 1) {
        this.$router.push('/clients?page=1')
        this.$route.query.page = 1
      }
      this.currentPage = this.$route.query.page || 1
      const data = {
        organization: this.user?.owner_email,
        page: this.currentPage
      }
      if (this.$route.query.search && !(this.$store.state.user.user.tarif === 'free' || this.$store.getters.isLicenseExpired)) {
        data.search = this.$route.query.search
      }
      await this.$store.dispatch(CLIENTS.GET_CLIENTS, data)
      if (this.currentPageRouter > this.paging.pages) {
        this.currentPage = this.paging.pages
        this.changePage()
      }
    },
    showClientProperties (client) {
      this.$store.dispatch(IMAP.IMAP_GET_USER_MSGS)
      this.$store.dispatch(CLIENTS_CHAT.MESSAGES_REQUEST, client.uid)
      if (!this.isPropertiesMobileExpanded) {
        this.$store.dispatch('asidePropertiesToggle', true)
      }
      this.$store.commit('basic', { key: 'propertiesState', value: 'client' })
      this.$store.commit(CLIENTS.SELECT_CLIENT, client)
    },
    clickAddClient () {
      this.showAddClient = true
    },
    async onAddNewClient (client) {
      const clientToSend = {
        uid: client.uid,
        organization: this.user?.owner_email,
        name: client.name,
        email: client.email,
        phone: client.phone,
        comment: client.comment
      }
      await this.$store.dispatch(CLIENTS.ADD_NEW_CLIENT, clientToSend)
      this.showAddClient = false
      if (Number(this.$route.query.page) === this.paging.pages) await this.requestClients()
      await this.$router.push({ path: '/clients', query: { page: this.paging.pages } })
    },
    changePage () {
      this.$router.push({ path: '/clients', query: { page: this.currentPage } })
    }
  }
}
</script>

<style scoped>
table {
  @apply w-full mt-[20px] border-separate;
  border-spacing: 0;
}

/*Стили для первой строки с заголовками*/

tr:first-child {
  @apply text-left h-[48px]
}

tr:first-child th {
  @apply pl-[20px] border-[#e6e6e6] border text-[14px] font-medium;
  border-spacing: 0 20px;
}

tr:first-child th:first-child {
  @apply rounded-l-[6px]
}

tr:first-child th:last-child {
  @apply rounded-r-[6px]
}

tr:first-child th:not(:last-child){
  border-right: 1px;
}

/*Стили для контентной части*/

tr:not(:first-child) {
  @apply min-h-[58px] align-top
}

tr:not(:first-child) td {
  @apply border-b-2 border-[#e6e6e6] pl-[14px] font-normal text-[13px] max-w-[400px]
}

tr:not(:first-child) td:first-child {
  @apply rounded-l-[6px]
}

tr:not(:first-child) td:last-child {
  @apply rounded-r-[6px]
}

.content {
  @apply min-h-[48px] flex items-center
}

/*Стили для первого контентного элемента (отступ сверху)*/
tr:nth-child(2) {
  @apply min-h-[74px]
}

/*Стили наведения курсора мыши*/
tr:not(:first-child):hover {
  @apply bg-[#f4f5f7] cursor-pointer
}
</style>
