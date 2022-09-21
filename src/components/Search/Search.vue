<template>
  <div class="w-full">
    <NavBarTasks
      id="NavBarSearch"
      class="pt-[8px]"
      :title="navTitle"
      @reload="reload"
    />
    <SearchLimit v-if="showLimitMessage" />
    <TasksListNew
      v-else
      hide-input
    />
  </div>
</template>
<script>
import TasksListNew from '@/components/TasksListNew.vue'
import NavBarTasks from '@/components/Navbar/NavBarTasks.vue'
import SearchLimit from './SearchLimit.vue'

import * as TASK from '@/store/actions/tasks'

export default {
  components: {
    TasksListNew,
    NavBarTasks,
    SearchLimit
  },
  computed: {
    searchText () {
      return this.$route.query.q ?? ''
    },
    showLimitMessage () {
      const tarif = this.$store.state.user.user.tarif
      const noAccess = (tarif !== 'alpha' && tarif !== 'trial') || this.$store.getters.isLicenseExpired
      const isLoading = this.$store.state.tasks.status === 'loading'
      return noAccess && !isLoading
    },
    navTitle () {
      return this.showLimitMessage ? undefined : 'Поиск: ' + this.searchText
    }
  },
  watch: {
    searchText (text) {
      if (text) {
        this.searchTasks(text)
      }
    }
  },
  mounted () {
    this.reload()
  },
  methods: {
    searchTasks (text) {
      if (this.showLimitMessage) return
      this.$store.dispatch(TASK.SEARCH_TASK, text).then((resp) => {
        console.log('Search Tasks', resp)
      })
    },
    reload () {
      this.searchTasks(this.searchText)
    }
  }
}
</script>
