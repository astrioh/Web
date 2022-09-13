<template>
  <ModalBoxAddClient
    v-if="showAddClient"
    title="Добавить клиента"
    @cancel="showAddClient = false"
    @save="onAddNewClient"
  />
  <NavBar
    title="Контакты"
    class="pt-[8px]"
  />
  <div class="bg-white rounded-xl min-h-[75%] p-[20px]">
    <table>
      <tr>
        <th>Имя</th>
        <th>Номер телефона</th>
        <th>Email</th>
        <th>Комментарий</th>
      </tr>
      <tr
        v-for="client in clients"
        :key="client.uid"
        @click.stop="showClientProperties(client)"
      >
        <td>
          <div class="content">
            {{ client.name }}
          </div>
        </td>
        <td>
          <div class="content">
            {{ client.phone }}
          </div>
        </td>
        <td>
          <div class="content">
            {{ client.email }}
          </div>
        </td>
        <td>
          <div class="content">
            {{ client.comment }}
          </div>
        </td>
      </tr>
    </table>
    <div class="flex justify-center">
      <button
        class="flex items-center justify-center rounded-[8px] mt-5 w-auto mb-5 bg-[#F2B679] px-[40px] py-[12px] hover:transition hover:opacity-[0.8]"
        @click="clickAddClient"
      >
        Добавить нового клиента
      </button>
    </div>
  </div>
  <Pagination
    v-model="currentPage"
    class="mt-3 flex justify-center"
    total="210"
    :max-visible-buttons="3"
    @update:modelValue="changePage"
  />
</template>
<script>
import * as CLIENTS from '@/store/actions/clients'
import NavBar from '@/components/Navbar/NavBar'
import ModalBoxAddClient from './ModalBoxAddClient.vue'
import Pagination from '../Pagination.vue'

export default {
  components: {
    NavBar,
    ModalBoxAddClient,
    Pagination
  },
  data () {
    return {
      selectedClient: '',
      showAddClient: false,
      currentPage: 1
    }
  },
  computed: {
    clients () {
      return this.$store.state.clients.clients
    },
    user () {
      return this.$store.state.user.user
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
    }
  },
  mounted () {
    this.$store.dispatch(CLIENTS.GET_CLIENTS, this.user?.owner_email)
  },
  methods: {
    showClientProperties (client) {
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
      console.log(this.currentPage)
    }
  }
}
</script>

<style scoped>
table {
  @apply w-[calc(100%-40px)] mx-[20px] mt-[20px] border-separate
}

/*Стили для первой строки с заголовками*/

tr:first-child {
  @apply text-left h-[48px]
}

tr:first-child th {
  @apply pl-[20px] border-[#e6e6e6] border-2 text-[14px] font-medium;
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

tr:nth-child(2) .content {
  @apply mt-[16px]
}

/*Стили наведения курсора мыши*/
tr:not(:first-child):hover {
  @apply bg-[#f4f5f7] cursor-pointer
}
</style>
