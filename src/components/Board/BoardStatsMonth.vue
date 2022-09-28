<template>
  <select
    ref="selectedYear"
    v-model="selectedYear"
    class="form-control form-control-select-repeat ml-5"
  >
    <template
      v-for="(option, index) in options"
      :key="index"
    >
      <option
        :value="option"
      >
        {{ option }}
      </option>
    </template>
  </select>
  <table>
    <tr>
      <th>Месяц</th>
      <th>Заявок в успехе</th>
      <th>Заявок в отказе</th>
    </tr>
    <template
      v-for="(month, index) in itemsByMonth"
      :key="index"
    >
      <BoardStatsMonthItem
        :month="month"
      />
    </template>
    <BoardStatsSkeleton v-if="!isLoaded" />
  </table>
</template>

<script>
import BoardStatsSkeleton from '@/components/Board/BoardStatsSkeleton'
import BoardStatsMonthItem from './BoardStatsMonthItem.vue'
import { CARD_STAGE } from '@/constants'

export default {
  components: {
    BoardStatsSkeleton,
    BoardStatsMonthItem
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
      itemsByMonth: [],
      options: [],
      selectedYear: 2022
    }
  },
  watch: {
    selectedYear (newVal) {
      this.setDefaultItemsByMonth()
      this.setCardsByMonthAndYear(newVal)
    }
  },
  mounted () {
    this.setDefaultItemsByMonth()
    this.setCardsByMonthAndYear(this.selectedYear)
    this.setOptionsYears()
  },
  methods: {
    setCardsByMonthAndYear (year) {
      this.boardCards.forEach((cardGroup) => {
        if (cardGroup.cards && (cardGroup.UID === CARD_STAGE.ARCHIVE_SUCCESS || cardGroup.UID === CARD_STAGE.ARCHIVE_REJECT)) {
          cardGroup.cards.forEach((card) => {
            if (card.uid_stage === CARD_STAGE.ARCHIVE_SUCCESS && new Date(card.date_move).getFullYear() === year) {
              setTimeout(() => {
                this.incrementMonth(card, 'success')
              }, 500)
            } else if (card.uid_stage === CARD_STAGE.ARCHIVE_REJECT && new Date(card.date_move).getFullYear() === year) {
              this.incrementMonth(card, 'reject')
            }
          })
        }
      })
    },
    incrementMonth (card, type) {
      const cardDate = new Date(card.date_move)
      const cardMonth = cardDate.getMonth()
      this.itemsByMonth[cardMonth][type] += 1
    },
    setOptionsYears () {
      for (let i = new Date().getFullYear(); i >= 2020; i--) {
        this.options.push(i)
      }
    },
    setDefaultItemsByMonth () {
      this.itemsByMonth = [
        {
          month: 'Январь',
          success: 0,
          reject: 0
        },
        {
          month: 'Февраль',
          success: 0,
          reject: 0
        },
        {
          month: 'Март',
          success: 0,
          reject: 0
        },
        {
          month: 'Апрель',
          success: 0,
          reject: 0
        },
        {
          month: 'Май',
          success: 0,
          reject: 0
        },
        {
          month: 'Июнь',
          success: 0,
          reject: 0
        },
        {
          month: 'Июль',
          success: 0,
          reject: 0
        },
        {
          month: 'Август',
          success: 0,
          reject: 0
        },
        {
          month: 'Сентябрь',
          success: 0,
          reject: 0
        },
        {
          month: 'Октябрь',
          success: 0,
          reject: 0
        },
        {
          month: 'Ноябрь',
          success: 0,
          reject: 0
        },
        {
          month: 'Декабрь',
          success: 0,
          reject: 0
        }
      ]
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
