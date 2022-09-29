<template>
  <div class="w-full h-full relative overflow-x-hidden">
    <NavBar
      class="pt-[8px]"
      title="Очередь"
    />
    <DoitnowSkeleton
      v-if="isLoading"
      class="ml-0 pt-[15px] z-[2] grow"
    />
    <DoitnowOnboarding
      v-else-if="displayModal"
      @okToModal="okToModal"
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
          <DoitnowTask
            v-else
            :key="firstTask.uid"
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
            class="py-3 px-4 rounded-lg mr-2 hover:bg-gray-300 text-sm bg-opacity-70 font-medium text-center w-[200px] h-[40px] bg-white justify-center text-[#424242]"
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
import * as SLIDES from '@/store/actions/slides.js'

import DoitnowSlide from '@/components/Doitnow/DoitnowSlide.vue'
import DoitnowEmpty from '@/components/Doitnow/DoitnowEmpty.vue'
import DoitnowTask from '@/components/Doitnow/DoitnowTask.vue'
import DoitnowSkeleton from '@/components/Doitnow/DoitnowSkeleton.vue'
import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'
import SetDate from '@/components/Doitnow/SetDate.vue'
import NavBar from '@/components/Navbar/NavBar.vue'

import { PUSH_COLOR } from '@/store/actions/colors'
import { USER_VIEWED_MODAL } from '@/store/actions/onboarding.js'
import { TASK_STATUS } from '@/constants'

import DoitnowReglament from './Doitnow/DoitnowReglament.vue'
import DoitnowLimit from '@/components/Doitnow/DoitnowLimit'
import DoitnowOnboarding from './Doitnow/DoitnowOnboarding.vue'

