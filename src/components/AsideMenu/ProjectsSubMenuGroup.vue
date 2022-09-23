<template>
  <AsideMenuListGroup
    :title="title"
  >
    <router-link
      v-for="project in projects"
      :key="project.uid"
      v-slot="{isActive}"
      :to="'/project/' + project.uid"
    >
      <ProjectsSubmenuItem
        :project="project"
        :selected="isActive"
        @click="closeMenu"
      />
    </router-link>
    <slot />
  </AsideMenuListGroup>
</template>
<script>
import AsideMenuListGroup from './AsideMenuListGroup.vue'
import ProjectsSubmenuItem from './ProjectsSubmenuItem.vue'
export default {
  components: { AsideMenuListGroup, ProjectsSubmenuItem },
  props: {
    title: {
      type: String,
      default: ''
    },
    projects: {
      type: Array,
      default: () => []
    }
  },
  emits: ['closeMenu'],
  methods: {
    closeMenu () {
      this.$emit('closeMenu')
    }
  }
}
</script>
