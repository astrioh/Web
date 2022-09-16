<template>
  <ModalBoxAddClient
    v-if="showAddClient"
    title="Добавить клиента"
    @cancel="showAddClient = false"
    @save="onAddNewClient"
  />
  <NavBarClients
    title="Контакты"
    class="pt-[8px]"
  />
  <div
    class="bg-white rounded-xl h-[80%] px-[40px] py-[20px]"
  >
    <table>
      <tr>
        <th>Имя</th>
        <th>Номер телефона</th>
        <th>Email</th>
        <th>Комментарий</th>
      </tr>
      <template v-if="status === 'success'">
        <tr
          v-for="client in clients"
          :key="client.uid"
          @click.stop="showClientProperties(client)"
        >
          <td>
            <div class="content max-w-[250px]">
              <span class="truncate">
                {{ client.name }}
              </span>
            </div>
          </td>
          <td>
            <div class="content max-w-[250px]">
              <span class="truncate">
                {{ client.phone }}
              </span>
            </div>
          </td>
          <td>
            <div class="content max-w-[250px]">
              <span class="truncate">
                {{ client.email }}
              </span>
            </div>
          </td>
          <td>
            <div class="content max-w-[250px]">
              <span class="truncate">
                {{ client.comment }}
              </span>
            </div>
          </td>
        </tr>
      </template>
    </table>

    <template v-if="status === 'loading'">
      <div
        role="status"
        class="p-4 animate-pulse dark:divide-gray-700 md:p-6"
      >
        <div class="flex justify-between items-center">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div class="flex justify-between items-center pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    </template>
    <div
      class="group flex justify-center border border-[#0000001F] rounded-[7px] p-[7px] mt-[15px] cursor-pointer"
      @click="clickAddClient"
    >
      <button
        class="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] bg-[#E8EAED] group-hover:transition group-hover:opacity-[0.8]"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.93008 0.644792L5.99972 0.640625C6.14551 0.640644 6.28623 0.69417 6.39518 0.791051C6.50413 0.887931 6.57373 1.02143 6.59079 1.16622L6.59496 1.23586V5.40253H10.7616C10.9074 5.40255 11.0481 5.45607 11.1571 5.55296C11.266 5.64984 11.3356 5.78333 11.3527 5.92813L11.3569 5.99777C11.3568 6.14356 11.3033 6.28428 11.2064 6.39323C11.1096 6.50218 10.9761 6.57178 10.8313 6.58884L10.7616 6.59301H6.59496V10.7597C6.59494 10.9055 6.54141 11.0462 6.44453 11.1551C6.34765 11.2641 6.21416 11.3337 6.06936 11.3507L5.99972 11.3549C5.85393 11.3549 5.71321 11.3014 5.60426 11.2045C5.49531 11.1076 5.42571 10.9741 5.40865 10.8293L5.40448 10.7597V6.59301H1.23782C1.09202 6.59299 0.951306 6.53946 0.842357 6.44258C0.733407 6.3457 0.663803 6.2122 0.646745 6.06741L0.642578 5.99777C0.642597 5.85197 0.696123 5.71126 0.793004 5.60231C0.889884 5.49336 1.02338 5.42375 1.16817 5.4067L1.23782 5.40253H5.40448V1.23586C5.4045 1.09007 5.45803 0.949353 5.55491 0.840404C5.65179 0.731454 5.78529 0.66185 5.93008 0.644792L5.99972 0.640625L5.93008 0.644792Z"
            fill="#4C4C4D"
          />
        </svg>
      </button>
    </div>
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
import * as CLIENTS from '@/store/actions/clients'
import * as CLIENTS_CHAT from '@/store/actions/clientfilesandmessages.js'
import NavBarClients from '@/components/Clients/NavBarClients.vue'
import ModalBoxAddClient from './ModalBoxAddClient.vue'
import Pagination from '../Pagination.vue'

export default {
  components: {
    NavBarClients,
    ModalBoxAddClient,
    Pagination
  },
  data () {
    return {
      selectedClient: '',
      showAddClient: false,
      currentPage: 0
    }
  },
  computed: {
    clients () {
      return this.$store.state.clients.clients
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
      return this.$route.query.page
    }
  },
  watch: {
    isPropertiesMobileExpanded: {
      immediate: true,
      handler: function (val) {
        if (!val) {
          this.selectedClient = ''
        }
      }
    },
    currentPageRouter () {
      this.$store.dispatch(CLIENTS.GET_CLIENTS, { organization: this.user?.owner_email, page: this.$route.query.page || 0 })
    }
  },
  mounted () {
    this.currentPage = this.$route.query.page && 0
    this.$store.dispatch(CLIENTS.GET_CLIENTS, { organization: this.user?.owner_email, page: this.$route.query.page || 0 })
  },
  methods: {
    showClientProperties (client) {
      this.$store.dispatch(CLIENTS_CHAT.MESSAGES_REQUEST, '33')
        .then((resp) => {
          console.log('resp from clii', resp)
        })
      if (!this.isPropertiesMobileExpanded) {
        this.$store.dispatch('asidePropertiesToggle', true)
      }
      this.selectedClient = client.email
      this.$store.commit('basic', { key: 'propertiesState', value: 'client' })
      this.$store.commit(CLIENTS.SELECT_CLIENT, client.uid)
    },
    clickAddClient () {
      this.showAddClient = true
    },
    onAddNewClient (client) {
      const clientToSend = {
        uid: client.uid,
        organization: this.user?.owner_email,
        name: client.name,
        email: client.email,
        phone: client.phone,
        comment: client.comment
      }
      this.$store.dispatch(CLIENTS.ADD_NEW_CLIENT, clientToSend)
        .then(() => {
          this.showAddClient = false
        })
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
