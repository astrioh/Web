<template>
  <div class="mt-5">
    <p>Статистика доски {{ boardName }}</p>
    <template
      v-for="(member, index) in membersByCost"
      :key="index"
    >
      <BoardStatsItem
        :member="member"
      />
    </template>
  </div>
</template>

<script>
import BoardStatsItem from '@/components/Board/BoardStatsItem.vue'
import * as CARD from '@/store/actions/cards'

export default {
  components: {
    BoardStatsItem
  },
  data () {
    return {
      membersByCost: {}
    }
  },
  computed: {
    boardUid () {
      return this.$route.params.board_uid
    },
    selectedBoard () {
      return this.$store.state.boards.boards[this.boardUid]
    },
    boardCards () {
      return this.$store.state.cards.cards
    },
    boardName () {
      return this.selectedBoard?.name
    },
    employeesByEmail () {
      return this.$store.state.employees.employeesByEmail
    }
  },
  mounted () {
    this.$store.dispatch(CARD.BOARD_CARDS_REQUEST, this.boardUid).then(() => {
      this.calculateMembersCost()
    })
  },
  methods: {
    calculateMembersCost () {
      this.boardCards.forEach((cardGroup) => {
        if (cardGroup.cards) {
          cardGroup.cards.forEach((card) => {
            if (this.membersByCost[card.user]) {
              this.membersByCost[card.user].cost += card.cost
            } else {
              if (card.user !== '') {
                this.membersByCost[card.user] =
                  {
                    user_email: card.user,
                    user_name: this.employeesByEmail[card.user].name,
                    cost: card.cost
                  }
              }
            }
          })
        }
      })
    }
  }
}
</script>
