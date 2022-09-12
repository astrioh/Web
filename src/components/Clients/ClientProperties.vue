<template>
  <div>{{ selectedClient.email }}</div>
  <div>{{ selectedClient.name }}</div>
  <PropsButtonClose
    @click="closeProperties"
  />
</template>
<script>
import PropsButtonClose from '@/components/Common/PropsButtonClose.vue'

export default {
  components: {
    PropsButtonClose
  },
  computed: {
    selectedClient () {
      return this.$store.state.clients.selectedClient
    }
  },
  methods: {
    closeProperties () {
      this.$store.dispatch('asidePropertiesToggle', false)
    }
  }
}
</script>
