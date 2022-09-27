<template>
  <div
    class="flex items-center h-[36px] cursor-pointer w-full bg-[#F2B679] px-3 rounded-[6px] hover:bg-slate-200"
  >
    <div class="text-center overflow-hidden w-full">
      <p
        class="font-roboto text-[13px] leading-[15px] truncate text-[#111111]"
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
