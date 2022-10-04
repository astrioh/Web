<template>
  <div
    v-if="shouldShowPostpone"
    class="flex group hover:cursor-pointer items-center text-sm font-medium min-h-[40px] w-[221px] rounded-lg mb-2 pl-[10px] whitespace-nowrap text-[#3e3e3f]"
  >
    <button
      class="px-4 rounded-lg mr-2 hover:bg-gray-300 text-sm bg-opacity-70 font-medium text-center w-[200px] h-[40px] bg-white justify-center text-[#424242]"
      @click="!postponeDate.end ? postponeTask(task.date_begin, task.date_end, timeArr[postponeIndex]) : changeDates(postponeDate.start, postponeDate.end)"
    >
      Отложить на {{ !postponeDate.end ? timeArr[postponeIndex].name : transformPostponeDate }}
    </button>
    <PopMenu @click.stop>
      <span
        class="inline-block cursor-pointer w-[20px] text-center"
      >
        ▼
      </span>
      <template #menu>
        <div class="h-[155px] overflow-y-auto w-[220px] scroll-style">
          <PopMenuItem
            v-for="(item, index) in timeArr"
            :key="item.index"
            @click="$emit('changePostponeIndex', index)"
          >
            <div class="flex justify-between w-full items-center">
              <span
                class="truncate"
              >
                {{ item.name }}
              </span>
            </div>
          </PopMenuItem>
          <PopMenuItem
            v-if="shouldShowPostpone"
            @click.stop
          >
            <SetDate
              class="hover:cursor-pointer"
              :name="'Назначить срок'"
              :date-begin="task.date_begin"
              :date-end="task.date_end"
              :date-text="task.term_user"
              @changeDates="changePostponeDate"
            />
          </PopMenuItem>
        </div>
      </template>
    </PopMenu>
  </div>
</template>
<script>
import SetDate from '@/components/Doitnow/SetDate.vue'

import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'

import pauseD from '@/icons/doitnow/pause.js'

export default {
  components: {
    PopMenu,
    SetDate,
    PopMenuItem
  },
  props: {
    task: {
      type: Object,
      default: () => {}
    },
    user: {
      type: Object,
      default: () => {}
    },
    postponeIndex: {
      type: Number,
      default: 0
    },
    postponeDate: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['postponeTask', 'changeDateEditingStatus', 'changeDates', 'changePostponeIndex', 'changePostponeDate'],
  data () {
    return {
      pauseD
    }
  },
  computed: {
    shouldShowPostpone () {
      return this.task.uid_customer === this.user?.current_user_uid || this.task.uid_performer === this.user?.current_user_uid
    },
    timeArr () {
      return [{
        value: 10,
        name: '10 минут'
      }, {
        value: 1,
        name: '1 час'
      }, {
        value: 3,
        name: '3 часа'
      },
      {
        value: 1,
        name: 'Завтра'
      }]
    },
    transformPostponeDate () {
      const date = new Date(this.postponeDate.end)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      return `${day}.${month}.${date.getFullYear()}`
    }
  },
  methods: {
    postponeTask (dateBegin, dateEnd, item) {
      this.$emit('postponeTask', dateBegin, dateEnd, item)
    },
    changeDateEditingStatus (value) {
      this.$emit('changeDateEditingStatus', value)
    },
    changeDates (begin, end) {
      this.$emit('changeDates', begin, end)
    },
    changePostponeDate (dateBegin, dateEnd) {
      this.$emit('changePostponeDate', dateBegin, dateEnd)
    }
  }
}
</script>
