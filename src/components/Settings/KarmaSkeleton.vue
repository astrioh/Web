<template>
  <div
    class="rounded-xl bg-white animate-pulse px-7"
  >
    <div class="flex items-center justify-between gap-x-[20px]">
      <div class="bg-[#FBEFE2] h-[129px] rounded-[12px] my-7 grow basis-0 flex flex-col items-center pt-[20px]">
        <div class="bg-gray-300 h-[10px] w-[150px] rounded-xl" />
        <div class="mt-[25px] bg-gray-300 h-[40px] w-[30px] rounded-xl" />
      </div>
      <div class="bg-[#EDFAEB] h-[129px] rounded-[12px] my-7 grow basis-0 flex flex-col items-center pt-[20px]">
        <div class="bg-gray-300 h-[10px] w-[150px] rounded-xl" />
        <div class="mt-[25px] bg-gray-300 h-[40px] w-[30px] rounded-xl" />
      </div>
      <div class="bg-[#FDEEEE] h-[129px] rounded-[12px] my-7 grow basis-0 flex flex-col items-center pt-[20px]">
        <div class="bg-gray-300 h-[10px] w-[150px] rounded-xl" />
        <div class="mt-[25px] bg-gray-300 h-[40px] w-[30px] rounded-xl" />
      </div>
    </div>
    <div class="flex items-center justify-between gap-x-[20px]">
      <div class="bg-gray-300 rounded-xl h-[332px] grow basis-0" />
      <div class="bg-gray-300 rounded-xl h-[332px] grow basis-0" />
    </div>
    <div class="mt-10 bg-gray-300 rounded-xl h-[20px] w-[150px]" />
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
      <div class="w-[20px] h-[10px] bg-green-200 rounded-sm" />
    </div>
  </div>
</template>
