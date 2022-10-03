<template>
  <div
    class="flex items-center gap-[10px] cursor-pointer hover:bg-[#0000000a] h-[40px] w-[221px] rounded-[8px] px-[20px] overflow-hidden"
  >
    <div class="flex-none w-[16px] h-[16px] flex items-center justify-center">
      <svg
        v-if="icon === 'next'"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.24332 12.7643C6.56474 13.0815 7.08244 13.0781 7.39963 12.7567L11.3243 8.77964C11.6209 8.47913 11.6399 8.00225 11.3682 7.6791L7.74536 3.37065C7.45474 3.02502 6.93895 2.98044 6.59333 3.27106C6.2477 3.56168 6.20311 4.07746 6.49374 4.42309L9.63705 8.1613L6.23567 11.608C5.91848 11.9295 5.92191 12.4471 6.24332 12.7643Z"
          fill="#4C4C4D"
        />
      </svg>
    </div>
    <span
      class="font-roboto text-[#4C4C4D] text-[13px] truncate"
    >
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
