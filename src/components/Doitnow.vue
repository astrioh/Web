<template>
  <div class="w-full h-full relative overflow-x-hidden">
    <NavBar
      class="pt-[8px]"
      title="Очередь"
    />
    <DoitnowOnboarding
      v-if="displayModal"
      @okToModal="okToModal"
    />
    <DoitnowSkeleton
      v-else-if="isLoadingDoits"
      class="ml-0 pt-[15px] z-[2] grow"
    />
    <DoitnowLimit
      v-else-if="showLimitMessage"
    />
    <transition
      v-else-if="tasksCount"
      name="slide-in-fade-out"
    >
      <div
        :key="firstTask.uid"
        class="flex justify-between gap-[20px]"
      >
        <div class="grow overflow-hidden">
          <DoitnowSlide
            v-if="isSlide"
            :name="firstTask.name"
            :reminder="firstTask.reminder"
            @nextTask="nextTask"
          />
          <DoitnowReglament
            v-else-if="isReglament"
            :name="firstTask.name"
            :uid="firstTask.uid"
            :date="firstTask.lastDate"
            :last-change="firstTask.lastComment"
          />
          <DoitnowCard
            v-else-if="isCard"
            :card="firstTask"
            @next="nextTask"
          />
          <DoitnowTask
            v-else
            :task="firstTask"
            :childrens="childrens"
            :sub-tasks="subTasks"
            :colors="colors"
            :tags="tags"
            :user="user"
            :task-messages="taskMessages.slice().reverse()"
            :employees="employees"
            :projects="projects"
            :tasks-count="tasksCount"
            :is-task-messages-loading="isTaskMessagesLoading"
            @clickTask="onClickTask"
            @nextTask="nextTask"
            @changeValue="changeValue"
            @readTask="readTask"
          />
        </div>
        <div
          v-if="isReglament || isSlide"
          class="flex-none flex mb-5 justify-end items-center self-start z-[1]"
        >
          <button
            class="pt-[10px] pb-3 px-4 rounded-lg mr-2 hover:bg-gray-300 text-sm bg-opacity-70 font-medium text-center w-[200px] h-[40px] bg-white justify-center text-[#424242]"
            @click="!postponeDate ? postponeTask(firstTask.reminder, timeArr[postponeIndex]) : postponeTask(postponeDate)"
          >
            Отложить на {{ !postponeDate ? timeArr[postponeIndex].name : transformPostponeDate }}
          </button>
          <PopMenu>
            <span class="inline-block cursor-pointer w-[20px] text-center">
              ▼
            </span>
            <template #menu>
              <div
                class="h-[155px] overflow-y-auto w-[220px] scroll-style"
              >
                <PopMenuItem
                  v-for="(item, index) in timeArr"
                  :key="item.index"
                  @click="changePostponeIndex(index)"
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
                  @click.stop
                >
                  <SetDate
                    class="hover:cursor-pointer"
                    :name="'Назначить срок'"
                    :date-begin="new Date()"
                    :date-end="new Date()"
                    :date-text="'Сегодня'"
                    @changeDates="setPostponeDate"
                  />
                </PopMenuItem>
              </div>
            </template>
          </PopMenu>
        </div>
      </div>
    </transition>
    <DoitnowEmpty
      v-else
      class="ml-0 pt-[15px] z-[2] grow"
    />
  </div>
</template>

<script>
import * as FILES from '@/store/actions/taskfiles.js'
import * as MSG from '@/store/actions/taskmessages.js'
import * as TASK from '@/store/actions/tasks.js'
import * as CARD from '@/store/actions/cards.js'
import * as SLIDES from '@/store/actions/slides.js'
import * as REGLAMENTS from '@/store/actions/reglaments.js'

import DoitnowCard from '@/components/Doitnow/DoitnowCard.vue'
import DoitnowSlide from '@/components/Doitnow/DoitnowSlide.vue'
import DoitnowEmpty from '@/components/Doitnow/DoitnowEmpty.vue'
import DoitnowTask from '@/components/Doitnow/DoitnowTask.vue'
import DoitnowSkeleton from '@/components/Doitnow/DoitnowSkeleton.vue'
import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'
import SetDate from '@/components/Doitnow/SetDate.vue'
import NavBar from '@/components/Navbar/NavBar.vue'

import { USER_VIEWED_MODAL } from '@/store/actions/onboarding.js'

import DoitnowReglament from './Doitnow/DoitnowReglament.vue'
import DoitnowLimit from '@/components/Doitnow/DoitnowLimit'
import DoitnowOnboarding from './Doitnow/DoitnowOnboarding.vue'

