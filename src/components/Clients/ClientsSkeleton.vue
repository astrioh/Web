<template>
  <template
    v-for="i in 10"
    :key="i"
  >
    <tr>
      <td
        v-for="k in 4"
        :key="k"
        class="mt-[10px]"
      >
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mt-2.5 w-[80%] mb-2.5" />
      </td>
    </tr>
  </template>
</template>
