@@ -1,123 +0,0 @@
<template>
  <ModalBox
    ok="Сохранить"
    title="Сохранение регламента"
    class="flex-col w-[100px]"
    @ok="onSave"
    @cancel="close"
  >
    <div class="flex flex-col">
      <div
        v-if="$store.state.reglaments.hideSaveParams === false"
        class="flex gap-[10px] items-center cursor-pointer mb-4"
        @click="toggleEmployes"
      >
        <svg
          v-if="isClear"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 5C0 2.23858 2.23858 0 5 0H15C17.7614 0 20 2.23858 20 5V15C20 17.7614 17.7614 20 15 20H5C2.23858 20 0 17.7614 0 15V5Z"
            fill="#FF9123"
          />
          <path
            d="M9.02899 14.1663C8.80147 14.1663 8.57397 14.0661 8.34645 13.9659L4.59245 11.46C4.13742 11.1593 4.02366 10.4577 4.36494 10.0567C4.70621 9.65579 5.50251 9.55555 5.95754 9.85626L8.91524 11.7607L14.7169 6.14759C15.1719 5.74665 15.8545 5.74665 16.3095 6.04735C16.7645 6.44829 16.7645 7.0497 16.4232 7.45064L9.93905 13.6652C9.71154 14.0661 9.37026 14.1663 9.02899 14.1663Z"
            fill="white"
          />
        </svg>
        <svg
          v-else
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="20"
            height="20"
            rx="4"
            fill="#EEEFF1"
          />
          <rect
            x="0.5"
            y="0.5"
            width="19"
            height="19"
            rx="3.5"
            stroke="black"
            stroke-opacity="0.1"
          />
        </svg>
        <div class="text-[14px] cursor-pointer">
          Очистить сотрудников прошедших регламент
        </div>
      </div>
      <h2 class="text-[14px] mt-[-5px]">
        Добавить комментарий к изменениям
      </h2>
      <textarea
        v-model="reglamentComment"
        type="text"
        class="bg-[#F4F5F7] rounded-[6px] min-h-[81px] scroll-style ml-1 mt-2 w-[300px] font-[500] px-2 text-[14px] leading-6 break-words"
        placeholder="Комментарий"
        spellcheck="false"
      />
    </div>
  </ModalBox>
</template>
<script>
import ModalBox from '@/components/modals/ModalBox.vue'
import * as REGLAMENTS from '@/store/actions/reglaments.js'
export default {
  components: {
    ModalBox
  },
  emits: ['onSave', 'close'],
  data () {
    return {
      note: '',
      isClear: false,
      reglamentComment: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    }
  },
  methods: {
    dateToLabelFormat (calendarDate) {
      const day = calendarDate.getDate()
      const month = calendarDate.toLocaleString('default', { month: 'short' })
      const weekday = calendarDate.toLocaleString('default', { weekday: 'short' })
      return day + ' ' + month + ', ' + weekday
    },
    onSave () {
      this.$emit('onSave')
      const data = {
        uid_employee: this.user.current_user_uid,
        uid_reglament: this.$route.params.id,
        comment: this.reglamentComment,
        comment_date: this.dateToLabelFormat(new Date())
      }
      this.$store.dispatch(REGLAMENTS.CREATE_REGLAMENT_COMMENT, data)
    },
    close () {
      this.$emit('close')
    },
    toggleEmployes () {
      this.isClear = !this.isClear
    }
  }
}
</script>
