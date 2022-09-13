<template>
  <NavBar
    class="pt-[8px]"
    :title="`Статистика доски ${boardName}`"
  />
  <div class="bg-white rounded-xl min-h-[75%] p-[20px]">
    <table>
      <tr>
        <th>Сотрудник</th>
        <th>Всего заявок</th>
        <th>Заявок в успехе</th>
        <th>Заявок в отказе</th>
      </tr>
      <template
        v-for="(member, index) in membersByCost"
        :key="index"
      >
        <BoardStatsItem
          :member="member"
        />
      </template>
    </table>
  </div>
</template>

<script>
import BoardStatsItem from '@/components/Board/BoardStatsItem.vue'
import NavBar from '@/components/Navbar/NavBar'
import * as CARD from '@/store/actions/cards'
import { CARD_STAGE } from '@/constants'

export default {
  components: {
    NavBar,
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
    if (!this.boardCards?.length) {
      this.$store.dispatch(CARD.BOARD_CARDS_REQUEST, this.boardUid).then(() => {
        this.calculateMembersCost()
      })
      return
    }
    this.calculateMembersCost()
  },
  methods: {
    calculateMembersCost () {
      this.boardCards.forEach((cardGroup) => {
        if (cardGroup.cards) {
          cardGroup.cards.forEach((card) => {
            if (this.membersByCost[card.user]) {
              this.membersByCost[card.user].allCards = {
                quantity: ++this.membersByCost[card.user].allCards.quantity,
                cost: this.membersByCost[card.user].allCards.cost + card.cost
              }

              if (card.uid_stage === CARD_STAGE.ARCHIVE_SUCCESS) {
                this.membersByCost[card.user].successfulCards = {
                  quantity: ++this.membersByCost[card.user].successfulCards.quantity,
                  cost: this.membersByCost[card.user].successfulCards.cost + card.cost
                }
              } else if (card.uid_stage === CARD_STAGE.ARCHIVE_REJECT) {
                this.membersByCost[card.user].rejectedCards = {
                  quantity: ++this.membersByCost[card.user].rejectedCards.quantity,
                  cost: this.membersByCost[card.user].rejectedCards.cost + card.cost
                }
              }
            } else {
              if (card.user !== '' && this.employeesByEmail[card.user]?.name) {
                const userData = {
                  email: card.user,
                  username: this.employeesByEmail[card.user].name,
                  allCards: {
                    quantity: 1,
                    cost: card.cost
                  },
                  successfulCards: {
                    quantity: 0,
                    cost: 0
                  },
                  rejectedCards: {
                    quantity: 0,
                    cost: 0
                  }
                }

                if (card.uid_stage === CARD_STAGE.ARCHIVE_SUCCESS) {
                  userData.successfulCards = {
                    quantity: ++userData.successfulCards.quantity,
                    cost: userData.successfulCards.cost + card.cost
                  }
                } else if (card.uid_stage === CARD_STAGE.ARCHIVE_REJECT) {
                  userData.rejectedCards = {
                    quantity: ++userData.rejectedCards.quantity,
                    cost: userData.rejectedCards.cost + card.cost
                  }
                }

                this.membersByCost[card.user] = userData
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
table {
  @apply w-[calc(100%-40px)] mx-[20px] mt-[20px] border-separate border-spacing-0
}

/*Стили для первой строки с заголовками*/

tr:first-child {
  @apply text-left h-[48px]
}

tr:first-child th {
  @apply pl-[20px] border-[#e6e6e6] border-2 text-[14px] font-medium;
  border-spacing: 0 20px;
}

tr:first-child th:first-child {
  @apply rounded-l-[6px]
}

tr:first-child th:last-child {
  @apply rounded-r-[6px]
}

tr:first-child th:not(:last-child){
  border-right: 1px;
}

/*Стили для контентной части*/

tr:not(:first-child) {
  @apply min-h-[58px] align-top
}

tr:not(:first-child) td {
  @apply border-b-2 border-[#e6e6e6] pl-[14px] font-normal text-[13px] max-w-[400px]
}

tr:not(:first-child) td:first-child {
  @apply rounded-l-[6px]
}

tr:not(:first-child) td:last-child {
  @apply rounded-r-[6px]
}

.content {
  @apply min-h-[48px] flex items-center
}

/*Стили для первого контентного элемента (отступ сверху)*/
tr:nth-child(2) {
  @apply min-h-[74px]
}

tr:nth-child(2) .content {
  @apply mt-[16px]
}
</style>
