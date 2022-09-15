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
          v-model="form.title"
          class="mb-6"
          name="title"
          placeholder="Заголовок формы"
          icon-class="cursor-pointer"
          type="text"
        />
        <div class="flex items-center mb-6">
          <input
            class="mr-2 leading-tight"
            type="checkbox"
            @change="changeNameVisible"
          >
          <control
            v-model="form.name.text"
            class="w-full"
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
            @change="changeEmailVisible"
          >
          <control
            v-model="form.email.text"
            class="w-full"
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
            @change="changePhoneVisible"
          >
          <control
            v-model="form.phone.text"
            class="w-full"
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
            @change="changeCommentVisible"
          >
          <control
            v-model="form.comment.text"
            class="w-full"
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
          name="redirect_link"
          placeholder="Уведомление после отправки или ссылка для редиректа"
          icon-class="cursor-pointer"
          type="text"
        />
        <jb-button
          color="login"
          class="w-full rounded-lg text-sm"
          label="Сохранить форму"
          @click="clickSaveForm"
        />
        <router-link
          :to="'/form/' + $route.params.board_id"
        >
          <jb-button
            class="w-full mt-3 rounded-lg text-sm"
            label="Перейти к форме"
            @click="goToForm"
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

import * as BOARD_FORMS from '@/store/actions/boardforms.js'

export default {
  components: {
    NavBar,
    Control,
    JbButton
  },
  data () {
    return {
      form: {
        title: '',
        name: {
          text: '',
          visible: true
        },
        email: {
          text: '',
          visible: true
        },
        phone: {
          text: '',
          visible: true
        },
        comment: {
          text: '',
          visible: true
        },
        button_text: '',
        redirect_link: ''
      },
      showParams: false
    }
  },
  methods: {
    clickSaveForm () {
      const data = {
        uid_board: this.$route.params.board_id,
        info: this.form
      }
      this.$store.dispatch(BOARD_FORMS.CREATE_OR_UPDATE_BOARD_FORM_REQUEST, data)
      this.$store.state.boardforms.boardForm = data
      console.log(this.$store.state.boardforms.boardForm)
      // this.showParams = true
    }
  }
}
</script>

<style scoped></style>