export default {
  components: {
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
      unreadTasks: [],
      todayTasks: [],
      readyTasks: [],
      unreadDelegateByMe: [],
      unreadDelegateToMe: [],
      readyTasksReaded: [],
      readyTasksUnreaded: [],
      openedTasks: [],
      slidesCopy: [],
      projectTasks: [],
      unsortedTasks: [],
      notifiesCopy: [],
      tasksLoaded: false,
      childrens: [],
      isTaskMessagesLoading: false,
      postponeIndex: 0,
      postponeDate: ''
    }
  },
  computed: {
    tasksCount () {
      return (
        this.slidesCopy.length +
        this.unreadTasks.length +
        this.readyTasks.length +
        this.todayTasks.length +
        this.notifiesCopy.length
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
      if (this.slidesCopy.length && this.justRegistered) {
        return this.slidesCopy[0]
      }
      if (this.notifiesCopy.length) {
        return this.notifiesCopy[0]
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
    slides () {
      return this.$store.state.slides.slides
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
    isLoading () {
      return this.$store.state.tasks.status === 'loading' || !this.isNotifiesLoaded
    },
    isNotifiesLoaded () {
      return this.$store.state.notificationtasks.status === 'success'
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
    notifies () {
      this.setNotifiesCopy(this.$store.state.notificationtasks.notificationtasks)
      return this.$store.state.notificationtasks.notificationtasks
    },
    isSlide () {
      return this.firstTask?.mode === 'slide'
    },
    isReglament () {
      return !!this.firstTask?.notify
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
    this.$store.dispatch('NOTIFICATION_TASKS_GENERATE').then(() => {
      this.notifiesCopy = [...this.notifies]
    })
    if (this.justRegistered) {
      this.setSlidesCopy()
    }
    if (!this.displayModal) {
      this.loadAllTasks()
    }
    this.$store.dispatch('fullScreenToggle', 'add')
  },
  unmounted: function () {
    this.$store.dispatch('NOTIFICATION_TASKS_CLEAR')
  },
  methods: {
    loadAllTasks: function () {
      this.$store.dispatch(TASK.DOITNOW_TASKS_REQUEST)
        .then((result) => {
          // сортировка непрочитанных
          for (let i = 0; i < result[0].length; i++) {
            // Поручено мной
            if (result[0][i].uid_customer === this.user?.current_user_uid) {
              this.unreadDelegateByMe.unshift(result[0][i])
            } else {
              // Поручено мне
              if (result[0][i].uid_performer === this.user?.current_user_uid) {
                this.unreadDelegateToMe.unshift(result[0][i])
              } else {
                // Готово к сдаче
                if (result[0][i].status === TASK_STATUS.TASK_READY) {
                  this.readyTasksUnreaded.push(result[0][i])
                } else {
                  // Доступ
                  if (result[0][i].emails.includes(this.user?.current_user_email) || (result[0][i].uid_project !== '00000000-0000-0000-0000-000000000000')) {
                    this.openedTasks.push(result[0][i])
                  }
                }
              }
            }
          }
          // Готово к сдаче
          this.$store.dispatch(TASK.READY_FOR_COMPLITION_TASKS_REQUEST)
            .then((resp) => {
              if (resp.data.anothers_markers.length) {
                this.$store.commit(PUSH_COLOR, resp.data.anothers_markers)
              }
              if (resp.data.anothers_tags.length) {
                this.$store.commit(TASK.ADD_TASK_TAGS, resp.data.anothers_tags)
              }
              for (let i = 0; i < resp.data.tasks.length; i++) {
                if (resp.data.tasks[i].readed) {
                  this.readyTasksReaded.push(resp.data.tasks[i])
                }
              }
            })
            .then(() => {
              // Отправляем в главный массив (непрочитанное) отсортированные массивы по очереди
              this.unreadTasks = [...this.unreadDelegateByMe, ...this.unreadDelegateToMe,
                ...this.readyTasksUnreaded, ...this.projectTasks, ...this.unsortedTasks]
              // Отправляем в главный массив (готовые) отсортированные данные
              this.readyTasks = [...this.readyTasksReaded]
              this.todayTasks = [...result[2]]
              this.openedTasks = [...this.openedTasks]
              // удаляем из массивов задачи со статусом "завершено"
              this.unreadTasks = this.unreadTasks.filter(task => (task.status !== TASK_STATUS.TASK_COMPLETED) && (task.status !== TASK_STATUS.TASK_REJECTED))
              this.readyTasks = this.readyTasks.filter(task => (task.status !== TASK_STATUS.TASK_COMPLETED) && (task.status !== TASK_STATUS.TASK_REJECTED))
              this.todayTasks = this.todayTasks.filter(task => (task.status !== TASK_STATUS.TASK_COMPLETED) && (task.status !== TASK_STATUS.TASK_REJECTED))
              this.openedTasks = this.openedTasks.filter(task => (task.status !== TASK_STATUS.TASK_COMPLETED) && (task.status !== TASK_STATUS.TASK_REJECTED))
            })
        })
        .then(() => {
          this.tasksLoaded = true
        })
    },
    setSlidesCopy () {
      for (let i = 0; i < this.slides.length; i++) {
        if (!!this.slides[i].visible && (new Date(this.slides[i].reminder) <= new Date())) {
          this.slidesCopy.push(this.slides[i])
        }
      }
    },
    pad2 (n) {
      return (n < 10 ? '0' : '') + n
    },
    postponeTask (end, item) {
      const dateEnd = end ? new Date(end) : new Date()
      if (item) {
        switch (item.name) {
          case '10 минут':
            dateEnd.setMinutes(dateEnd.getMinutes() + item.value)
            break
          case '1 час':
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
      const year = dateEnd.getFullYear()
      const hours = this.pad2(dateEnd.getHours())
      const minutes = this.pad2(dateEnd.getMinutes())
      const seconds = this.pad2(dateEnd.getSeconds())
      const newDateEnd = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

      const slide = {
        name: this.firstTask.name,
        visible: this.firstTask.visible,
        reminder: newDateEnd
      }
      this.$store.commit(SLIDES.CHANGE_VISIBLE, slide)
      this.nextTask()
    },
    setPostponeDate (date) {
      this.postponeDate = date
    },
    setNotifiesCopy () {
      this.notifiesCopy = this.notifies
    },
    okToModal () {
      this.$store.commit(USER_VIEWED_MODAL, 'doitnow')
      this.loadAllTasks()
    },
    readTask: function () {
      this.$store.dispatch(TASK.CHANGE_TASK_READ, this.firstTask.uid)
    },
    nextTask: function () {
      // Удаляем поппер 'Отложить', т.к из-за него ломается анимация
      document.querySelectorAll('.popper').forEach(popper => popper.remove())

      if (this.slidesCopy.length && this.justRegistered) {
        this.slidesCopy.shift()
        return
      }
      if (this.notifiesCopy.length) {
        this.notifiesCopy.shift()
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
        return
      }
      if (this.openedTasks.length) {
        this.openedTasks.shift()
      }
    },
    changeValue: function (objWithValues) {
      for (const elem in objWithValues) {
        this.firstTask[elem] = objWithValues[elem]
      }
    },
    onClickTask: function (task) {
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
