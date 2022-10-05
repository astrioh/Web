<template>
  <div
    class="rounded-xl bg-white animate-pulse mt-5 p-7"
  >
    <div class="bg-gray-300 rounded-xl h-[20px] w-[150px]" />
    <div
      v-for="i in 6"
      :key="i"
      class="mt-6 flex justify-between"
    >
      <div>
        <div class="bg-gray-300 w-[300px] h-[10px] rounded-xl" />
        <div class="flex mt-3">
          <div class="bg-gray-300 w-[100px] h-[10px] rounded-xl mr-3" />
          <div class="bg-gray-300 w-[120px] h-[10px] rounded-xl" />
        </div>
      </div>
    </div>
  </div>
</template>
