<template>
  <div
    class="flex items-center w-full"
  >
    <p class="font-['Roboto'] text-[#424242] text-[19px] leading-[22px] font-bold">
      {{ title }}
    </p>
  </div>
  <div
    class="grid gap-2 mt-3 grid-cols-1"
    :class="{
      'md:grid-cols-2 lg:grid-cols-4': isGridView,
      'lg:grid-cols-2': isPropertiesMobileExpanded && isGridView
    }"
  >
    <router-link
      v-for="board in boards"
      :key="board.uid"
      :to="'/board/' + board.uid"
    >
      <BoardBlocItem
        :board="board"
      />
    </router-link>
  </div>
</template>
<script>
import BoardBlocItem from './BoardBlocItem.vue'
export default {
  components: { BoardBlocItem },
  props: {
    title: {
      type: String,
      default: ''
    },
    boards: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    isGridView () {
      return this.$store.state.isGridView
    },
    isPropertiesMobileExpanded () {
      return this.$store.state.isPropertiesMobileExpanded
    }
  }
}
</script>
