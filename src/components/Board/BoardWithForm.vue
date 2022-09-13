<template>
  <NavBar
    class="pt-[8px]"
    title="Настройка формы"
  />
  <div class="h-screen overflow-auto">
    <form class="px-5 bg-white py-2 pb-[200px] rounded-xl">
      <control
        v-model="form.titleForm"
        class="mb-6"
        name="titleForm"
        placeholder="Заголовок формы"
        icon-class="cursor-pointer"
        type="text"
      />
      <div class="flex items-center mb-6">
        <input
          class="mr-2 leading-tight"
          type="checkbox"
        >
        <control
          v-model="form.name"
          name="name"
          placeholder="Имя"
          icon-class="cursor-pointer"
          type="text"
        />
      </div>
      <div class="md:flex md:items-center mb-6">
        <input
          class="mr-2 leading-tight"
          type="checkbox"
        >
        <control
          v-model="form.email"
          name="email"
          placeholder="Емайл"
          icon-class="cursor-pointer"
          type="text"
        />
      </div>
      <div class="md:flex md:items-center mb-6">
        <input
          class="mr-2 leading-tight"
          type="checkbox"
        >
        <control
          v-model="form.phone"
          name="phone"
          placeholder="Телефон"
          icon-class="cursor-pointer"
          type="text"
        />
      </div>
      <div class="md:flex md:items-center mb-6">
        <input
          class="mr-2 leading-tight"
          type="checkbox"
        >
        <control
          v-model="form.comment"
          name="comment"
          placeholder="Комментарий"
          icon-class="cursor-pointer"
          type="text"
        />
      </div>
      <control
        v-model="form.button_text"
        class="mb-6"
        name="button_text"
        placeholder="Надпись на кнопке"
        icon-class="cursor-pointer"
        type="text"
      />
      <control
        v-model="form.notify_text"
        class="mb-6"
        name="notify_text"
        placeholder="Уведомление после отправки или ссылка для редиректа"
        icon-class="cursor-pointer"
        type="text"
      />
      <jb-button
        color="login"
        class="w-full rounded-lg text-sm"
        label="Создать форму"
      />
    </form>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar/NavBar'
import JbButton from '@/components/JbButton.vue'
import Control from '@/components/Control.vue'

export default {
  components: {
    NavBar,
    Control,
    JbButton
  },
  data () {
    return {
      form: {
        titleForm: '',
        name: '',
        email: '',
        phone: '',
        comment: '',
        button_text: '',
        notify_text: '',
        showParams: false
      }
    }
  }
}
</script>

<style scoped></style>
