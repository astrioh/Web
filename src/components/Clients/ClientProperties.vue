<template>
  <ModalBoxDelete
    v-if="showConfirm"
    title="Удалить клиента"
    class="break-words"
    :text="`Вы действительно хотите удалить клиента ${selectedClient.name}?`"
    @cancel="showConfirm = false"
    @yes="removeClient"
  />
  <div class="flex justify-between items-center">
    <PopMenu>
      <PropsButtonMenu />
      <template #menu>
        <PopMenuItem
          icon="delete"
          @click="showConfirm = true"
        >
          Удалить
        </PopMenuItem>
      </template>
    </PopMenu>
    <PropsButtonClose @click="closeProperties" />
  </div>
  <div
    v-if="ClientStub"
    class="flex-none mt-[20px] w-[82px] h-[82px] bg-cover bg-center bg-origin-content bg-clip-content rounded-[14px]"
    :style="{
      'background-image': `url(${ClientStub})`
    }"
  />
  <input
    v-model="currClientName"
    type="text"
    maxlength="50"
    placeholder="Имя сотрудника"
    class="mt-[25px] p-0 font-roboto font-bold text-[18px] leading-[21px] text-[#424242] w-full border-none focus:ring-0 focus:outline-none"
    @blur="renameClient"
  >
  <div
    v-if="selectedClientEmail"
    class="mt-[30px] font-roboto text-[16px] leading-[19px] font-medium text-[#4c4c4d]"
  >
    Email
  </div>
  <div
    v-if="selectedClientEmail"
    class="mt-[15px] w-full font-roboto text-[15px] leading-[18px] text-[#606061] overflow-hidden text-ellipsis whitespace-nowrap"
  >
    {{ selectedClientEmail }}
  </div>
  <div
    v-if="selectedClientPhone"
    class="mt-[30px] font-roboto text-[16px] leading-[19px] font-medium text-[#4c4c4d]"
  >
    Телефон
  </div>
  <div
    v-if="selectedClientPhone"
    class="mt-[15px] w-full font-roboto text-[15px] leading-[18px] text-[#606061] overflow-hidden text-ellipsis whitespace-nowrap"
  >
    {{ selectedClientPhone }}
  </div>

  <ClientChat />

  <div class="flex flex-col fixed bottom-[0px] w-[340px] bg-white pt-2 pb-5">
    <ClientMessageQuoteUnderInput
      v-if="currentQuote"
      class="quote-request border-l-2 border-[#7E7E80] h-[40px]"
      :quote-message="currentQuote"
      :employee="employees[currentQuote.uid_creator]"
      @onClearQuote="currentQuote = false"
    />
    <ClientMessageInput
      v-model="cardMessageInputValue"
      :can-add-files="canAddFiles"
      @createCardMessage="createCardMessage"
      @createCardFile="createCardFile"
      @onPaste="onPasteEvent"
    />
  </div>
</template>
<script>
import PropsButtonClose from '@/components/Common/PropsButtonClose.vue'
import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'
import ModalBoxDelete from '@/components/Common/ModalBoxDelete.vue'
import PropsButtonMenu from '@/components/Common/PropsButtonMenu.vue'
import ClientChat from '@/components/Clients/ClientChat.vue'
import ClientMessageQuoteUnderInput from '@/components/Clients/ClientMessageQuoteUnderInput.vue'
import ClientMessageInput from '@/components/Clients/ClientMessageInput.vue'
import * as CLIENTS from '@/store/actions/clients'

export default {
  components: {
    PropsButtonClose,
    PopMenuItem,
    PropsButtonMenu,
    ModalBoxDelete,
    PopMenu,
    ClientChat,
    ClientMessageQuoteUnderInput,
    ClientMessageInput
  },
  data () {
    return {
      currClientName: '',
      showConfirm: false,
      cardMessageInputValue: ''
    }
  },
  computed: {
    isCanDeleteClient () {
      const employees = this.$store.state.employees.employees
      const user = this.$store.state.user.user
      const userType = employees[user.current_user_uid].type
      const userAdmin = userType === 1 || userType === 2
      // текущий пользователь админ
      // тот которого удаляем не суперадмин
      // тот которого удаляем не текущий пользователь
      return (
        userAdmin &&
        this.selectedEmployeeType !== userType &&
        this.selectedEmployeeType !== 1 &&
        !this.isSelectedEmployeeCurrentUser
      )
    },
    ClientStub () {
      return 'https://mobimg.b-cdn.net/v3/fetch/21/215e3ddf9d2d722a16e435992d354932.jpeg?h=900&r=0.5'
    },
    selectedClient () {
      return this.$store.state.clients.selectedClient
    },
    selectedClientName () {
      return this.selectedClient?.name || ''
    },
    selectedClientEmail () {
      return this.selectedClient?.email || ''
    },
    selectedClientPhone () {
      return this.selectedClient?.phone || ''
    }
  },
  watch: {
    selectedClientName: {
      immediate: true,
      handler: function (val) {
        this.currClientName = val
      }
    }
  },
  methods: {
    closeProperties () {
      this.$store.dispatch('asidePropertiesToggle', false)
    },
    removeClient () {
      this.showConfirm = false
      this.$store
        .commit(CLIENTS.REMOVE_CLIENT, this.selectedClient.uid)
      this.$store.dispatch('asidePropertiesToggle', false)
    },
    renameClient () {
      this.$store.commit(CLIENTS.CHANGE_CLIENT_NAME, {
        uid: this.selectedClient.uid,
        name: this.currClientName
      })
    }
  }
}
</script>
