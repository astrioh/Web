<template>
  <div>
    <TaskPropsAccessLimitModalBox
      v-if="showAccessLimit"
      @cancel="showAccessLimit = false"
      @ok="showAccessLimit = false"
    />
    <ModalBoxDelete
      v-if="showConfirm"
      title="Удалить проект"
      :text="`Вы действительно хотите удалить проект ${selectedProjectName}?`"
      @cancel="showConfirm = false"
      @yes="removeProject"
    />
    <ModalBoxDelete
      v-if="showConfirmQuit"
      title="Покинуть проект"
      :text="`Вы действительно хотите покинуть проект ${selectedProjectName}? Обратно можно попасть, только если владелец проекта опять вас добавит.`"
      @cancel="showConfirmQuit = false"
      @yes="quitProject"
    />
    <div class="flex justify-between items-center">
      <PopMenu>
        <PropsButtonMenu />
        <template #menu>
          <PopMenuItem
            v-if="isCanDelete"
            icon="delete"
            @click="showConfirm = true"
          >
            Удалить
          </PopMenuItem>
          <PopMenuItem
            v-else
            icon="delete"
            @click="showConfirmQuit = true"
          >
            Покинуть проект
          </PopMenuItem>
        </template>
      </PopMenu>
      <PropsButtonClose @click="closeProperties" />
    </div>
    <input
      v-if="isCanEdit"
      v-model="currName"
      type="text"
      placeholder="Наименование"
      class="mt-[25px] p-0 font-roboto font-bold font-[18px] leading-[21px] text-[#424242] w-full border-none focus:ring-0 focus:outline-none"
      @blur="changeProjectName"
    >
    <div
      v-else
      class="mt-[25px] w-full font-roboto font-bold font-[18px] leading-[21px] text-[#424242] overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {{ currName }}
    </div>
    <div
      class="mt-[30px] font-roboto text-[16px] leading-[19px] font-medium text-[#4c4c4d]"
    >
      Цвет
    </div>
    <div class="w-full mt-[15px] gap-[4px] flex flex-col">
      <div
        v-for="(clrs, index) in defaultColors"
        :key="index"
        class="flex gap-[4px]"
      >
        <PropsColorBoxItem
          v-for="clr in clrs"
          :key="clr.color"
          :class="{ 'cursor-pointer': isCanEdit }"
          :color="clr.color"
          :selected="clr.selected"
          @select="changeProjectColor"
        />
      </div>
    </div>
    <div
      class="mt-[45px] flex gap-[10px] items-center"
      :class="{'cursor-pointer': isCanEdit}"
      @click="favoriteToggle"
    >
      <svg
        v-if="isFavorite"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 5C0 2.23858 2.23858 0 5 0H15C17.7614 0 20 2.23858 20 5V15C20 17.7614 17.7614 20 15 20H5C2.23858 20 0 17.7614 0 15V5Z"
          fill="#FF9123"
        />
        <path
          d="M9.02899 14.1663C8.80147 14.1663 8.57397 14.0661 8.34645 13.9659L4.59245 11.46C4.13742 11.1593 4.02366 10.4577 4.36494 10.0567C4.70621 9.65579 5.50251 9.55555 5.95754 9.85626L8.91524 11.7607L14.7169 6.14759C15.1719 5.74665 15.8545 5.74665 16.3095 6.04735C16.7645 6.44829 16.7645 7.0497 16.4232 7.45064L9.93905 13.6652C9.71154 14.0661 9.37026 14.1663 9.02899 14.1663Z"
          fill="white"
        />
      </svg>
      <svg
        v-else
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="20"
          height="20"
          rx="4"
          fill="#EEEFF1"
        />
        <rect
          x="0.5"
          y="0.5"
          width="19"
          height="19"
          rx="3.5"
          stroke="black"
          stroke-opacity="0.1"
        />
      </svg>

      <div class="font-roboto text-[16px] leading-[20px] text-[#4c4c4d]">
        Избранный проект
      </div>
    </div>
    <div
      class="mt-[30px] mb-[8px] font-roboto text-[16px] leading-[19px] font-medium text-[#4c4c4d]"
    >
      Доступ
    </div>
    <PopMenu
      v-if="isCanEdit && usersCanAddToAccess.length"
      class="w-full"
    >
      <div
        class="w-full h-[34px] gap-[5px] flex items-center text-[#4c4c4d] hover:text-[#4c4c4d]/75 cursor-pointer"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.66824 7.3379L8.67295 3.28854C8.67295 3.111 8.60243 2.94074 8.47689 2.8152C8.35135 2.68967 8.18109 2.61914 8.00356 2.61914C7.82602 2.61914 7.65576 2.68967 7.53022 2.8152C7.40469 2.94074 7.33416 3.111 7.33416 3.28853L7.33888 7.3379L3.28951 7.33319C3.11198 7.33319 2.94171 7.40371 2.81618 7.52925C2.69064 7.65478 2.62012 7.82505 2.62012 8.00258C2.62012 8.18011 2.69064 8.35038 2.81618 8.47591C2.94171 8.60145 3.11198 8.67197 3.28951 8.67197L7.33888 8.66726L7.33416 12.7166C7.3338 12.8046 7.35087 12.8918 7.38438 12.9732C7.41789 13.0546 7.46719 13.1285 7.52942 13.1908C7.59165 13.253 7.66559 13.3023 7.74696 13.3358C7.82834 13.3693 7.91555 13.3864 8.00356 13.386C8.09156 13.3864 8.17877 13.3693 8.26015 13.3358C8.34153 13.3023 8.41546 13.253 8.47769 13.1908C8.53993 13.1285 8.58922 13.0546 8.62273 12.9732C8.65624 12.8918 8.67331 12.8046 8.67295 12.7166L8.66824 8.66726L12.7176 8.67197C12.8056 8.67233 12.8928 8.65527 12.9742 8.62176C13.0556 8.58824 13.1295 8.53895 13.1917 8.47672C13.254 8.41449 13.3033 8.34055 13.3368 8.25917C13.3703 8.17779 13.3874 8.09059 13.387 8.00258C13.3874 7.91457 13.3703 7.82736 13.3368 7.74599C13.3033 7.66461 13.254 7.59067 13.1917 7.52844C13.1295 7.46621 13.0556 7.41692 12.9742 7.3834C12.8928 7.34989 12.8056 7.33283 12.7176 7.33319L8.66824 7.3379Z"
            fill="currentColor"
          />
        </svg>

        <div
          class="font-roboto text-[13px] leading-[15px] font-medium"
        >
          Добавить сотрудника
        </div>
      </div>
      <template #menu>
        <div class="max-h-[220px] overflow-y-auto w-[220px] scroll-style">
          <ProjectPropsMenuItemUser
            v-for="user in usersCanAddToAccess"
            :key="user.email"
            :user-email="user.email"
            @click="addProjectMember(user.email)"
          />
        </div>
      </template>
    </PopMenu>
    <ProjectPropsUserButton
      class="mt-[8px]"
      :user-email="selectedProjectCreatorEmail"
      status="Владелец"
      disabled
    />
    <ProjectPropsUserButton
      v-for="user in usersBoard"
      :key="user.email"
      :user-email="user.email"
      :disabled="!isCanEdit"
      @delete="deleteMember(user.email)"
    />
    <div
      class="mt-[30px] mb-[8px] font-roboto text-[16px] leading-[19px] font-medium text-[#4c4c4d]"
    >
      Отдел
    </div>
    <PopMenu
      v-if="isCanEdit && usersCanAddToAccess.length"
      class="w-full"
    >
      <div
        class="w-full h-[34px] gap-[5px] flex items-center text-[#4c4c4d] hover:text-[#4c4c4d]/75 cursor-pointer"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.66824 7.3379L8.67295 3.28854C8.67295 3.111 8.60243 2.94074 8.47689 2.8152C8.35135 2.68967 8.18109 2.61914 8.00356 2.61914C7.82602 2.61914 7.65576 2.68967 7.53022 2.8152C7.40469 2.94074 7.33416 3.111 7.33416 3.28853L7.33888 7.3379L3.28951 7.33319C3.11198 7.33319 2.94171 7.40371 2.81618 7.52925C2.69064 7.65478 2.62012 7.82505 2.62012 8.00258C2.62012 8.18011 2.69064 8.35038 2.81618 8.47591C2.94171 8.60145 3.11198 8.67197 3.28951 8.67197L7.33888 8.66726L7.33416 12.7166C7.3338 12.8046 7.35087 12.8918 7.38438 12.9732C7.41789 13.0546 7.46719 13.1285 7.52942 13.1908C7.59165 13.253 7.66559 13.3023 7.74696 13.3358C7.82834 13.3693 7.91555 13.3864 8.00356 13.386C8.09156 13.3864 8.17877 13.3693 8.26015 13.3358C8.34153 13.3023 8.41546 13.253 8.47769 13.1908C8.53993 13.1285 8.58922 13.0546 8.62273 12.9732C8.65624 12.8918 8.67331 12.8046 8.67295 12.7166L8.66824 8.66726L12.7176 8.67197C12.8056 8.67233 12.8928 8.65527 12.9742 8.62176C13.0556 8.58824 13.1295 8.53895 13.1917 8.47672C13.254 8.41449 13.3033 8.34055 13.3368 8.25917C13.3703 8.17779 13.3874 8.09059 13.387 8.00258C13.3874 7.91457 13.3703 7.82736 13.3368 7.74599C13.3033 7.66461 13.254 7.59067 13.1917 7.52844C13.1295 7.46621 13.0556 7.41692 12.9742 7.3834C12.8928 7.34989 12.8056 7.33283 12.7176 7.33319L8.66824 7.3379Z"
            fill="currentColor"
          />
        </svg>

        <div
          class="font-roboto text-[13px] leading-[15px] font-medium"
        >
          Добавить отдел
        </div>
      </div>
      <template #menu>
        <div class="max-h-[220px] overflow-y-auto w-[220px] scroll-style">
          <PopMenuItem
            v-for="(dep,index) in allDepartments"
            :key="dep.uid"
            @click="setDepartment(index)"
          >
            <div class="flex justify-between w-full items-center">
              <span
                class="truncate"
                :class="currDepTitle === dep.name ? 'font-bold' : ''"
              >
                {{ dep.name }}
              </span>
              <svg
                v-if="currDepTitle === dep.name"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3346 4L6.0013 11.3333L2.66797 8"
                  stroke="#1CA345"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </PopMenuItem>
        </div>
      </template>
    </PopMenu>
    <div
      v-for="dep in depsProject"
      :key="dep.uid"
    >
      <div class="group w-full h-[34px] flex items-center">
        <div class="grow w-6/12 font-roboto text-[13px] leading-[20px] font-medium text-[#4c4c4d] mr-[7px] overflow-hidden text-ellipsis">
          {{ dep.name }}
        </div>
        <div class="flex-none">
          <div
            class="flex items-center text-[#7e7e80]"
            :class="{ 'cursor-pointer hover:text-[#4c4c4d]': !disabled }"
            @click="deleteDepartment(dep.uid)"
          >
            <svg
              class="invisible"
              :class="{ 'group-hover:visible': !disabled }"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1798 10.0034L14.7632 6.42841C14.9201 6.27149 15.0082 6.05866 15.0082 5.83674C15.0082 5.61483 14.9201 5.402 14.7632 5.24508C14.6062 5.08816 14.3934 5 14.1715 5C13.9496 5 13.7368 5.08816 13.5798 5.24508L10.0048 8.82841L6.42983 5.24508C6.27291 5.08816 6.06008 5 5.83817 5C5.61625 5 5.40342 5.08816 5.2465 5.24508C5.08958 5.402 5.00142 5.61483 5.00142 5.83674C5.00142 6.05866 5.08958 6.27149 5.2465 6.42841L8.82983 10.0034L5.2465 13.5784C5.16839 13.6559 5.1064 13.748 5.06409 13.8496C5.02178 13.9511 5 14.0601 5 14.1701C5 14.2801 5.02178 14.389 5.06409 14.4906C5.1064 14.5921 5.16839 14.6843 5.2465 14.7617C5.32397 14.8399 5.41614 14.9018 5.51768 14.9442C5.61923 14.9865 5.72816 15.0082 5.83817 15.0082C5.94818 15.0082 6.0571 14.9865 6.15865 14.9442C6.2602 14.9018 6.35236 14.8399 6.42983 14.7617L10.0048 11.1784L13.5798 14.7617C13.6573 14.8399 13.7495 14.9018 13.851 14.9442C13.9526 14.9865 14.0615 15.0082 14.1715 15.0082C14.2815 15.0082 14.3904 14.9865 14.492 14.9442C14.5935 14.9018 14.6857 14.8399 14.7632 14.7617C14.8413 14.6843 14.9033 14.5921 14.9456 14.4906C14.9879 14.389 15.0097 14.2801 15.0097 14.1701C15.0097 14.0601 14.9879 13.9511 14.9456 13.8496C14.9033 13.748 14.8413 13.6559 14.7632 13.5784L11.1798 10.0034Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectPropsUserButton from '@/components/Projects/ProjectPropsUserButton.vue'
