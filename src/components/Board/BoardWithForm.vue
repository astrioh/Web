<template>
  <NavBar
    class="pt-[8px]"
    title="Настройка формы"
  />
  <div class="h-full w-full">
    <form
      class="px-5 bg-white py-2 rounded-xl"
    >
      <input
        v-model="form.titleForm"
        class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
        name="titleForm"
        placeholder="Заголовок формы"
        icon-class="cursor-pointer"
        type="text"
      >
      <div class="flex items-center my-[10px]">
        <FormCheckbox class="mr-[10px]" />
        <input
          v-model="form.name"
          class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
          name="name"
          placeholder="Имя"
          icon-class="cursor-pointer"
          type="text"
        >
      </div>
      <div class="md:flex md:items-center my-[10px]">
        <FormCheckbox class="mr-[10px]" />
        <input
          v-model="form.email"
          class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
          name="email"
          placeholder="Емайл"
          icon-class="cursor-pointer"
          type="text"
        >
      </div>
      <div class="md:flex md:items-center my-[10px]">
        <FormCheckbox class="mr-[10px]" />
        <input
          v-model="form.phone"
          class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
          name="phone"
          placeholder="Телефон"
          icon-class="cursor-pointer"
          type="text"
        >
      </div>
      <div class="md:flex md:items-center my-[10px]">
        <FormCheckbox class="mr-[10px]" />
        <input
          v-model="form.comment"
          class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
          name="comment"
          placeholder="Комментарий"
          icon-class="cursor-pointer"
          type="text"
        >
      </div>
      <input
        v-model="form.button_text"
        class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
        name="button_text"
        placeholder="Надпись на кнопке"
        icon-class="cursor-pointer"
        type="text"
      >
      <input
        v-model="form.redirect_link"
        class="bg-[#f4f5f7]/50 mt-[10px] mb-[10px] rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
        name="notify_text"
        placeholder="Уведомление после отправки или ссылка для редиректа"
        icon-class="cursor-pointer"
        type="text"
      >
      <router-link
        :to="'/form/' + $route.params.board_id"
      >
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
      </router-link>
    </form>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar/NavBar'
import FormCheckbox from '@/components/Board/FormCheckbox.vue'
import JbButton from '@/components/JbButton.vue'

import * as BOARD_FORMS from '@/store/actions/boardforms.js'

export default {
  components: {
    NavBar,
    JbButton,
    FormCheckbox
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
    clickSaveForm () {
      const data = {
        uid_board: this.$route.params.board_id,
        info: {
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
        }
      }
      this.$store.dispatch(BOARD_FORMS.CREATE_OR_UPDATE_BOARD_FORM_REQUEST, data)
      console.log(this.$store.state.boardforms.boardForm)
      this.$store.state.boardforms.boardForm = data
      // this.showParams = true
    }
  }
}
</script>

<style scoped></style>
