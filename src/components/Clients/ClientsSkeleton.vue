<template>
  <div
    v-for="i in 10"
    :key="i"
    role="status"
    class="p-4 animate-pulse dark:divide-gray-700 md:p-6"
  >
    <div class="flex justify-between items-center">
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
      </div>
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
      </div>
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
      </div>
      <div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
      </div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
