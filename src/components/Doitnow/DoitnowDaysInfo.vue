<template>
  <div
    class="flex mb-2"
  >
    <span
      class="mr-[16px] w-[90px] shrink-0 text-[#7E7E80] text-[13px]"
    >
      Срок:
    </span>
    <div
      class="flex"
    >
      <span class="text-[#4C4C4D] text-[13px] font-medium">{{ dateClearWords + getTime }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dateClearWords: {
      type: String,
      default: ''
    },
    getTime: {
      type: String,
      default: ''
    }
  }
}
</script>
