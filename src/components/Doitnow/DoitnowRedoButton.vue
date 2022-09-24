<template>
  <div
    class="flex hover:cursor-pointer items-center text-sm hover:bg-[#0000000a] font-medium min-h-[40px] w-[221px] rounded-lg mb-2 pl-[22px] whitespace-nowrap text-[#3e3e3f]"
    @click="reDo"
  >
    <div class="w-[16px] h-[16px] flex items-center justify-center">
      <Icon
        :path="cancelImproveRejectIcon('path')"
        :width="cancelImproveRejectIcon('width')"
        :height="cancelImproveRejectIcon('height')"
        :box="cancelImproveRejectIcon('viewBox')"
      />
    </div>
    <span
      class="ml-[10px] w-[70px]"
    >
      {{ redoBtnText }}
    </span>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import improve from '@/icons/improve.js'
import close from '@/icons/doitnow/close.js'

export default {
  components: {
    Icon
  },
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
  emits: ['reDo'],
  data () {
    return {
      improve,
      close
    }
  },
  computed: {
    redoBtnText () {
      return this.task.uid_customer === this.user?.current_user_uid ? (this.task.uid_performer === this.user?.current_user_uid ? 'Отменить' : 'На доработку') : 'Отклонить'
    }
  },
  methods: {
    cancelImproveRejectIcon (param) {
      return this.task.uid_customer === this.user?.current_user_uid && this.task.uid_performer !== this.user?.current_user_uid ? this.improve[param] : this.close[param]
    },
    reDo () {
      this.$emit('reDo')
    }
  }
}
</script>
