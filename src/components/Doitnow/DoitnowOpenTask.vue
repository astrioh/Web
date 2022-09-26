<template>
  <div
    class="flex w-[221px] hover:cursor-pointer border border-transparent items-center text-sm hover:border hover:bg-[#0000000a] pl-[22px] font-medium min-h-[40px] rounded-lg text-[#3e3e3f] whitespace-nowrap text-end"
    @click="setTaskFromQueue(task.uid)"
  >
    <div class="w-[16px] h-[16px] flex items-center justify-center">
      <Icon
        :path="openTask.path"
        :width="openTask.width"
        :height="openTask.height"
        :box="openTask.viewBox"
      />
    </div>
    <span
      class="ml-[10px]"
    >
      Открыть задачу
    </span>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import openTask from '@/icons/doitnow/openTask.js'

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
  emits: ['setTaskFromQueue'],
  data () {
    return {
      openTask
    }
  },
  methods: {
    setTaskFromQueue (uid) {
      this.$emit('setTaskFromQueue', uid)
    }
  }
}
</script>
