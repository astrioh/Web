<template>
  <div
    class="flex hover:cursor-pointer items-center text-sm hover:bg-[#0000000a] font-medium min-h-[40px] w-[221px] rounded-lg mb-2 pl-[22px] whitespace-nowrap text-[#3e3e3f]"
    @click="onChangeAccess(task.emails)"
  >
    <span
      class="ml-[11px] w-[70px]"
    >
      Выйти из доступа
    </span>
    <Icon
      :path="close.path"
      :width="close.width"
      :height="close.height"
      :box="close.viewBox"
      class="ml-5"
    />
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import close from '@/icons/doitnow/close.js'

export default {
  components: {
    Icon
  },
  props: {
    task: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['onChangeAccess'],
  data () {
    return {
      close
    }
  },
  methods: {
    onChangeAccess (emails) {
      this.$emit('onChangeAccess', emails)
    }
  }
}
</script>
