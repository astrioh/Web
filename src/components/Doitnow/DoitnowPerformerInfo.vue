<template>
  <div
    class="flex mb-2"
  >
    <span
      class="mr-[16px] w-[90px] shrink-0 text-[#7E7E80] text-[13px]"
    >
      Исполнитель:
    </span>
    <div
      class="flex"
    >
      <img
        :alt="employees[task.uid_performer]?.name"
        :src="employees[task.uid_performer] ? employees[task.uid_performer]?.fotolink : ''"
        class="rounded-lg ml-1 h-[20px] w-[20px]"
      >
      <span class="ml-1 text-[#4C4C4D] text-[13px] font-medium">{{ employees[task.uid_performer]?.name }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {}
    },
    employees: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
