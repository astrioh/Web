<template>
  <div class="h-screen overflow-auto">
    <div v-if="showParams === true">
      <jb-button
        class="rounded-lg mt-3 ml-2 text-sm"
        label="Вернуться к настройке формы"
        @click="showParams = false"
      />
      <span>Здесь будут параметры формы</span>
    </div>
    <div v-if="showParams === false">
      <NavBar
        class="pt-[8px]"
        title="Настройка формы"
      />
      <form
        class="px-5 bg-white py-2 pb-[200px] rounded-xl"
      >
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
          v-model="form.redirect_link"
          class="mb-6"
          name="notify_text"
          placeholder="Уведомление после отправки или ссылка для редиректа"
          icon-class="cursor-pointer"
          type="text"
        />
        <jb-button
          color="login"
          class="w-full rounded-lg text-sm"
          label="Сохранить форму"
          @click="clickCreateForm"
        />
        <router-link
          :to="'/form/' + $route.params.board_id"
        >
          <jb-button
            class="w-full mt-3 rounded-lg text-sm"
            label="Перейти к форме"
            @click="clickCreateForm"
          />
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar/NavBar'
import JbButton from '@/components/JbButton.vue'
import Control from '@/components/Control.vue'

import * as BOARD_FORMS from '@/store/actions/board_forms.js'

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
        redirect_link: ''
      },
      showParams: false
    }
  },
  methods: {
    clickCreateForm () {
      const data = {
        uid_board: this.$route.params.board_id,
        info: JSON.stringify({
          title: this.form.titleForm,
          name: {
            text: this.form.name,
            visible: true
          },
          email: {
            text: this.form.email,
            visible: true
          },
          phone: {
            text: this.form.phone,
            visible: true
          },
          comment: {
            text: this.form.comment,
            visible: true
          },
          button_text: this.form.button_text,
          redirect_link: this.form.redirect_link
        })
      }
      this.$store.dispatch(BOARD_FORMS.CREATE_BOARD_FORM_REQUEST, data)
      // this.showParams = true
    }
  }
}
</script>

<style scoped></style>
