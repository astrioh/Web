<template>
  <div
    class="flex mb-2"
  >
    <span
      class="mr-[16px] w-[90px] shrink-0 text-[#7E7E80] text-[13px]"
    >
      Проект:
    </span>
    <div
      class="flex mb-2"
    >
      <span class="text-[#4C4C4D] overflow-hidden truncate text-[13px] font-medium">{{
        projects[task.uid_project]?.name.length > 99
          ? projects[task.uid_project]?.name.split('').slice(0,100).join('') + '...'
          : projects[task.uid_project]?.name
      }}</span>
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
    projects: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
