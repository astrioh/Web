<template>
  <AsideMenuListGroup
    :title="title"
    class="flex flex-col gap-[6px]"
  >
    <router-link
      v-for="board in boards"
      :key="board.uid"
      v-slot="{ isActive }"
      :to="'/board/' + board.uid"
    >
      <BoardsSubmenuItem
        :board="board"
        :selected="isActive"
        @click="gotoBoard(board.uid)"
      />
    </router-link>
    <slot />
  </AsideMenuListGroup>
</template>

<script>
import AsideMenuListGroup from '@/components/AsideMenu/AsideMenuListGroup.vue'
import BoardsSubmenuItem from '@/components/AsideMenu/BoardsSubmenuItem.vue'

export default {
  components: {
    AsideMenuListGroup,
    BoardsSubmenuItem
  },
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
  emits: ['goto'],
  methods: {
    gotoBoard (uid) {
      this.$emit('goto', uid)
    }
  }
}
</script>

<style scoped>
</style>
