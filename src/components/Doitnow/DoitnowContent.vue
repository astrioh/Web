<template>
  <div class="flex justify-between gap-[12px]">
    <div class="grow py-[30px] px-[25px] bg-white rounded-[12px] overflow-x-hidden">
      <slot />
    </div>
    <div class="flex-none flex flex-col min-w-[200px] gap-[6px] empty:hidden">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>
