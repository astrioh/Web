<template>
  <div
    class="flex mb-2"
  >
    <span class="mr-[16px] w-[90px] shrink-0 text-[#7E7E80] text-[13px]">
      Просрочено:
    </span>
    <div
      class="flex"
    >
      <span class="text-red-500 text-[13px] font-medium">{{ isTaskHaveOverdueTime }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isTaskHaveOverdueTime: {
      type: String,
      default: ''
    }
  }
}
</script>
