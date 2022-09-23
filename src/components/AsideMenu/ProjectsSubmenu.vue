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
          class="mb-[16px]"
          :show="showAddProject"
          @cancel="showAddProject = false"
          @save="onAddNewProject"
        >
          <svg
            class="flex-none"
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6486 5.13099V4.19718C16.6486 3.33099 15.9668 2.62535 15.1299 2.62535H8.87113L8.68333 2.30423C8.56901 2.11831 8.36896 2 8.15666 2H3.51875C2.68181 2 2 2.70563 2 3.57183V15.4282C2 16.2944 2.68181 17 3.51875 17H16.4812C17.3182 17 18 16.2944 18 15.4282V6.69437C18.0041 5.8831 17.408 5.21549 16.6486 5.13099ZM3.23297 3.57183C3.23297 3.40704 3.36361 3.27183 3.52284 3.27183H7.81372L9.47945 6.08592C9.58968 6.27183 9.78973 6.39014 10.0061 6.39014H16.4894C16.6486 6.39014 16.7793 6.52535 16.7793 6.69014V15.4282C16.7793 15.593 16.6486 15.7282 16.4894 15.7282H3.51875C3.35953 15.7282 3.22888 15.593 3.22888 15.4282V3.57183H3.23297ZM15.4157 5.11831H10.345L9.62234 3.89718H15.1258C15.285 3.89718 15.4157 4.03239 15.4157 4.19718V5.11831Z"
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
