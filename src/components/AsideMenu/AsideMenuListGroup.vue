<template>
  <div>
    <div
      v-if="title"
      class="ml-[5px] mb-[10px] font-roboto text-[12px] leading-[14px] font-medium text-[#383838]"
    >
      {{ title }}
    </div>
    <slot />
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

<style scoped>
</style>
