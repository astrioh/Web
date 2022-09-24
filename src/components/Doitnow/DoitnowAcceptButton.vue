<template>
  <div
    class="flex hover:cursor-pointer items-center text-sm hover:bg-[#0000000a] font-medium min-h-[40px] w-[221px] rounded-lg mb-2 pl-[22px] whitespace-nowrap text-[#3e3e3f]"
    @click="accept"
  >
    <div class="w-[16px] h-[16px] flex items-center justify-center">
      <svg
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3337 1L5.00033 8.33333L1.66699 5"
          stroke="#4C4C4D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <span
      class="ml-[10px] w-[70px]"
    >{{ acceptBtnText }}</span>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {}
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['accept'],
  computed: {
    acceptBtnText () {
      if (this.task.mode === 'slide') {
        return 'Понятно'
      } else if (this.task.uid_customer === this.user.current_user_uid && this.task.uid_performer === this.user.current_user_uid) {
        return 'Завершить'
      } else if (this.task.uid_customer === this.user.current_user_uid && this.task.uid_performer !== this.user.current_user_uid) {
        return 'Принять и завершить'
      } else {
        return 'Готово к сдаче'
      }
    }
  },
  methods: {
    accept () {
      this.$emit('accept')
    }
  }
}
</script>
