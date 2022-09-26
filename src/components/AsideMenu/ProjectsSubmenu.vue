<template>
  <ProjectModalBoxProjectsLimit
    v-if="showProjectsLimit"
    @cancel="showProjectsLimit = false"
    @ok="showProjectsLimit = false"
  />
  <div class="px-[20px] pt-[22px]">
    <AsideMenuListSkeleton v-if="status == 'loading'" />
    <div
      v-if="status == 'success'"
      class="flex flex-col gap-[25px]"
    >
      <ProjectsSubMenuGroup
        v-if="favoriteProjects.length"
        title="Избранные проекты"
        :projects="favoriteProjects"
        @closeMenu="closeMenu"
      />
      <ProjectsSubMenuGroup
        v-if="depProjects.length"
        :title="currentUserDepTitle"
        :projects="depProjects"
        @closeMenu="closeMenu"
      />
      <ProjectsSubMenuGroup
        title="Мои проекты"
        :projects="privateProjects"
        @closeMenu="closeMenu"
      >
        <AsideMenuListInput
          v-if="showAddProject"
          :show="showAddProject"
          @cancel="showAddProject = false"
          @save="onAddNewProject"
        >
          <svg
            class="flex-none"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            :fill="color"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.3813 9.48485V8.39541C23.3813 7.38485 22.5646 6.56161 21.562 6.56161H14.0645L13.8396 6.18696C13.7026 5.97006 13.463 5.83203 13.2087 5.83203H7.65284C6.65024 5.83203 5.8335 6.65527 5.8335 7.66583V21.4982C5.8335 22.5088 6.65024 23.332 7.65284 23.332H23.1808C24.1834 23.332 25.0001 22.5088 25.0001 21.4982V11.3088C25.005 10.3623 24.291 9.58344 23.3813 9.48485ZM7.31049 7.66583C7.31049 7.47358 7.46699 7.31583 7.65773 7.31583H12.7978L14.7933 10.5989C14.9253 10.8158 15.1649 10.9539 15.4242 10.9539H23.1906C23.3813 10.9539 23.5378 11.1116 23.5378 11.3039V21.4982C23.5378 21.6905 23.3813 21.8482 23.1906 21.8482H7.65284C7.4621 21.8482 7.3056 21.6905 7.3056 21.4982V7.66583H7.31049ZM21.9043 9.47006H15.8301L14.9644 8.04541H21.5571C21.7478 8.04541 21.9043 8.20316 21.9043 8.39541V9.47006Z"
              fill="currentColor"
            />
          </svg>
        </AsideMenuListInput>
        <AsideMenuListAdd
          v-else
          class="mb-[16px]"
          title="Добавить проект"
          @click.stop="clickAddProject"
        />
      </ProjectsSubMenuGroup>
      <ProjectsSubMenuGroup
        v-if="commonProjects.length"
        title="Общие проекты"
        :projects="commonProjects"
        @closeMenu="closeMenu"
      />
    </div>
  </div>
</template>

<script>
import ProjectModalBoxProjectsLimit from '@/components/ProjectModalBoxProjectsLimit.vue'
import AsideMenuListAdd from '@/components/AsideMenu/AsideMenuListAdd.vue'
import AsideMenuListInput from '@/components/AsideMenu/AsideMenuListInput.vue'
import AsideMenuListSkeleton from '@/components/AsideMenu/AsideMenuListSkeleton.vue'
import { uuidv4 } from '@/helpers/functions'

import * as PROJECT from '@/store/actions/projects'
import * as NAVIGATOR from '@/store/actions/navigator'
import { mapGetters } from 'vuex'
import ProjectsSubMenuGroup from './ProjectsSubMenuGroup.vue'

