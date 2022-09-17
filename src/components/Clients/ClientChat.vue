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

      <!-- New creator -->
      <div
        v-if="isChangedCreator(index) && employees[message.uid_creator]"
        class="text-[#7E7E80] text-[13px] font-[500] leading-[15px] tracking-wide mb-[6px]"
        :class="{ 'text-left': !isMyMessage(message), 'text-right': isMyMessage(message) }"
      >
        <span class="w-[300px] overflow-hidden h-[15px] inline-block text-ellipsis whitespace-nowrap">
          {{ employees[message.uid_creator].name }}
        </span>
      </div>
      <ClientChatInterlocutorMessage
        v-if="!isMyMessage(message)"
        :message="message"
        :employee="employees[message.uid_creator]"
      />
      <ClientChatSelfMessage
        v-if="isMyMessage(message)"
        :message="message"
        :employee="employees[message.uid_creator]"
        @onDeleteMessage="onDeleteMessage"
      />
    </div>
  </div>
</template>

<script>
import * as CLIENTS_CHAT from '@/store/actions/clientfilesandmessages.js'
import ClientChatInterlocutorMessage from '@/components/Clients/ClientChatInterlocutorMessage.vue'
import ClientChatSelfMessage from '@/components/Clients/ClientChatSelfMessage.vue'

export default {
  components: {
    ClientChatInterlocutorMessage,
    ClientChatSelfMessage
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
        ...message
      }))
    },
    user () {
      return this.$store.state.user.user
    }
  },
  methods: {
    onDeleteMessage (msgUid) {
      this.$store.dispatch(CLIENTS_CHAT.DELETE_MESSAGE_REQUEST, msgUid)
    },
    getMessageByUid (uid) {
      for (const message of this.messages) {
        if (message.uid === uid) return message
      }
      return false
    },
    isMyMessage (msg) {
      return msg.uid_creator === this.currentUserUid
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