export default {
  components: {
    DoitnowCard,
    DoitnowSlide,
    DoitnowLimit,
    DoitnowEmpty,
    DoitnowSkeleton,
    DoitnowTask,
    DoitnowReglament,
    NavBar,
    DoitnowOnboarding,
    PopMenu,
    PopMenuItem,
    SetDate
  },
  data () {
    return {
      cards: [],
      unreadTasks: [],
      todayTasks: [],
      readyTasks: [],
      greetingSlides: [],
      reglaments: [],
      childrens: [],
      isTaskMessagesLoading: false,
      postponeIndex: 0,
      postponeDate: '',
      isLoadingDoits: false
    }
  },
  computed: {
    tasksCount () {
      return (
        this.greetingSlides.length +
        this.unreadTasks.length +
        this.readyTasks.length +
        this.todayTasks.length +
        this.reglaments.length +
        this.cards.length
      )
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
    firstTask () {
      if (this.greetingSlides.length) {
        return this.greetingSlides[0]
      }
      if (this.reglaments.length) {
        return this.reglaments[0]
      }
      if (this.cards.length) {
        return this.cards[0]
      }
      if (this.unreadTasks.length) {
        return this.unreadTasks[0]
      }
      if (this.readyTasks.length) {
        return this.readyTasks[0]
      }
      if (this.todayTasks.length) {
        return this.todayTasks[0]
      }
      return null
    },
    taskMessages () {
      return this.$store.state.taskfilesandmessages.messages
    },
    employees () {
      return this.$store.state.employees.employees
    },
    projects () {
      return this.$store.state.projects.projects
    },
    colors () {
      return this.$store.state.colors.colors
    },
    tags () {
      return this.$store.state.tasks.tags
    },
    user () {
      return this.$store.state.user.user
    },
    subTasks () {
      return this.$store.state.tasks.subtasks.tasks
    },
    displayModal () {
      return !this.$store.state.onboarding?.visitedModals?.includes('doitnow') && this.$store.state.onboarding?.showModals
    },
    isSlide () {
      return this.firstTask?.mode === 'slide'
    },
    isReglament () {
      return !!this.firstTask?.notify
    },
    isCard () {
      return !!this.firstTask?.uid_board
    },
    justRegistered () {
      return this.$store.state.onboarding.justRegistered
    },
    showLimitMessage () {
      const tarif = this.$store.state.user.user.tarif
      return (tarif !== 'alpha' && tarif !== 'trial') || this.$store.getters.isLicenseExpired
    },
    transformPostponeDate () {
      const date = new Date(this.postponeDate)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      return `${day}.${month}.${date.getFullYear()}`
    }
  },
  watch: {
    firstTask (newtask) {
      this.postponeDate = ''
      this.postponeIndex = 0
      if (newtask && newtask.uid && !this.isReglament) {
        this.isTaskMessagesLoading = true
        this.$store.dispatch(TASK.GET_TASK_CHILDRENS, newtask.uid)
          .then((resp) => {
            this.childrens = resp.data.tasks
          })
        this.$store.commit(TASK.SELECT_TASK, newtask)
        this.$store.dispatch(MSG.MESSAGES_REQUEST, newtask.uid)
          .then(() => {
            this.$store.dispatch(FILES.FILES_REQUEST, newtask.uid)
              .then(() => {
                this.$store.dispatch(MSG.INSPECTOR_MESSAGES_REQUEST, newtask.uid)
                  .then(() => {
                    this.$store.commit(FILES.MERGE_FILES_WITH_MESSAGES)
                  }).finally(() => {
                    this.isTaskMessagesLoading = false
                  })
              })
          })
          .catch(() => {
            this.isNextTaskLoading = false
          })
        this.$store.dispatch(MSG.INSPECTOR_MESSAGES_REQUEST, newtask.uid)
        this.$store.dispatch(TASK.SUBTASKS_REQUEST, newtask.uid)
      }
    }
  },
  mounted: function () {
    this.loadAll()
    this.$store.dispatch('fullScreenToggle', 'add')
  },
  unmounted: function () {
    this.$store.dispatch('NOTIFICATION_TASKS_CLEAR')
  },
  methods: {
    async loadAll () {
      this.isLoadingDoits = true
      //
      try {
      // получаем карточки
        this.cards = await this.$store.dispatch(CARD.DOITNOW_CARDS_REQUEST)
        // ждем пока сгенерируются регламенты
        // потом их получаем
        await this.$store.dispatch('NOTIFICATION_TASKS_GENERATE')
        this.reglaments = [...this.$store.state.notificationtasks.notificationtasks]
        // получаем слайды (только если мы только что зарегились)
        if (this.justRegistered) {
          const currDate = new Date()
          const storeSlides = this.$store.state.slides.slides
          this.greetingSlides = storeSlides.filter(slide => !!slide.visible && (new Date(slide.reminder) <= currDate))
        }
        // получаем задачи
        const [tasksUnread, tasksOwerdue, tasksToday, tasksReady] = await this.$store.dispatch(TASK.DOITNOW_TASKS_REQUEST)
        const currentUserUid = this.user?.current_user_uid
        const unreadDelegateByMe = tasksUnread.filter(task => task.uid_customer === currentUserUid)
        const unreadDelegateToMe = tasksUnread.filter(task => task.uid_customer !== currentUserUid && this.uid_performer === currentUserUid)
        // заполняем главные массивы задач очереди
        this.unreadTasks = [
        // в массив не попали непрочитанные расшаренные мне задачи
        // только задачи с которыми я связан как заказчик или исполнитель
          ...unreadDelegateByMe,
          ...unreadDelegateToMe
        ]
        this.readyTasks = [...tasksReady]
        this.todayTasks = [
          ...tasksOwerdue, // просроченные
          ...tasksToday // сегодня
        ]
      } catch (e) {
        // очищаем все массивы, как буд-то очередь пустая
        // (по хорошему нужно сделать на экране сообщение - не удалось загрузить, кнопка попробовать еще раз)
        this.greetingSlides = []
        this.unreadTasks = []
        this.readyTasks = []
        this.todayTasks = []
        this.reglaments = []
        this.cards = []
        // репортим ошибку
        console.log('Doitnow loadAll error', e)
      }
      //
      this.isLoadingDoits = false
    },
    pad2 (n) {
      return (n < 10 ? '0' : '') + n
    },
    postponeTask (end, item) {
      const dateEnd = end ? new Date(end) : new Date()
      console.log(item)
      if (item) {
        switch (item.name) {
          case '10 минут':
            dateEnd.setMinutes(dateEnd.getMinutes() + item.value)
            break
          case '1 час':
            dateEnd.setHours(dateEnd.getHours() + item.value)
            break
          case '3 часа':
            dateEnd.setHours(dateEnd.getHours() + item.value)
            break
          case 'Завтра':
            dateEnd.setDate(dateEnd.getDate() + item.value)
            break
        }
      }

      const month = this.pad2(dateEnd.getMonth() + 1)
      const day = this.pad2(dateEnd.getDate())
      const year = String(dateEnd.getFullYear()).padStart(4, '0')
      const hours = this.pad2(dateEnd.getHours())
      const minutes = this.pad2(dateEnd.getMinutes())
      const seconds = this.pad2(dateEnd.getSeconds())
      const newDateEnd = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

      if (this.isReglament) {
        const reglamentReminder = {
          uid_user: this.user?.current_user_uid,
          uid_reglament: this.firstTask.uid,
          reminder_date: newDateEnd
        }
        this.$store.dispatch(REGLAMENTS.SET_REGLAMENT_REMINDER, reglamentReminder).then((resp) => {
          const reglament = this.$store.state.reglaments.reglaments[reglamentReminder.uid_reglament]
          if (reglament) reglament.reminder = reglamentReminder.reminder_date
        })
        this.nextTask()
        return
      }
      if (this.isSlide) {
        const slide = {
          name: this.firstTask.name,
          visible: this.firstTask.visible,
          reminder: newDateEnd
        }
        this.$store.commit(SLIDES.CHANGE_VISIBLE, slide)
        this.nextTask()
      }
    },
    setPostponeDate (date) {
      this.postponeDate = date
    },
    okToModal () {
      this.$store.commit(USER_VIEWED_MODAL, 'doitnow')
    },
    readTask () {
      this.$store.dispatch(TASK.CHANGE_TASK_READ, this.firstTask?.uid)
    },
    nextTask () {
      // Удаляем поппер 'Отложить', т.к из-за него ломается анимация
      document.querySelectorAll('.popper').forEach(popper => popper.remove())

      if (this.greetingSlides.length) {
        this.greetingSlides.shift()
        return
      }
      if (this.reglaments.length) {
        this.reglaments.shift()
        return
      }
      if (this.cards.length) {
        this.cards.shift()
        return
      }
      this.readTask()
      if (this.unreadTasks.length) {
        this.unreadTasks.shift()
        return
      }
      if (this.readyTasks.length) {
        this.readyTasks.shift()
        return
      }
      if (this.todayTasks.length) {
        this.todayTasks.shift()
      }
    },
    changeValue (objWithValues) {
      for (const elem in objWithValues) {
        this.firstTask[elem] = objWithValues[elem]
      }
    },
    onClickTask (task) {
      this.$store.commit('basic', { key: 'propertiesState', value: 'task' })
      this.$store.dispatch(TASK.SELECT_TASK, task)
      this.$store.dispatch('asidePropertiesToggle', true)
    },
    changePostponeIndex (index) {
      this.postponeDate = ''
      this.postponeIndex = index
    }
  }
}
</script>

<style scoped>
.slide-in-fade-out-enter-from {
  transform: translateX(45px);
}

.slide-in-fade-out-enter-active {
  transition-delay: .4s;
  transition-property: opacity, transform;
  transition-duration: .4s;
}

.slide-in-fade-out-enter-from, .slide-in-fade-out-leave-to {
  opacity: 0;
}

.slide-in-fade-out-leave-active {
  transition-property: opacity, transform;
  transition-duration: .8s;
}

.slide-in-fade-out-leave-to {
  position: absolute;
  width: 100%;
}
</style>
