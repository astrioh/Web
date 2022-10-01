<template>
  <div class="w-full">
    <div class="flex items-center justify-between w-full">
      <NavBar
        class="w-full pt-[8px]"
        title="Интеграции"
      />
      <div class="flex flex-none px-[12px] pt-[8px]">
        <Icon
          :path="listView.path"
          :width="listView.width"
          :height="listView.height"
          :box="listView.viewBox"
          class="cursor-pointer hover:text-gray-800 mr-2"
          :class="{
            'text-gray-800': !isGridView,
            'text-gray-400': isGridView
          }"
          @click="updateGridView(false)"
        />
        <Icon
          :path="gridView.path"
          :width="gridView.width"
          :height="gridView.height"
          :box="gridView.viewBox"
          class="cursor-pointer hover:text-gray-800 mr-2"
          :class="{
            'text-gray-800': isGridView,
            'text-gray-400': !isGridView
          }"
          @click="updateGridView(true)"
        />
      </div>
    </div>
    <div
      v-for="(dep, index) in integrations"
      :key="index"
    >
      <div
        class="flex w-full"
        :class="{ 'justify-between': index == 0, 'mt-[28px]': index != 0 }"
      >
        <p class="font-['Roboto'] text-[#424242] text-[19px] leading-[22px] font-bold">
          {{ dep.title }}
        </p>
      </div>
      <div
        class="grid gap-2 mt-3 grid-cols-1"
        :class="{
          'md:grid-cols-2 lg:grid-cols-4': isGridView,
          'lg:grid-cols-2': isPropertiesMobileExpanded && isGridView
        }"
      >
        <template
          v-for="integration in dep.items"
          :key="integration.path"
        >
          <router-link
            :to="'/settings/integrations/' + integration.path"
          >
            <ListBlocItem
              :title="integration.name"
              title-color="#4C4C4D"
            />
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/Navbar/NavBar'
import Icon from '@/components/Icon.vue'
import ListBlocItem from '@/components/Common/ListBlocItem.vue'

import gridView from '@/icons/grid-view.js'
import listView from '@/icons/list-view.js'

import { setLocalStorageItem } from '@/store/helpers/functions'

export default {
  components: {
    NavBar,
    Icon,
    ListBlocItem
  },
  data () {
    return {
      gridView,
      listView
    }
  },
  computed: {
    isGridView () {
      setLocalStorageItem('isGridView', true)
      return this.$store.state.isGridView
    },
    isPropertiesMobileExpanded () {
      return this.$store.state.isPropertiesMobileExpanded
    },
    integrations () {
      return [
        {
          title: 'Корпоративные интеграции',
          items: [
            {
              path: 'corporationYandexMail',
              name: 'Яндекс.Почта',
              type: 'yandex'
            }
          ]
        }
      ]
    }
  },
  methods: {
    updateGridView (value) {
      this.$store.commit('basic', { key: 'isGridView', value: value })
      setLocalStorageItem('isGridView', value)
    }
  }
}
</script>
