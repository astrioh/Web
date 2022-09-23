<template>
  <div
    class="flex items-center h-[36px] cursor-pointer border hover:p-px hover:border-0 border-black/12 hover:bg-[#f4f5f7] rounded-[6px]"
  >
    <div class="text-center overflow-hidden w-full">
      <p
        class="font-roboto text-[13px] leading-[15px] truncate text-[#383838]"
      >
        {{ title }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