import ProjectPropsMenuItemUser from '@/components/Projects/ProjectPropsMenuItemUser.vue'
import ModalBoxDelete from '@/components/Common/ModalBoxDelete.vue'
import PropsColorBoxItem from '@/components/Common/PropsColorBoxItem.vue'
import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'
import PropsButtonClose from '@/components/Common/PropsButtonClose.vue'
import PropsButtonMenu from '@/components/Common/PropsButtonMenu.vue'
import TaskPropsAccessLimitModalBox from '@/components/properties/TaskPropsAccessLimitModalBox.vue'

import * as PROJECT from '@/store/actions/projects'
import { NAVIGATOR_REMOVE_PROJECT } from '@/store/actions/navigator'

export default {
  components: {
    ModalBoxDelete,
    TaskPropsAccessLimitModalBox,
    ProjectPropsUserButton,
    ProjectPropsMenuItemUser,
    PropsColorBoxItem,
    PopMenu,
    PopMenuItem,
    PropsButtonClose,
    PropsButtonMenu
  },
  data () {
    return {
      showConfirm: false,
      showAccessLimit: false,
      showConfirmQuit: false,
      currName: ''
    }
  },
  computed: {
    defaultColors () {
      const allColors = [
        '',
        '#7fc870',
        '#69c494',
        '#dff2e1',
        '#ffaf40',
        '#ffd7a0',
        '#5ba4cf',
        '#9eedff',
        '#b381b3',
        '#e5e5e5',
        '#ddd1c2',
        '#ef7665',
        '#ffc6b5',
        '#ff8ed4',
        '#f5dbf5',
        '#6a7077',
        '#f6dd29',
        '#f5f547'
      ]
      // добавляем в конец выбранный цвет если его тут нет
      const usedColor = this.selectedProjectColor.toLowerCase()
      if (!allColors.includes(usedColor)) {
        allColors.splice(allColors.length - 1, 1, usedColor)
      }
      const colors = allColors.map((color) => ({
        color: color,
        selected: color === usedColor
      }))
      // разбираем на ряды по 9
      const rowLength = 9
      const arrColors = []
      while (colors.length) arrColors.push(colors.splice(0, rowLength))
      return arrColors
    },
    allDepartments () {
      const deps = Object.values(this.$store.state.departments.deps)
      deps.sort((item1, item2) => {
        // сначала по порядку
        if (item1.order > item2.order) return 1
        if (item1.order < item2.order) return -1
        // если одинаковый, то по имени
        if (item1.name > item2.name) return 1
        if (item1.name < item2.name) return -1
        return 0
      })
      deps.unshift({
        uid: '00000000-0000-0000-0000-000000000000',
        name: 'Вне отдела'
      })
      return deps
    },
    isCanChangeDepartments () {
      const employees = this.$store.state.employees.employees
      const user = this.$store.state.user.user
      const userType = employees[user.current_user_uid].type
      return userType === 1 || userType === 2
    },
    employeesByEmail () {
      return this.$store.state.employees.employeesByEmail
    },
    selectedProject () {
      return this.$store.state.projects.selectedProject
    },
    selectedProjectUid () {
      return this.selectedProject?.uid || ''
    },
    selectedProjectDeps () {
      return this.selectedProject?.deps || ''
    },
    selectedProjectName () {
      return this.selectedProject?.name || ''
    },
    selectedProjectCreatorEmail () {
      return this.selectedProject?.email_creator || ''
    },
    selectedProjectColor () {
      const backColor = this.selectedProject?.color
      if (backColor && backColor !== '#A998B6') return backColor
      return ''
    },
    isCanDelete () {
      const user = this.$store.state.user.user
      return this.selectedProjectCreatorEmail === user.current_user_email
    },
    isCanEdit () {
      return this.isCanDelete
    },
    usersBoard () {
      const users = []
      const members = this.selectedProject?.members || []
      for (const userEmail of members) {
        const emp = this.employeesByEmail[userEmail.toLowerCase()]
        if (emp && emp?.email !== this.selectedProjectCreatorEmail) {
          users.push({
            uid: emp?.uid,
            email: emp?.email
          })
        }
      }
      return users
    },
    selectedProjectMembers () {
      return this.selectedProject?.members.reduce((acc, userEmail) => {
        acc[userEmail.toLowerCase()] = userEmail
        return acc
      }, {}) || {}
    },
    usersCanAddToAccess () {
      const users = []
      const employees = Object.values(this.$store.state.employees.employees)
      for (const emp of employees) {
        if (this.selectedProjectMembers[emp.email.toLowerCase()] === undefined) {
          users.push({
            uid: emp.uid,
            email: emp.email
          })
        }
      }
      return users
    },
    isFavorite () {
      return this.selectedProject?.favorite
    },
    depsProject () {
      const allDeps = []
      const deps = this.$store.state.departments.deps
      this.selectedProjectDeps.map((depUid) => {
        const oneDep = deps[depUid]
        allDeps.push({
          uid: depUid,
          name: oneDep.name
        })
        return allDeps
      })
      return allDeps
    }
  },
  watch: {
    selectedProjectName: {
      immediate: true,
      handler: function (val) {
        this.currName = val
      }
    }
  },
  methods: {
    print (msg, param) {
      console.log(msg, param)
    },
    removeProject () {
      this.showConfirm = false

      this.$store
        .dispatch(PROJECT.REMOVE_PROJECT_REQUEST, this.selectedProjectUid)
        .then((resp) => {
          console.log('removeProject', resp)
          this.$store.dispatch('asidePropertiesToggle', false)
          this.$store.commit(NAVIGATOR_REMOVE_PROJECT, this.selectedProject)
          this.$router.push('/project')
        })
    },
    setDepartment (index) {
      const dep = this.allDepartments[index]
      if (this.isCanEdit &&
        !this.selectedProjectDeps.includes(dep.uid)
      ) {
        const deps = [...this.selectedProjectDeps]
        deps.push(dep.uid)
        this.selectedProject.deps = deps
        this.$store.dispatch(PROJECT.CHANGE_PROJECT_DEPS, {
          projectUid: this.selectedProject.uid,
          newDeps: deps
        })
      }
    },
    deleteDepartment (depUid) {
      if (this.isCanEdit &&
        this.selectedProjectDeps.includes(depUid)
      ) {
        const deps = [...this.selectedProjectDeps]
        const filteredDeps = deps.filter(d => d !== depUid)
        this.selectedProject.deps = filteredDeps
        this.$store.dispatch(PROJECT.CHANGE_PROJECT_DEPS, {
          projectUid: this.selectedProject.uid,
          newDeps: filteredDeps
        })
      }
    },
    quitProject () {
      this.showConfirmQuit = false

      this.$store.dispatch(PROJECT.QUIT_PROJECT_REQUEST, {
        uid: this.selectedProjectUid,
        value: this.$store.state.user.user.current_user_email
      })
        .then((resp) => {
          console.log('quitProject', resp)
          this.$store.dispatch('asidePropertiesToggle', false)
          this.$store.commit(NAVIGATOR_REMOVE_PROJECT, this.selectedProject)
          this.$router.push('/project')
        })
    },
    favoriteToggle () {
      if (!this.isFavorite) {
        this.$store.dispatch(PROJECT.ADD_PROJECT_TO_FAVORITE, this.selectedProject)
          .then(res => {
            this.selectedProject.favorite = res.data.favorite
          })
      } else {
        this.$store.dispatch(PROJECT.REMOVE_PROJECT_FROM_FAVORITE, this.selectedProject)
          .then(res => {
            this.selectedProject.favorite = res.data.favorite
          })
      }
    },
    closeProperties () {
      this.$store.dispatch('asidePropertiesToggle', false)
    },
    changeProjectName () {
      const title = this.currName.trim()
      if (this.isCanEdit && title && this.selectedProjectName !== title) {
        this.selectedProject.name = title
        this.$store
          .dispatch(PROJECT.CHANGE_PROJECT_NAME, {
            projectUid: this.selectedProjectUid,
            newProjectTitle: title
          })
          .then((resp) => {
            console.log('changeProjectName', resp, title)
          })
      }
    },
    changeProjectColor (color) {
      if (this.isCanEdit && this.selectedProjectColor.toLowerCase() !== color) {
        this.selectedProject.color = color || '#A998B6'
        const data = {
          projectUid: this.selectedProjectUid,
          newProjectColor: color || '#A998B6'
        }
        this.$store.dispatch(PROJECT.CHANGE_PROJECT_COLOR, data).then((resp) => {
          console.log('changeProjectColor', resp, color)
        })
      }
    },
    addProjectMember (userEmail) {
      // если лицензия истекла
      if (this.$store.getters.isLicenseExpired) {
        this.showAccessLimit = true
        return
      }
      if (
        this.isCanEdit &&
        this.selectedProjectMembers[userEmail.toLowerCase()] === undefined
      ) {
        const users = [...this.selectedProject.members]
        users.push(userEmail)
        this.selectedProject.members = users
        const data = {
          projectUid: this.selectedProjectUid,
          newProjectMembers: users
        }
        this.$store.dispatch(PROJECT.CHANGE_PROJECT_MEMBERS, data).then((resp) => {
          console.log('changeProjectMembers', resp, users)
        })
      }
    },
    deleteMember (userEmail) {
      if (
        this.isCanEdit &&
        this.selectedProjectMembers[userEmail.toLowerCase()] !== undefined
      ) {
        const users = this.selectedProject.members.filter((email) => email.toLowerCase() !== userEmail.toLowerCase())
        this.selectedProject.members = users
        const data = {
          projectUid: this.selectedProjectUid,
          newProjectMembers: users
        }
        this.$store.dispatch(PROJECT.CHANGE_PROJECT_MEMBERS, data).then((resp) => {
          console.log('changeProjectMembers', resp, users)
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
