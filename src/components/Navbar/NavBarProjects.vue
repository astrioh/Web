<template>
  <NavBar
    id="NavBarProjects"
    title="Проекты"
    route="/project"
    :breadcrumbs="breadcrumbs"
  >
    <NavBarSearch
      @search="onSearch"
    />
    <NavBarButtonsProject
      :project-uid="projectUid"
      :show-completed-tasks="showCompletedTasks"
      @popNavBar="popNavBar"
      @toggleCompletedTasks="onChangeCompletedTasks"
    />
  </NavBar>
</template>

<script>
import { PATCH_SETTINGS, NAVIGATOR_UPDATE_ASSIGNMENTS } from '@/store/actions/navigator'
import { notify } from 'notiwind'

import NavBarButtonsProject from '@/components/Navbar/NavBarButtonsProject.vue'
import NavBarSearch from '@/components/Navbar/NavBarSearch.vue'
import NavBar from '@/components/Navbar/NavBar.vue'
import * as TASK from '@/store/actions/tasks'

export default {
  components: {
    NavBarButtonsProject,
    NavBarSearch,
    NavBar
  },
  props: {
    projectUid: {
      type: String,
      default: ''
    }
  },
  computed: {
    projects () {
      return this.$store.state.projects.projects
    },
    breadcrumbs () {
      let project = this.projects[this.projectUid]
      if (!project) return [{ name: 'Проект не найден', selected: true }]

      const arrResult = [
        { name: project.name, selected: true } // на самого себя нажать нельзя по этому не добавляем to
      ]

      project = this.projects[project.uid_parent]
      while (project) {
        arrResult.unshift({ name: project.name, to: `/project/${project.uid}`, showNext: true })
        project = this.projects[project.uid_parent]
      }

      return arrResult
    },
    settings () {
      return this.$store.state.navigator.navigator.settings
    },
    showCompletedTasks () {
      return this.settings?.show_completed_tasks ?? false
    }
  },
  methods: {
    popNavBar () {
      const prevIndex = this.breadcrumbs.length - 2
      const to = prevIndex >= 0 ? this.breadcrumbs[prevIndex].to : null
      this.$router.push(to || '/project')
    },
    onSearch (text) {
      if (text.length > 3) {
        // поиск задачи по ссылке из лидертаска настольного
        if (text.startsWith('lt://planning?{')) {
          const taskUid = text.slice(15, -1).toLowerCase()
          this.$router.push({ path: `/task/${taskUid}` })
          return
        }
        this.$router.push({ path: '/search', query: { q: text } })
      } else {
        notify(
          {
            group: 'api',
            title: 'Длина запроса должна быть более 3 символов',
            action: '',
            text: ''
          },
          15000
        )
      }
    },
    updateSettings () {
      this.$store.dispatch(
        PATCH_SETTINGS,
        {
          show_completed_tasks: this.settings.show_completed_tasks ? 1 : 0,
          add_task_to_begin: this.settings.add_task_to_begin ? 1 : 0,
          cal_number_of_first_week: this.settings.cal_number_of_first_week ? 1 : 0,
          cal_show_week_number: this.settings.cal_show_week_number ? 1 : 0,
          nav_show_tags: this.settings.nav_show_tags ? 1 : 0,
          nav_show_overdue: this.settings.nav_show_overdue ? 1 : 0,
          nav_show_summary: this.settings.nav_show_summary ? 1 : 0,
          nav_show_emps: this.settings.nav_show_emps ? 1 : 0,
          nav_show_markers: this.settings.nav_show_markers ? 1 : 0,
          language: this.settings.language,
          stopwatch: this.settings.stopwatch ? 1 : 0,
          cal_work_time: this.settings.cal_work_time,
          reminders_in_n_minutes: this.settings.reminders_in_n_minutes,
          cal_work_week: this.settings.cal_work_week,
          compact_mode: this.settings.compact_mode ? 1 : 0
        }
      ).then(() => {
        this.reload()
        this.$store.dispatch(NAVIGATOR_UPDATE_ASSIGNMENTS)
      })
    },
    onChangeCompletedTasks () {
      this.settings.show_completed_tasks = !this.showCompletedTasks
      this.updateSettings()
    },
    reload () {
      const project = this.$route.params.project_id
      console.log(project)
      this.$store.dispatch(TASK.PROJECT_TASKS_REQUEST, project)
    }
  }
}
</script>
