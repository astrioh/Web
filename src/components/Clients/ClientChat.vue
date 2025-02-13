<template>
  <div class="flex flex-col pb-[100px]">
    <div
      v-for="(message, index) in clientMessages"
      :key="message"
    >
      <div
        v-if="isChangedDate(index)"
        class="text-[#88888A] text-[11px] font-[400] leading-[13px] tracking-wide my-[15px] text-center"
      >
        {{ getMessageWeekDateString(message.date_create) }}
      </div>
      <span
        v-if="message.type === 'call'"
        class="flex justify-center rounded-md shadow-md mb-[6px] py-1 px-2 text-[#88888A] text-[13px]"
      >
        <a
          :href="message.link"
          target="_blank"
          class="flex justify-center hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 w-[12px]"
            viewBox="0 0 512 512"
            fill="currentColor"
          ><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
          {{ message.direction === 'in' ? 'Входящий звонок от клиента' : `Исходящий звонок от ${message.user}` }}
        </a>
      </span>
      <!-- New creator -->
      <div v-else>
        <div
          v-if="isChangedCreator(index) && employees[message.uid_creator]"
          class="text-[#7E7E80] text-[13px] font-[500] leading-[15px] tracking-wide mb-[6px]"
          :class="{ 'text-left': !isMyMessage(message), 'text-right': isMyMessage(message) }"
        >
          <span class="w-[300px] overflow-hidden h-[15px] inline-block text-ellipsis whitespace-nowrap">
            {{ employees[message.uid_creator].name }}
          </span>
        </div>
        <div
          v-if="message.emailSender"
          class="text-[#7E7E80] text-[13px] font-[500] leading-[15px] tracking-wide mb-[6px]"
          :class="{ 'text-left': !isMessageIncludesIntegrationLogin(message), 'text-right': isMessageIncludesIntegrationLogin(message) }"
        >
          <span class="w-[300px] overflow-hidden h-[15px] inline-block text-ellipsis whitespace-nowrap">{{ message.emailSender }}</span>
        </div>

        <ClientChatQuoteMessage
          v-if="message.hasQuote"
          :quote-message-uid="message.uid_quote"
        />
        <ClientChatInterlocutorMessage
          v-if="!message.isMyMessage && message.isMessage && !showFilesOnly"
          :message="message"
          :should-show-options="shouldShowOptions(message)"
          :employee="employees[message.uid_creator]"
          @onQuoteMessage="setCurrentQuote"
        />
        <ClientChatInterlocutorFileMessage
          v-if="!message.isMyMessage && message.isFile"
          :message="message"
          :employee="employees[message.uid_creator]"
          @onQuoteMessage="setCurrentQuote"
        />

        <ClientChatSelfMessage
          v-if="message.isMyMessage && message.isMessage && !showFilesOnly"
          :message="message"
          :employee="employees[message.uid_creator]"
          :should-show-options="shouldShowOptions(message)"
          @onDeleteMessage="onDeleteMessage"
          @onQuoteMessage="setCurrentQuote"
        />
        <ClientChatSelfFileMessage
          v-if="message.isMyMessage && message.isFile"
          :message="message"
          :employee="employees[message.uid_creator]"
          @onQuoteMessage="setCurrentQuote"
          @onDeleteFile="deleteFile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as CLIENTS_CHAT from '@/store/actions/clientfilesandmessages.js'
import ClientChatQuoteMessage from '@/components/Clients/ClientChatQuoteMessage.vue'
import ClientChatInterlocutorMessage from '@/components/Clients/ClientChatInterlocutorMessage.vue'
import ClientChatInterlocutorFileMessage from '@/components/Clients/ClientChatInterlocutorFileMessage.vue'
import ClientChatSelfMessage from '@/components/Clients/ClientChatSelfMessage.vue'
import ClientChatSelfFileMessage from '@/components/Clients/ClientChatSelfFileMessage.vue'

