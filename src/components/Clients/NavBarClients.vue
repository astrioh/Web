<template>
  <NavBar
    id="NavBarClients"
    title="Контакты"
  >
    <NavBarSearch
      @search="onSearch"
      @eraseSearch="onEraseSearch"
    />
  </NavBar>
</template>

<script>
import NavBarSearch from '@/components/Navbar/NavBarSearch.vue'
import NavBar from '@/components/Navbar/NavBar.vue'

export default {
  components: {
    NavBarSearch,
    NavBar
  },
  props: {
    boardUid: {
      type: String,
      default: ''
    }
  },
  methods: {
    onSearch (text) {
      this.$router.push({ path: '/clients', query: { search: text } })
    },
    onEraseSearch () {
      this.$router.push({ path: '/clients' })
    }
  }
}
</script>
