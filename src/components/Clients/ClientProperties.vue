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
  <div class="flex flex-col">
    <input
      v-model="currClient.name"
      type="text"
      maxlength="50"
      placeholder="Имя"
      class="mt-[25px] p-0 font-roboto font-bold text-[18px] leading-[21px] text-[#424242] w-full border-none focus:ring-0 focus:outline-none"
      @blur="updateClient"
    >
    <div
      class="mt-[30px] font-roboto text-[16px] leading-[19px] font-medium text-[#4c4c4d]"
    >
      Email
    </div>
    <input
      v-model="currClient.email"
      type="text"
      maxlength="50"
      placeholder="Email"
      class="mt-[25px] p-0 font-roboto font-bold text-[18px] leading-[21px] text-[#424242] w-full border-none focus:ring-0 focus:outline-none"
      @blur="updateClient"
    >
    <div
      class="mt-[30px] font-roboto text-[16px] leading-[19px] font-medium text-[#4c4c4d]"
    >
      Телефон
    </div>
    <input
      v-model="currClient.phone"
      type="text"
      maxlength="50"
      placeholder="Телефон"
      class="mt-[25px] p-0 font-roboto font-bold text-[18px] leading-[21px] text-[#424242] w-full border-none focus:ring-0 focus:outline-none"
      @blur="updateClient"
    >
    <div
      class="mt-[30px] font-roboto text-[16px] leading-[19px] font-medium text-[#4c4c4d]"
    >
      Комментарий
    </div>
    <input
      v-model="currClient.comment"
      type="text"
      maxlength="50"
      placeholder="Телефон"
      class="mt-[25px] p-0 font-roboto font-bold text-[18px] leading-[21px] text-[#424242] w-full border-none focus:ring-0 focus:outline-none"
      @blur="updateClient"
    >
  </div>

  <ClientChat
    v-if="status=='success'"
    :messages="clientMessages"
    :current-user-uid="user.current_user_uid"
    :employees="employees"
    :show-files-only="showFilesOnly"
    @onQuote="setCurrentQuote"
    @onDeleteMessage="deleteClientMessage"
    @onDeleteFile="deleteClientFileMessage"
  />

  <div class="flex flex-col fixed bottom-[0px] w-[340px] bg-white pt-2 pb-5">
    <ClientMessageQuoteUnderInput
      v-if="currentQuote"
      class="quote-request border-l-2 border-[#7E7E80] h-[40px]"
      :quote-message="currentQuote"
      :employee="employees[currentQuote.uid_creator]"
      @onClearQuote="currentQuote = false"
    />
    <ClientMessageInput
      v-model="clientMessageInputValue"
      :can-add-files="canAddFiles"
      @createClientMessage="createClientMessage"
      @createClientFile="createClientFile"
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
import * as CLIENT_FILES_AND_MESSAGES from '@/store/actions/clientfilesandmessages'
import { uuidv4 } from '@/helpers/functions'

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
      currClient: {
        name: '',
        phone: '',
        email: '',
        comment: ''
      },
      showConfirm: false,
      showFilesOnly: false,
      currentQuote: false,
      clientMessageInputValue: ''
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
    selectedClientUid () {
      return this.selectedClient?.uid || ''
    },
    selectedClientEmail () {
      return this.selectedClient?.email || ''
    },
    selectedClientPhone () {
      return this.selectedClient?.phone || ''
    },
    status () { return this.$store.state.clientfilesandmessages.status },
    user () { return this.$store.state.user.user },
    employees () { return this.$store.state.employees.employees },
    canAddFiles () { return !this.$store.getters.isLicenseExpired },
    clientMessages () { return this.$store.state.clientfilesandmessages.messages }
  },
  watch: {
    selectedClient (newval, oldval) {
      if (newval) {
        this.currClient = newval
      }
    }
  },
  mounted () {
    this.currClient = this.selectedClient
  },
  methods: {
    closeProperties () {
      this.$store.commit(CLIENTS.SELECT_CLIENT, null)
      this.$store.dispatch('asidePropertiesToggle', false)
    },
    removeClient () {
      this.showConfirm = false
      this.$store.dispatch(CLIENTS.REMOVE_CLIENT, this.selectedClient.uid)
      this.$store.dispatch('asidePropertiesToggle', false)
    },
    updateClient () {
      this.$store.dispatch(CLIENTS.UPDATE_CLIENT,
        this.currClient
      )
    },
    createClientMessage () {
      // если лицензия истекла
      if (this.$store.getters.isLicenseExpired) {
        this.showMessagesLimit = true
        return
      }
      if (this.clientMessageInputValue <= 0) {
        return
      }
      let msgclient = this.clientMessageInputValue
      msgclient = msgclient.trim()
      msgclient = msgclient.replaceAll('&', '&amp;')
      msgclient = msgclient.replaceAll('>', '&gt;')
      msgclient = msgclient.replaceAll('<', '&lt;')
      const uid = uuidv4()
      const data = {
        uid_message: uid,
        date_create: new Date().toISOString(),
        uid_creator: this.user.current_user_uid,
        uid_client: this.selectedClient.uid,
        organization: this.user.owner_email,
        uid_quote: this.currentQuote.uid_message,
        deleted: 0,
        msg: msgclient
      }
      this.$store.dispatch(CLIENT_FILES_AND_MESSAGES.CREATE_MESSAGE_REQUEST, data).then(() => {
        if (this.selectedClient) this.selectedClient.has_msgs = true
        this.clientMessageInputValue = ''
        this.currentQuote = false
        this.scrollDown()
      })
    },
    scrollDown () {
      const asideRight = document.getElementById('aside-right')
      asideRight.scroll({ top: asideRight.scrollHeight + 100000 })
    },
    createClientFile (event) {
      if (event === false) {
        this.showMessagesLimit = true
        return
      }
      const uploadingFiles = []

      const files = event.target.files ? event.target.files : event.dataTransfer.files
      const formData = new FormData()
      for (let i = 0; i < files?.length; i++) {
        const file = files[i]
        const fileSizeInMB = file.size / 1024 / 1024

        if (fileSizeInMB > 50) {
          this.showFileSizeLimit = true
          this.tooBigFiles.push(file)
          continue
        }

        formData.append('files[' + i + ']', file)

        // проверяем если файл не нуждается в прелоуде, тогда добавляем его псевдоданные
        // чтобы отобразить, что файл / файлы загружаются
        const fileExtension = file?.name?.split('.')?.pop()?.toLowerCase()
        if (!this.isFilePreloadable(fileExtension)) {
          uploadingFiles.push({
            uid: uuidv4(),
            uid_creator: this.user.current_user_uid,
            uid_file: uuidv4(),
            date_create: new Date().toISOString(),
            order: 0,
            file_name: file.name,
            file_size: file.size,
            file_version: 1,
            is_uploading: true
          })
        }
      }
      const data = {
        uid_client: this.selectedClient?.uid,
        name: formData
      }
      this.$store.commit('addClientMessages', uploadingFiles)
      this.$store.dispatch(CLIENT_FILES_AND_MESSAGES.CREATE_FILES_REQUEST, data).then(() => {
        if (this.selectedClient) this.selectedClient.has_files = true
        this.scrollDown()
      })
    },
    onPasteEvent (e) {
      const items = (e.clipboardData || e.originalEvent.clipboardData).items
      for (const index in items) {
        const item = items[index]
        if (item.kind === 'file') {
          const blob = item.getAsFile()
          const formData = new FormData()
          formData.append('files', blob)
          const data = {
            uid_client: this.selectedClient?.uid,
            name: formData
          }
          this.$store.dispatch(CLIENT_FILES_AND_MESSAGES.CREATE_FILES_REQUEST, data).then(() => {
            this.selectedClient.has_files = true
            this.scrollDown()
          })
        }
      }
    },
    focusMessageInput () {
      const messageInput = document.getElementById('client-message-textarea')
      messageInput.focus()
    },
    setCurrentQuote (quote) {
      this.currentQuote = quote
      console.log(quote)
      this.focusMessageInput()
    },
    deleteClientMessage (uid) {
      this.$store.dispatch(CLIENT_FILES_AND_MESSAGES.DELETE_MESSAGE_REQUEST, uid)
    },
    deleteClientFileMessage (uid) {
      this.$store.dispatch(CLIENT_FILES_AND_MESSAGES.DELETE_FILE_REQUEST, uid)
    }
  }
}
</script>
