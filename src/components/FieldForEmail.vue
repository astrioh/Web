<template>
  <div class="last:mb-0">
    <label
      v-if="label"
      class="block font-bold mb-2"
    >
      {{ label }}
    </label>
    <div class="flex flex-col">
      <slot />
    </div>
    <div
      v-if="help"
      class="text-xs text-gray-400 dark:text-gray-400 mt-1"
    >
      {{ help }}
    </div>
    <div
      v-if="maxCount"
      class="flex justify-between mt-1"
    >
      <div
        v-for="n in maxCount"
        :key="n"
        class="border w-full mx-0.5 border-gray-300 rounded-full"
        :class="{ 'border-lime-500': (actualCount+1) > n }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    help: {
      type: String,
      default: null
    },
    maxCount: {
      type: Number,
      default: 0
    },
    actualCount: {
      type: Number,
      default: 0
    }
  }
}
</script>
