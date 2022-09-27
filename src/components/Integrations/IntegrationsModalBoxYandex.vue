<template>
  <ModalBox
    :title="title"
    ok="Сохранить"
    @ok="onSave"
    @cancel="onCancel"
  >
    <div class="flex flex-col">
      <div class="mb-3 flex flex-col">
        <span class="mb-1">Логин Яндекс.Почты</span>
        <span class="mb-1 text-[11px]">(Например: логином почты example@ya.ru будет example)</span>
        <input
          type="text"
          class="bg-[#f4f5f7]/50 rounded-[6px] focus:ring-0 border w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
        >
      </div>
      <div class="mb-3 flex flex-col">
        <span class="mb-1">Пароль для интеграций</span>
        <span class="mb-1 text-[11px]">(Как получить пароль указано в инструкции)</span>
        <input
          type="text"
          class="bg-[#f4f5f7]/50 rounded-[6px] focus:ring-0 border w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
        >
      </div>
    </div>
  </ModalBox>
</template>
<script>
import ModalBox from '@/components/modals/ModalBox.vue'

export default {
  components: {
    ModalBox
  }
}
</script>
