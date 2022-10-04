<template>
  <ModalBox
    :title="title"
    @cancel="onCancel"
  >
    <form
      class="flex flex-col"
      @submit="onSave"
    >
      <div class="mb-3 flex flex-col">
        <label for="atsKey">
          <span class="mb-1">Ключ для авторизации в АТС</span>
          <span class="mb-1 text-[11px]">(генерируется автоматически в Личном Кабинете Мегафон)</span>
        </label>
        <input
          id="atsKey"
          v-model="atsKey"
          name="atsKey"
          type="text"
          class="bg-[#f4f5f7]/50 rounded-[6px] focus:ring-0 border w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
        >
      </div>
      <div class="mb-3 flex flex-col">
        <span class="mb-1">Пароль для интеграций</span>
        <span class="mb-1 text-[11px]">(Как получить пароль указано в инструкции)</span>
        <input
          v-model="password"
          type="text"
          class="bg-[#f4f5f7]/50 rounded-[6px] focus:ring-0 border w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
        >
      </div>
      <button type="submit">
        Сохранить
      </button>
    </form>
  </ModalBox>
</template>
<script>
import ModalBox from '@/components/modals/ModalBox.vue'

export default {
  components: {
    ModalBox
  },
  emits: ['onSave'],
  data () {
    return {
      atsKey: '',
      crmKey: ''
    }
  },
  methods: {
    onSave (event) {
      event.preventDefault()
      this.$emit('onSave', {})
    }
  }
}
</script>
