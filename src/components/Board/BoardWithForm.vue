<template>
  <div class="w-full h-full">
    <NavBar
      class="pt-[8px]"
      title="Настройка формы"
    />
    <div class="flex flex-row">
      <form
        class="p-5 bg-white rounded-xl w-[30%] shrink-0 self-start"
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
            class="bg-[#f4f5f7]/50 rounded-[6px] border focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
            :class="errors.inputs.includes('name') ? 'border-red-500' : 'border-[#4c4c4d]'"
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
            class="bg-[#f4f5f7]/50 rounded-[6px] border focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
            :class="errors.inputs.includes('email') ? 'border-red-500' : 'border-[#4c4c4d]'"
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
            class="bg-[#f4f5f7]/50 rounded-[6px] border focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
            :class="errors.inputs.includes('phone') ? 'border-red-500' : 'border-[#4c4c4d]'"
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
            class="bg-[#f4f5f7]/50 rounded-[6px] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
            :class="errors.inputs.includes('comment') ? 'border-red-500' : 'border-[#4c4c4d]'"
            name="comment"
            placeholder="Комментарий"
            icon-class="cursor-pointer"
            type="text"
          >
        </div>
        <input
          v-model="form.button_text"
          class="bg-[#f4f5f7]/50 mb-[10px] rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
          :class="errors.inputs.includes('button_text') ? 'border-red-500' : 'border-[#4c4c4d]'"
          name="button_text"
          placeholder="Надпись на кнопке"
          icon-class="cursor-pointer"
          type="text"
        >
        <input
          v-model="form.redirect_link"
          class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:ring-0 focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto mb-3"
          name="redirect_link"
          placeholder="Ссылка для редиректа"
          icon-class="cursor-pointer"
          type="text"
        >
        <template v-if="errors.messages">
          <p
            v-for="error in errors.messages"
            :key="error"
            class="text-red-500 text-xs mb-3"
          >
            {{ error }}
          </p>
        </template>
        <jb-button
          color="login"
          class="w-full rounded-lg text-sm"
          label="Сохранить форму"
          @click="clickSaveForm"
        />
      </form>
      <div
        v-if="showParams === true"
        class="ml-10 mt-2"
      >
        <div class="mb-10">
          <p>HTML-код:</p>
          <span
            class="bg-white p-3 leading-[50px] rounded-[8px]"
            v-text="iframeHtml"
          />
          <button
            class="mt-3 focus:ring min-w-[90px] focus:outline-none flex cursor-pointer whitespace-nowrap justify-center items-center duration-150 px-[12px] py-[10px] rounded-md bg-[#ff9123] text-white text-[13px] leading-[15px] font-medium font-roboto"
            @click="copyIframeHtml"
          >
            Копировать HTML код
          </button>
        </div>
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
      showParams: false,
      errors: {
        inputs: [],
        messages: []
      }
    }
  },
  computed: {
    boardForm () {
      return this.$store.state.boardforms.boardForm
    },
    iframeHtml () {
      return `<iframe src="http://localhost:8080/form/${this.$route.params.board_id}?frame=true" title="Контакт" width="400" height="332" scrolling="no" frameBorder="0"></iframe>`
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
        this.showParams = true
      }
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
    validateForm () {
      this.errors.inputs = []
      this.errors.messages = []
      let inputsValidateError = false
      // Массив инпутов которые валидируем
      const inputs = ['name', 'phone', 'email', 'comment', 'button_text']
      // Цикл, который проходит по всем инпутам для валидации и генерирует ошибку, если поля с галочкой, но пустые
      inputs.forEach(inputName => {
        if (this.form[inputName].visible && !this.form[inputName].text) {
          this.errors.inputs.push(inputName)
          inputsValidateError = true
        }
        if (!this.form[inputName]) {
          this.errors.inputs.push(inputName)
          inputsValidateError = true
        }
      })
      // Общий текст ошибки для пустых инпутов
      if (inputsValidateError) {
        this.errors.messages.push('Форма не сохранена')
        this.errors.messages.push('Поля должны быть обязательно заполнены')
      }
    },
    clickSaveForm () {
      this.validateForm()
      if (this.errors.messages.length) {
        return
      }

      const data = {
        uid_board: this.$route.params.board_id,
        info: this.form
      }
      this.$store.dispatch(BOARD_FORMS.CREATE_OR_UPDATE_BOARD_FORM_REQUEST, data)
      this.$store.state.boardforms.boardForm = data
      console.log(this.$store.state.boardforms.boardForm)
      this.showParams = true
    },
    copyIframeHtml () {
      navigator.clipboard.writeText(this.iframeHtml)
    }
  }
}
</script>

<style scoped></style>
