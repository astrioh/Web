<template>
  <PopMenu>
    <slot />
    <template #menu>
      <PopMenuItem
        icon="answer"
        @click="$emit('onQuoteMessage')"
      >
        Ответить
      </PopMenuItem>
      <PopMenuItem
        v-if="canDelete"
        icon="delete"
        type="delete"
        @click="$emit('onDeleteMessage')"
      >
        Удалить
      </PopMenuItem>
    </template>
  </PopMenu>
</template>
<script>
import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'
export default {
  components: {
    PopMenu,
    PopMenuItem
  },
  props: {
    canDelete: {
      type: Boolean,
      default: true
    }
  },
  emits: ['onQuoteMessage', 'onDeleteMessage']
}

</script>
