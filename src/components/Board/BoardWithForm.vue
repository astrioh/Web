<template>
  <div class="w-full h-full">
    <NavBar
      class="pt-[8px]"
      title="Настройка формы"
    />
    <div class="flex flex-row">
      <form
        class="p-5 bg-white rounded-xl w-[30%] shrink-0"
      >
        <input
          v-model="form.title"
          class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
          name="title"
          placeholder="Заголовок формы"
          icon-class="cursor-pointer"
          type="text"
        >
        <div class="flex items-center my-[10px]">
          <FormCheckbox
            :is-checked="form.name.visible"
            class="mr-[10px]"
            @click="hideName"
          />
          <input
            v-model="
              form.name.text"
            class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
            name="name"
            placeholder="Имя"
            icon-class="cursor-pointer"
            type="text"
          >
        </div>
        <div class="md:flex md:items-center my-[10px]">
          <FormCheckbox
            :is-checked="form.email.visible"
            class="mr-[10px]"
            @click="hideEmail"
          />
          <input
            v-model="form.email.text"
            class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
            name="email"
            placeholder="Емайл"
            icon-class="cursor-pointer"
            type="text"
          >
        </div>
        <div class="md:flex md:items-center my-[10px]">
          <FormCheckbox
            :is-checked="form.phone.visible"
            class="mr-[10px]"
            @click="hidePhone"
          />
          <input
            v-model="form.phone.text"
            class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
            name="phone"
            placeholder="Телефон"
            icon-class="cursor-pointer"
            type="text"
          >
        </div>
        <div class="md:flex md:items-center my-[10px]">
          <FormCheckbox
            :is-checked="form.comment.visible"
            class="mr-[10px]"
            @click="hideComment"
          />
          <input
            v-model="form.comment.text"
            class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
            name="comment"
            placeholder="Комментарий"
            icon-class="cursor-pointer"
            type="text"
          >
        </div>
        <input
          v-model="form.button_text"
          class="bg-[#f4f5f7]/50 mb-[10px] rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
          name="button_text"
          placeholder="Надпись на кнопке"
          icon-class="cursor-pointer"
          type="text"
        >
        <input
          v-model="form.redirect_link"
          class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
          name="redirect_link"
          placeholder="Уведомление после отправки или ссылка для редиректа"
          icon-class="cursor-pointer"
          type="text"
        >
        <jb-button
          color="login"
          class="w-full mt-[10px] rounded-lg text-sm"
          label="Сохранить форму"
          @click="clickSaveForm"
        />
      </form>
      <div
        v-if="showParams === true"
        class="ml-10 mt-2"
      >
        <div class="mb-10">
          <span>Ссылка на форму: </span>
          <router-link
            target="_blank"
            :to="'/form/' + $route.params.board_id"
          >
            <span class="underline text-blue-500 hover:text-blue-800">http://localhost:8080/form/{{ $route.params.board_id }}</span>
          </router-link>
        </div>
        <div class="mb-10">
          <span>JSON API: </span>
          <a
            class="underline text-blue-500 hover:text-blue-800"
            :href="'https://web.leadertask.com/api/boardsforms/addboardleadbyjson?uid_board=' + $route.params.board_id"
          >https://web.leadertask.com/api/boardsforms/addboardleadbyjson?uid_board={{ $route.params.board_id }}</a>
        </div>
        <div class="mb-10">
          <span>JSON-запрос: </span>
          <span class="bg-white p-3 rounded-[8px]">{"title":"Заголовок карточки","сomment":"Заметка карточки"}</span>
        </div>
        <div class="mb-10">
          <span>JSON-ответ при успешном результате: </span>
          <span class="bg-white p-3 rounded-[8px]">{"code":200,"message":""}</span>
          <p class="text-gray-500 mt-3">
            где "code" равен 200 при успехе, при другом значении ошибка, в поле "message" будет причина ошибки
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar/NavBar'
import JbButton from '@/components/JbButton.vue'
import FormCheckbox from '@/components/Board/FormCheckbox.vue'

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
  computed: {
    boardForm () {
      return this.$store.state.boardforms.boardForm
    }
  },
  mounted () {
    this.$store.dispatch(BOARD_FORMS.GET_BOARD_FORM_REQUEST, this.$route.params.board_id).then((res) => {
      const data = {
        uid_board: this.$route.params.board_id,
        info: res.data[0]?.info
      }
      this.$store.state.boardforms.boardForm = data
      if (data.info) {
        this.form = data.info
      }
      this.showParams = true
      console.log(this.form)
    })
  },
  methods: {
    hideName () {
      if (this.form.name.visible === false) {
        this.form.name.visible = true
        return
      }
      this.form.name.visible = false
    },
    hideEmail () {
      if (this.form.email.visible === false) {
        this.form.email.visible = true
        return
      }
      this.form.email.visible = false
    },
    hidePhone () {
      if (this.form.phone.visible === false) {
        this.form.phone.visible = true
        return
      }
      this.form.phone.visible = false
    },
    hideComment () {
      if (this.form.comment.visible === false) {
        this.form.comment.visible = true
        return
      }
      this.form.comment.visible = false
    },
    clickSaveForm () {
      const data = {
        uid_board: this.$route.params.board_id,
        info: this.form
      }
      this.$store.dispatch(BOARD_FORMS.CREATE_OR_UPDATE_BOARD_FORM_REQUEST, data)
      this.$store.state.boardforms.boardForm = data
      console.log(this.$store.state.boardforms.boardForm)
      this.showParams = true
    }
  }
}
</script>

<style scoped></style>
