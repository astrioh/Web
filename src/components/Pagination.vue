<template>
  <div class="flex space-x-2">
    <button
      v-for="page in pages"
      :key="page"
      :class="{ 'bg-[#F2B679]': isPageActive(page.number), 'text-white': isPageActive(page.number) }"
      class="flex items-center justify-center bg-white rounded-lg space-x-3 px-3 py-1"
      :disabled="isPageActive(page.number) || disabled"
      @click="onClickPage(page.number)"
    >
      {{ page.number }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      default: 5
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 50
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: { // Текущая страница
      type: Number,
      required: true
    }
  },
  computed: {
    pages () {
      const range = []

      for (let i = 0; i < this.totalPages; i++) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage
        })
      }

      return range
    },
    totalPages () {
      return this.total
    },
    currentPage () {
      return this.modelValue
    }
  },
  methods: {
    onClickFirstPage () {
      this.$emit('update:modelValue', 1)
    },
    onClickPage (page) {
      this.$emit('update:modelValue', page)
    },
    onClickLastPage () {
      this.$emit('update:modelValue', this.totalPages)
    },
    isPageActive (page) {
      return this.currentPage === page
    }
  }
}
</script>
