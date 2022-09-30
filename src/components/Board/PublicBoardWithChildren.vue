<template>
  <div class="h-screen overflow-hidden">
    <div class="w-full h-[calc(100%-56px)] flex flex-col">
      <BoardModalBoxBoardsLimit
        v-if="showBoardsLimit"
        @cancel="showBoardsLimit = false"
        @ok="showBoardsLimit = false"
      />
      <div
        v-if="subBoardsCount > 0"
        class="grid gap-2 mt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        <template
          v-for="board in subBoards"
          :key="board.uid"
        >
          <BoardBlocItem
            :board="board"
            @click.stop="goToChildBoard(board)"
          />
        </template>
      </div>
      <div class="mt-5 h-full min-h-0">
        <Board
          :store-cards="storeCards"
          :board="currentBoard"
          :show-archive="showArchive"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BoardModalBoxBoardsLimit from '@/components/Board/BoardModalBoxBoardsLimit.vue'
import BoardBlocItem from '@/components/Board/BoardBlocItem.vue'
import Board from '@/components/Board.vue'
import * as CARD from '@/store/actions/cards'

export default {
  components: {
    BoardModalBoxBoardsLimit,
    BoardBlocItem,
    Board
  },
  props: {
    showArchive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showAddBoard: false,
      showBoardsLimit: false
    }
  },
  computed: {
    subBoards () {
      return this.currentBoard?.children
    },
    subBoardsCount () {
      return this.subBoards?.length ?? 0
    },
    storeCards () {
      return this.$store.state.cards.cards
    },
    boardUid () {
      return this.$route.params.board_id
    }
  },
  watch: {
    boardUid (newUid) {
      if (newUid) {
        this.loadBoard()
      }
    }
  },
  mounted () {
    this.loadBoard()
  },
  methods: {
    loadBoard () {
      this.$store.dispatch(CARD.PUBLIC_BOARD_CARDS_REQUEST, this.boardUid)
    },
    goToChildBoard (board) {
      this.$router.push(`/board/${board.uid}`)
    }
  }
}
</script>

<style scoped></style>
