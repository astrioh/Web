<template>
  <div class="mt-5">
    <p>Статистика доски {{ boardName }}</p>
    <table>
      <tr>
        <th>Сотрудник</th>
        <th>кол-во/деньги</th>
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
              if (card.user !== '' && this.employeesByEmail[card.user]?.name) {
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
