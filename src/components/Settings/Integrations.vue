<template>
  <NavBar
    class="pt-[8px]"
    title="Интеграции"
  />
  <div class="w-full px-10 py-5 h-auto bg-white rounded-[8px] ">
    <div class="flex gap-[15px]">
      <template
        v-for="int in integrations"
        :key="int.id"
      >
        <router-link
          :to="'/settings/integrations/' + int.path"
        >
          <ListBlocItem
            :title="int.name"
            class="w-[250px]"
            title-color="#4C4C4D"
          >
            <img
              src="@/assets/images/yPochta.png"
            >
          </ListBlocItem>
        </router-link>
      </template>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/Navbar/NavBar'
import ListBlocItem from '../Common/ListBlocItem.vue'

export default {
  components: {
    NavBar,
    ListBlocItem
  },
  data () {
    return {
      integrations: [
        {
          id: 1,
          name: 'Яндекс почта',
          path: 'yandex'
        }
      ]
    }
  }
}
</script>
