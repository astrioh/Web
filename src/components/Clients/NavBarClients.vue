<template>
  <NavBar
    id="NavBarClients"
    title="Контакты"
  >
    <NavBarSearch
      @change="onSearch"
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
      // TODO: implement clients search
      return text
    }
  }
}
</script>
