<template>
  <PopMenuItem>
    <div class="flex justify-between w-full items-center">
      <span
        class="truncate"
      >
        {{ depName }}
      </span>
    </div>
  </PopMenuItem>
</template>
<script>
import PopMenuItem from '../Common/PopMenuItem.vue'
export default {
  components: {
    PopMenuItem
  },
  props: {
    depName: {
      type: String,
      default: ''
    }
  }
}
</script>
