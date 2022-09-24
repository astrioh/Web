<template>
  <template
    v-for="i in 10"
    :key="i"
  >
    <tr class="h-[48px] animate-pulse">
      <td
        v-for="j in 4"
        :key="j"
        class="pl-[14px]"
      >
        <div
          class="h-2.5 bg-gray-300 rounded-[20px]"
          :style="{width: getRandomNumber(100, 140) + 'px'}"
        />
      </td>
    </tr>
  </template>
</template>

<script>
export default {
  methods: {
    getRandomNumber (min, max) {
      return Math.random() * (max - min) + min
    }
  }
}
</script>
