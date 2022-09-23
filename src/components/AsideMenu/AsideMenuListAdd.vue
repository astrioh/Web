<template>
  <div
    class="flex items-center h-[40px] cursor-pointer border hover:p-px hover:border-0 border-black/12 hover:bg-light-gray rounded-[6px]"
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
