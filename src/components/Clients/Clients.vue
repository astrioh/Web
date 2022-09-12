<template>
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
</template>
<script>
import * as CLIENTS from '@/store/actions/clients'

export default {
  data () {
    return {
      selectedClient: ''
    }
  },
  computed: {
    clients () {
      return this.$store.state.clients.clients
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
  methods: {
    showClientProperties (client) {
      if (!this.isPropertiesMobileExpanded) {
        this.$store.dispatch('asidePropertiesToggle', true)
      }

      this.selectedClient = client.email

      this.$store.commit('basic', { key: 'propertiesState', value: 'client' })
      this.$store.commit(CLIENTS.SELECT_CLIENT, this.$store.state.clients.clientsObj[client.uid])
    }
  }
}
</script>

<style scoped>
table {
  @apply w-[calc(100%-40px)] mx-[20px] mt-[20px] border-separate border-spacing-0
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
</style>
