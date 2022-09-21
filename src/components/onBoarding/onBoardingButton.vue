<template>
  <button
    class="w-xl-1/6 mt-[35px] w-[238px] h-[40px] justify-center cursor-pointer bg-[#F2B679] text-[#2E2E2E] text-[14px] px-10 rounded-md hover:bg-slate-200 font-medium mx-auto"
    @click="okToModal"
  >
    Понятно
  </button>
</template>
<script>
export default {
  emits: ['okToModal'],
  methods: {
    okToModal () {
      this.$emit('okToModal')
    }
  }
}
</script>
