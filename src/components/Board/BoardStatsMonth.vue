<template>
  <div>
    <div class="flex">
      <select
        v-model="selectedMonth"
        class="form-control form-control-select-repeat ml-5"
      >
        <template
          v-for="month in months"
          :key="month.month"
        >
          <option
            :value="month.month"
          >
            {{ month.title }}
          </option>
        </template>
      </select>
      <select
        v-model="selectedYear"
        class="form-control form-control-select-repeat ml-5"
      >
        <template
          v-for="(year, index) in years"
          :key="index"
        >
          <option
            :value="year"
          >
            {{ year }}
          </option>
        </template>
      </select>
    </div>
    <table>
      <tr>
        <th>Сотрудник</th>
        <th>Заявок в успехе</th>
        <th>Заявок в отказе</th>
        <th>Всего в архиве</th>
      </tr>
      <BoardStatsSkeleton v-if="!isLoaded" />
      <template
        v-for="member in membersSortedByCardsCount"
        v-else
        :key="member.email"
      >
        <BoardStatsItem
          :member="member"
        />
      </template>
    </table>
  </div>
</template>

<script>
import BoardStatsSkeleton from '@/components/Board/BoardStatsSkeleton'
import BoardStatsItem from '@/components/Board/BoardStatsItem.vue'
import { CARD_STAGE } from '@/constants'

export default {
  components: {
    BoardStatsSkeleton,
    BoardStatsItem
  },
  props: {
    isLoaded: {
      type: Boolean,
      default: false
    },
    boardCards: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      membersWithCards: {},
      years: [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      months: [
        {
          title: 'Январь',
          month: 0
        },
        {
          title: 'Февраль',
          month: 1
        },
        {
          title: 'Март',
          month: 2
        },
        {
          title: 'Апрель',
          month: 3
        },
        {
          title: 'Май',
          month: 4
        },
        {
          title: 'Июнь',
          month: 5
        },
        {
          title: 'Июль',
          month: 6
        },
        {
          title: 'Август',
          month: 7
        },
        {
          title: 'Сентябрь',
          month: 8
        },
        {
          title: 'Октябрь',
          month: 9
        },
        {
          title: 'Ноябрь',
          month: 10
        },
        {
          title: 'Декабрь',
          month: 11
        }
      ]
    }
  },
  computed: {
    employeesByEmail () {
      return this.$store.state.employees.employeesByEmail
    },
    membersSortedByCardsCount () {
      const members = Object.values(this.membersWithCards)
      members.sort((member1, member2) => {
        // сначала по количеству карточек
        const allCards1 = member1.rejectedCards.quantity + member1.successfulCards.quantity
        const allCards2 = member2.rejectedCards.quantity + member2.successfulCards.quantity
        if (allCards1 > allCards2) return -1
        if (allCards1 < allCards2) return 1
        // если одинаковый, то по email`у
        if (member1.email > member2.email) return -1
        if (member1.email < member2.email) return 1
        return 0
      })
      return members
    }
  },
  watch: {
    selectedYear (newVal) {
      this.setCardsByMonthAndYear()
    },
    selectedMonth (newVal) {
      this.setCardsByMonthAndYear()
    },
    isLoaded (newVal) {
      if (newVal) this.setCardsByMonthAndYear()
    }
  },
  mounted () {
    if (this.isLoaded) this.setCardsByMonthAndYear()
  },
  methods: {
    setCardsByMonthAndYear () {
      this.membersWithCards = {}
      this.boardCards.forEach((cardGroup) => {
        if (cardGroup.cards) {
          cardGroup.cards.forEach((card) => {
            const dateMove = new Date(card.date_move)
            if (dateMove.getFullYear() === this.selectedYear && dateMove.getMonth() === this.selectedMonth) {
              if (card.uid_stage === CARD_STAGE.ARCHIVE_SUCCESS) {
                const member = this.getMemberByUser(card.user)
                if (member) {
                  member.successfulCards = {
                    quantity: member.successfulCards.quantity + 1,
                    cost: member.successfulCards.cost + card.cost
                  }
                  member.archiveCards = {
                    quantity: member.archiveCards.quantity + 1,
                    cost: member.archiveCards.cost + card.cost
                  }
                }
              } else if (card.uid_stage === CARD_STAGE.ARCHIVE_REJECT) {
                const member = this.getMemberByUser(card.user)
                if (member) {
                  member.rejectedCards = {
                    quantity: member.rejectedCards.quantity + 1,
                    cost: member.rejectedCards.cost + card.cost
                  }
                  member.archiveCards = {
                    quantity: member.archiveCards.quantity + 1,
                    cost: member.archiveCards.cost + card.cost
                  }
                }
              }
            }
          })
        }
      })
    },
    getMemberByUser (user) {
      if (!user) return null
      const member = this.membersWithCards[user.toLowerCase()]
      if (!member) {
        const newMember = {
          email: user,
          username: this.employeesByEmail[user.toLowerCase()]?.name || user,
          successfulCards: {
            quantity: 0,
            cost: 0
          },
          rejectedCards: {
            quantity: 0,
            cost: 0
          },
          archiveCards: {
            quantity: 0,
            cost: 0
          }
        }
        this.membersWithCards[user.toLowerCase()] = newMember
        return newMember
      }
      return member
    }
  }
}
</script>

<style scoped>
table {
  @apply w-[calc(100%-40px)] mx-[20px] mt-[20px] border-separate
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
