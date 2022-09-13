<template>
  <ul class="flex">
    <li
      v-if="currentPage >= maxVisibleButtons"
    >
      <button
        class="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-full mr-3 text-xl"
        @click="onClickFirstPage"
      >
        1
      </button>
    </li>
    <div
      v-if="currentPage >= maxVisibleButtons"
      class="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-full mr-3 text-xl"
    >
      ...
    </div>

    <li
      v-for="page in pages"
      :key="page"
    >
      <button
        :class="{ 'bg-[#F2B679]': isPageActive(page.number), 'text-white': isPageActive(page.number) }"
        class="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-full mr-3 text-xl"
        :disabled="isPageActive(page.number)"
        @click="onClickPage(page.number)"
      >
        {{ page.number }}
      </button>
    </li>

    <div
      v-if="currentPage <= totalPages - maxVisibleButtons + 1"
      class="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-full mr-3 text-xl"
    >
      ...
    </div>
    <li
      v-if="currentPage <= totalPages - maxVisibleButtons + 1"
    >
      <button
        class="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-full mr-3 text-xl"
        @click="onClickLastPage"
      >
        {{ totalPages }}
      </button>
    </li>
  </ul>
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
    modelValue: { // Текущая страница
      type: Number,
      required: true
    }
  },
  computed: {
    startPage () {
      if (this.currentPage <= 1 || this.totalPages < this.maxVisibleButtons) {
        return 1
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }

      return this.currentPage - 1
    },
    endPage () {
      return this.startPage + this.maxVisibleButtons
    },
    pages () {
      const range = []

      for (let i = this.startPage; i < this.endPage; i++) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage
        })
      }

      return range
    },
    isFirstPage () {
      return this.currentPage === 1
    },
    isLastPage () {
      return this.currentPage === this.totalPages
    },
    totalPages () {
      return Math.ceil(this.total / this.perPage)
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
