<template>
  <div class="w-full">
    <NavBarTasks
      id="NavBarUnsorted"
      class="pt-[8px]"
      title="Неразобранные"
      @reload="reload"
    />
    <TasksListNew />
  </div>
</template>
<script>
import TasksListNew from '../TasksListNew.vue'
import NavBarTasks from '@/components/Navbar/NavBarTasks.vue'

import * as TASK from '@/store/actions/tasks'

export default {
  components: {
    TasksListNew,
    NavBarTasks
  },
  mounted () {
    this.reload()
  },
  methods: {
    reload () {
      this.$store.dispatch(TASK.UNSORTED_TASKS_REQUEST)
    }
  }
}
</script>