export default {
  components: {
    ProjectModalBoxProjectsLimit,
    AsideMenuListAdd,
    AsideMenuListInput,
    AsideMenuListSkeleton,
    ProjectsSubMenuGroup
  },
  data () {
    return {
      showAddProject: false,
      showProjectsLimit: false
    }
  },
  computed: {
    ...mapGetters([
      'favoriteProjects',
      'privateProjects',
      'commonProjects',
      'departmentsProjects'
    ]),
    status () {
      return this.$store.state.navigator.status
    },
    storeNavigator () {
      return this.$store.state.navigator.navigator
    },
    user () {
      return this.$store.state.user.user
    },
    isPropertiesMobileExpanded () {
      return this.$store.state.isPropertiesMobileExpanded
    },
    isAsideMobileExpanded () {
      return this.$store.state.isAsideMobileExpanded
    },
    items () {
      return this.storeNavigator?.new_private_projects ?? []
    },
    employees () {
      return this.$store.state.employees.employees
    },
    currentUserDepUid () {
      return this.employees[this.user.current_user_uid]?.uid_dep || ''
    },
    currentUserDepTitle () {
      if (this.currentUserDepUid === '00000000-0000-0000-0000-000000000000') return
      return this.$store.state.departments.deps[this.currentUserDepUid].name || ''
    },
    depProjects () {
      if (!this.currentUserDepUid || !this.currentUserDepTitle) return []

      const projects = Object.values(this.$store.state.projects.projects)
      const departmentProjects = projects.filter(proj => {
        if (!proj?.deps) return []
        return proj?.deps.includes(this.currentUserDepUid)
      })
      departmentProjects.sort((proj1, proj2) => {
        return proj1.name.localeCompare(proj2.name)
      })
      return departmentProjects
    }
  },
  methods: {
    onAddNewProject (name) {
      this.showAddProject = false
      const title = name.trim()
      if (title) {
        // добавляем новый проект и переходим в него
        const maxOrder =
          this.items[0]?.items?.reduce(
            (maxOrder, child) =>
              child.order > maxOrder ? child.order : maxOrder,
            0
          ) || 0
        const project = {
          uid: uuidv4(),
          name: title,
          uid_parent: '00000000-0000-0000-0000-000000000000',
          email_creator: this.user.current_user_email,
          order: maxOrder + 1,
          comment: '',
          plugin: '',
          collapsed: 0,
          isclosed: 0,
          group: 0,
          show: 1,
          favorite: 0,
          quiet: 0,
          deps: [],
          members: [this.user.current_user_email],
          children: [],
          bold: 0
        }
        this.$store.dispatch(PROJECT.CREATE_PROJECT_REQUEST, project).then((res) => {
          // заполняем недостающие параметры
          project.global_property_uid = '431a3531-a77a-45c1-8035-f0bf75c32641'
          project.order = res.data.order
          project.color = '#A998B6'

          this.$store.commit(PROJECT.PUSH_PROJECT, [project])
          this.$store.commit(NAVIGATOR.NAVIGATOR_PUSH_PROJECT, [project])
          this.$router.push('/project/' + project.uid)
          this.$store.state.navigator.submenu.status = false
        })
      }
    },
    isProjectInCurrDepartment (project, depUid) {
      return project?.deps.find(deps => deps === depUid) && this.employees[this.user.current_user_uid].uid_dep === depUid
    },
    isDepProjectsAreAvalible (depUid) {
      const isDepUidInBoards = this.commonProjects.find(item => item?.deps.includes(depUid))
      return this.employees[this.user.current_user_uid].uid_dep === depUid && isDepUidInBoards
    },
    clickAddProject () {
      // если лицензия истекла
      if (Object.keys(this.$store.state.projects.projects).length >= 10 && this.$store.getters.isLicenseExpired) {
        this.showProjectsLimit = true
        return
      }
      this.showAddProject = true
    },
    closeMenu () {
      this.$store.state.navigator.submenu.status = false
      if (this.isPropertiesMobileExpanded) {
        this.$store.dispatch('asidePropertiesToggle', false)
      }
      if (this.isAsideMobileExpanded) {
        this.$store.dispatch('asideMobileToggle', false)
      }
    }
  }
}
</script>
