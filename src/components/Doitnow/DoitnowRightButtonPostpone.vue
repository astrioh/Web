<template>
  <div
    class="flex justify-between items-center h-[40px] w-[221px]"
  >
    <DoitnowModalBoxSetDate
      v-if="showSetDate"
      @save="onSetDate"
      @cancel="showSetDate = false"
    />
    <div
      class="flex-none flex items-center cursor-pointer bg-white hover:bg-[#0000000a] h-[40px] w-[200px] rounded-[8px] px-[20px] overflow-hidden"
      @click="onPostpone"
    >
      <span
        class="mx-auto font-roboto text-[#4C4C4D] text-[13px] truncate"
      >
        Отложить на {{ postpone }}
        {{ title }}
      </span>
    </div>
    <PopMenu>
      <span
        class="flex-none inline-block cursor-pointer w-[20px] text-sm text-center"
      >
        ▼
      </span>
      <template #menu>
        <div class="h-[155px] overflow-y-auto w-[220px] scroll-style">
          <PopMenuItem
            @click="onSetPostpone({minutes: 10, days: 0})"
          >
            10 минут
          </PopMenuItem>
          <PopMenuItem
            @click="onSetPostpone({minutes: 60, days: 0})"
          >
            1 час
          </PopMenuItem>
          <PopMenuItem
            @click="onSetPostpone({minutes: 180, days: 0})"
          >
            3 часа
          </PopMenuItem>
          <PopMenuItem
            @click="onSetPostpone({minutes: 0, days: 1})"
          >
            Завтра
          </PopMenuItem>
          <PopMenuItem
            @click="onSelectPostpone"
          >
            Выбрать дату
          </PopMenuItem>
        </div>
      </template>
    </PopMenu>
  </div>
</template>

<script>
import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'
import DoitnowModalBoxSetDate from '@/components/Doitnow/DoitnowModalBoxSetDate.vue'

export default {
  components: {
    DoitnowModalBoxSetDate,
    PopMenu,
    PopMenuItem
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  emits: ['postpone'],
  data () {
    return {
      postponeValue: {
        minutes: 10,
        days: 0
      },
      showSetDate: false
    }
  },
  computed: {
    postpone () {
      if (this.postponeValue.days > 0) {
        if (this.postponeValue.days === 1) return 'завтра'
        //
        const date = new Date()
        date.setHours(9, 0, 0, 0) // на 9 утра
        date.setDate(date.getDate() + this.postponeValue.days)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        return `${day}.${month}.${date.getFullYear()}`
      }
      if (this.postponeValue.minutes === 60) {
        return '1 час'
      }
      if (this.postponeValue.minutes === 180) {
        return '3 часа'
      }
      return `${this.postponeValue.minutes} минут`
    }
  },
  methods: {
    onPostpone () {
      const date = new Date()
      if (this.postponeValue.days > 0) {
        date.setHours(9, 0, 0, 0) // на 9 утра
        date.setDate(date.getDate() + this.postponeValue.days)
      } else if (this.postponeValue.minutes > 0) {
        date.setMinutes(date.getMinutes() + this.postponeValue.minutes)
      }
      this.$emit('postpone', date)
    },
    onSetPostpone (value) {
      this.postponeValue = value
    },
    onSelectPostpone () {
      // выбрать дату - через диалог
      this.showSetDate = true
    },
    onSetDate (date) {
      this.showSetDate = false
      this.$emit('postpone', date)
    }
  }
}
</script>

<style>

</style>
