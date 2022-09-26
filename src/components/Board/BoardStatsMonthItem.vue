<template>
  <tr>
    <td>
      <div class="content flex items-center">
        Январь
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Февраль
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Март
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Апрель
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Май
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Июнь
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Июль
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Август
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Сентябрь
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Октябрь
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Ноябрь
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="content flex items-center">
        Декабрь
      </div>
    </td>
  </tr>
</template>

<script>

export default {
  props: {
    member: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    boardCards () {
      return this.$store.state.cards.cards
    }
  }
}
</script>

<style scoped>
.content {
  @apply min-h-[48px]
}

tr:first-child {
  @apply text-left h-[48px]
}

tr:first-child th {
  @apply pl-[20px] border-[#e6e6e6] border-2 text-[14px] font-medium;
  border-spacing: 0 20px;
}

tr:first-child th:first-child {
  @apply rounded-l-[6px]
}

tr:first-child th:last-child {
  @apply rounded-r-[6px]
}

tr:first-child th:not(:last-child){
  border-right: 1px;
}

/*Стили для контентной части*/

tr:not(:first-child) {
  @apply min-h-[58px] align-top
}

tr:not(:first-child) td {
  @apply border-b-2 border-[#e6e6e6] pl-[14px] font-normal text-[13px] max-w-[400px]
}

tr:not(:first-child) td:first-child {
  @apply rounded-l-[6px]
}

tr:not(:first-child) td:last-child {
  @apply rounded-r-[6px]
}

/*Стили для первого контентного элемента (отступ сверху)*/
tr:nth-child(2) {
  @apply min-h-[74px]
}

tr:nth-child(2) .content {
  @apply mt-[16px]
}
</style>
