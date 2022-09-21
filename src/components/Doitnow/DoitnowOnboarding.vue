<template>
  <div
    class="flex flex-col"
  >
    <img
      class="mx-auto mt-10"
      width="320"
      height="314"
      src="@/assets/images/emptydoitnow.png"
      alt="Empty task image"
    >
    <p class="font-bold p-3">
      Работайте только с одной конкретной задачей и не отвлекайтесь на другие
    </p>
    <ul class="list-decimal pl-[30px]">
      <li class="p-3 text-sm">
        Очередь выдает по одной задаче в один момент времени
      </li>
      <li class="p-3 text-sm">
        У вас нет возможности выбрать задачу и вы не знаете, какая будет следующей
      </li>
      <li class="p-3 text-sm">
        В Очередь попадают непрочитанные и просроченные задачи и поручения, а также поручения и задачи на сегодня
      </li>
    </ul>
    <OnBoardingButton
      @okToModal="okToModal"
    />
  </div>
</template>
<script>
import OnBoardingButton from '../onBoarding/onBoardingButton.vue'
export default {
  components: { OnBoardingButton },
  emits: ['okToModal'],
  methods: {
    okToModal () {
      this.$emit('okToModal')
    }
  }
}
</script>
