<template>
  <div class="group w-full h-[34px] flex items-center">
    <div class="grow w-6/12 font-roboto text-[13px] leading-[20px] font-medium text-[#4c4c4d] mr-[7px] overflow-hidden text-ellipsis">
      {{ depName }}
    </div>
    <div class="flex-none">
      <PopMenu :disabled="disabled">
        <div
          class="flex items-center text-[#7e7e80]"
          :class="{ 'cursor-pointer hover:text-[#4c4c4d]': !disabled }"
        >
          <div class="mr-[4px] font-roboto text-[12px] leading-[20px]">
            {{ depStatus }}
          </div>
          <svg
            class="invisible"
            :class="{ 'group-hover:visible': !disabled }"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.7603 3.56099C11.0027 3.80668 11.0001 4.2024 10.7544 4.44486L6.7011 8.44486C6.47139 8.67154 6.10687 8.68606 5.85986 8.47836L1.46875 4.78606C1.20456 4.56391 1.17047 4.16965 1.39262 3.90546C1.61477 3.64126 2.00903 3.60718 2.27322 3.82933L6.22845 7.15512L9.87642 3.55514C10.1221 3.31269 10.5178 3.31531 10.7603 3.56099Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <template #menu>
          <PopMenuItem @click="setAdmin">
            Администратор
          </PopMenuItem>
          <PopMenuItem @click="setWriter">
            Редактор
          </PopMenuItem>
          <PopMenuItem @click="setReader">
            Читатель
          </PopMenuItem>
          <PopMenuDivider />
          <PopMenuItem @click="deleteDep">
            Удалить
          </PopMenuItem>
        </template>
      </PopMenu>
    </div>
  </div>
</template>
<script>
import PopMenuItem from '../Common/PopMenuItem.vue'
import PopMenu from '../Common/PopMenu.vue'

export default {
  components: { PopMenuItem, PopMenu },
  props: {
    depName: {
      type: String,
      default: ''
    },
    depStatus: {
      type: String,
      default: ''
    }
  },
  emits: ['delete', 'setAdmin', 'setReader', 'setWriter'],
  methods: {
    deleteDep () {
      this.$emit('delete')
    },
    setAdmin () {
      this.$emit('setAdmin')
    },
    setReader () {
      this.$emit('setReader')
    },
    setWriter () {
      this.$emit('setWriter')
    }
  }
}
</script>