export default {
  components: {
    ClientChatInterlocutorMessage,
    ClientChatInterlocutorFileMessage,
    ClientChatSelfMessage,
    ClientChatQuoteMessage,
    ClientChatSelfFileMessage
  },
  props: {
    key: {
      type: String,
      default: ''
    },
    messages: {
      type: Array,
      default: () => []
    },
    currentUserUid: {
      type: String,
      default: ''
    },
    employees: {
      type: Object,
      default: () => {}
    },
    showFilesOnly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onQuote', 'onDeleteMessage', 'onDeleteFile'],
  computed: {
    clientMessages () {
      return this.messages.map((message) => ({
        ...message,
        isFile: !!message.uid_file,
        isMessage: !message.uid_file && message.uid_creator !== 'inspector',
        hasQuote: message.uid_quote && message.uid_quote !== '00000000-0000-0000-0000-000000000000' && message.deleted !== 1,
        quoteMessage: this.getMessageByUid(message?.uid_quote),
        isInspectorMessage: message.uid_creator === 'inspector',
        isMyMessage: (message?.uid_creator === this.currentUserUid) || this.isMessageIncludesIntegrationLogin(message)
      }))
    },
    user () {
      return this.$store.state.user.user
    },
    corpYandexIntegration () {
      return this.$store.state.corpYandexIntegration
    },
    personalYandexIntegration () {
      return this.$store.state.personalYandexIntegration
    }
  },
  methods: {
    onDeleteMessage (msgUid) {
      this.$store.dispatch(CLIENTS_CHAT.DELETE_MESSAGE_REQUEST, msgUid)
    },
    isMessageIncludesIntegrationLogin (msg) {
      if (msg?.emailSender) {
        return msg.emailSender.includes(this.corpYandexIntegration?.login) || msg.emailSender.includes(this.personalYandexIntegration?.login)
      }
      return false
    },
    getMessageByUid (uid) {
      for (const message of this.messages) {
        if (message?.uid === uid) return message
      }
      return false
    },
    isMyMessage (msg) {
      return msg.uid_creator === this.currentUserUid
    },
    shouldShowOptions (msg) {
      return !msg.isYandex
    },
    isChangedDate (index) {
      if (index === 0) return true
      const messagePrev = this.messages[index - 1]
      const messageCurr = this.messages[index]
      if (!messagePrev || !messageCurr) return false
      return new Date(messagePrev.date_create).toDateString() !==
        new Date(messageCurr.date_create).toDateString()
    },
    isChangedCreator (index) {
      if (index === 0) return true
      const messagePrev = this.messages[index - 1]
      const messageCurr = this.messages[index]
      if (!messagePrev || !messageCurr) return false
      return messagePrev.uid_creator !== messageCurr.uid_creator
    },
    setCurrentQuote (quoteMessage) {
      this.$emit('onQuote', quoteMessage)
    },
    deleteMessage (uid) {
      this.$emit('onDeleteMessage', uid)
    },
    deleteFile (uid) {
      this.$emit('onDeleteFile', uid)
    },
    getMessageWeekDateString (dateCreate) {
      if (!dateCreate) return ''
      // добавляем Z в конец, чтобы он посчитал что это UTC время
      if (dateCreate[dateCreate.length - 1] !== 'Z') {
        dateCreate += 'Z'
      }
      const today = new Date()
      const date = new Date(dateCreate)
      let weekDay = date.toLocaleString('default', { weekday: 'long' })
      weekDay = weekDay.slice(0, 1).toUpperCase() + weekDay.slice(1)
      const dayNum = date.getDate()
      const day = (dayNum < 10 ? '0' : '') + dayNum
      const month = date.toLocaleString('default', { month: 'short' }).slice(0, 3)
      const year = (today.getFullYear() !== date.getFullYear()) ? date.getFullYear().toString() : ''
      return `${weekDay}, ${day} ${month} ${year}`
    }
  }
}
</script>
