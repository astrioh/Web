<template>
  <div
    class="mt-3 tags-custom dark:bg-gray-800 dark:text-gray-100 project-hover-close"
    @click="onClick"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 14.3125C12 13.9328 11.6922 13.625 11.3125 13.625H7.5L7.5 5.5H9.99877C10.1795 5.5 10.2675 5.27934 10.1365 5.15494L6.8125 2L3.8194 5.16252C3.69873 5.29002 3.78912 5.5 3.96466 5.5H6.125L6.125 15H11.3125C11.6922 15 12 14.6922 12 14.3125Z"
        fill="#7F7F80"
      />
    </svg>
    <span class="rounded font-medium text-[#575758]">{{ parent }}</span>
  </div>
</template>

<script>
export default {
  props: {
    parent: {
      type: String,
      required: true
    }
  },
  emits: ['onParent'],
  methods: {
    onClick () {
      this.$emit('onParent')
    }
  }
}
</script>
