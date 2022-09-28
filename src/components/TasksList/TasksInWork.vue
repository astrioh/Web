<template>
  <div class="w-full">
    <NavBarTasks
      id="NavBarInWork"
      class="pt-[8px]"
      title="В работе"
      @reload="reload"
    />
    <TasksListNew
      hide-input
    />
  </div>
</template>

<script>
import TasksListNew from '../TasksListNew.vue'
import NavBarTasks from '@/components/Navbar/NavBarTasks.vue'
import * as TASK from '@/store/actions/tasks.js'

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
      this.$store.dispatch(TASK.IN_WORK_TASKS_REQUEST)
    }
  }
}

</script>
