<template>
  <PopMenu
    :disabled="dateIsNotEditingNow"
    class="flex ml-[10px] flex-col min-w-[200px] items-center"
  >
    <div
      v-if="shouldShowPostpone"
      class="flex hover:cursor-pointer items-center text-sm hover:bg-[#0000000a] font-medium min-h-[40px] w-[221px] rounded-lg mb-2 pl-[22px] whitespace-nowrap text-[#3e3e3f]"
      @click="changeDateEditingStatus(false)"
    >
      <div class="w-[16px] h-[16px] flex items-center justify-center">
        <Icon
          :path="pauseD.path"
          :width="pauseD.width"
          :height="pauseD.height"
          :box="pauseD.viewBox"
        />
      </div>
      <span class="ml-[10px] w-[70px]">Отложить</span>
    </div>
    <template #menu>
      <div class="h-[155px] overflow-y-auto w-[220px] scroll-style">
        <PopMenuItem
          v-for="item in timeArr"
          :key="item.index"
          @click="postponeTask(task.date_begin, task.date_end, item)"
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
            @changeDates="changeDates"
          />
        </PopMenuItem>
      </div>
    </template>
  </PopMenu>
</template>
<script>
import { TASK_STATUS } from '@/constants'

import SetDate from '@/components/Doitnow/SetDate.vue'

import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'

import Icon from '@/components/Icon.vue'

import pauseD from '@/icons/doitnow/pause.js'

export default {
  components: {
    PopMenu,
    SetDate,
    PopMenuItem,
    Icon
  },
  props: {
    task: {
      type: Object,
      default: () => {}
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['postponeTask', 'changeDateEditingStatus', 'changeDates'],
  data () {
    return {
      pauseD
    }
  },
  computed: {
    shouldShowPostpone () {
      return this.task.uid_customer === this.user?.current_user_uid || this.task.uid_performer === this.user?.current_user_uid
    },
    shouldShowSetDate () {
      return this.task.status !== TASK_STATUS.NOTE && this.task.type !== TASK_STATUS.TASK_IN_WORK && this.task.uid_customer === this.user?.current_user_uid
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
    }
  }
}
</script>
