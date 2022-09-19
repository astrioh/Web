<template>
  <ModalBox
    :title="title"
    ok="Сохранить"
    :disabled="buttonSaveDisabled"
    @ok="onSave"
    @cancel="onCancel"
  >
    <div class="flex flex-col w-full">
      <div class="mb-3">
        <span class="mb-1">Имя</span>
        <input
          ref="inputValue"
          v-model="name"
          type="text"
          :maxLength="maxLengthInput"
          class="bg-[#f4f5f7]/50 rounded-[6px] focus:ring-0 border w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
          :class="onValidateField('name')"
        >
        <span
          v-if="!validateNameField"
          class="text-[11px] text-[#dc2626]"
        >Обязательное для заполнения</span>
      </div>
      <div class="mb-3">
        <span class="mb-1">Телефон</span>
        <input
          v-model="phone"
          type="text"
          :maxLength="maxLengthInput"
          class="bg-[#f4f5f7]/50 rounded-[6px] focus:ring-0 border w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
          :class="onValidateField('phone')"
        >
        <span
          v-if="!validatePhoneField"
          class="text-[11px] text-[#dc2626]"
        >Обязательное для заполнения</span>
      </div>
      <div class="mb-3">
        <span class="mb-1">Email</span>
        <input
          v-model="email"
          type="text"
          class="bg-[#f4f5f7]/50 rounded-[6px] focus:ring-0 w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto border"
          :class="onValidateField('email')"
        >
        <span
          v-if="!validateEmailField"
          class="text-[11px] text-[#dc2626]"
        >Обязательное для заполнения</span>
      </div>
      <span class="mb-1">Комментарий</span>
      <input
        v-model="comment"
        type="text"
        class="bg-[#f4f5f7]/50 rounded-[6px] focus:ring-0 border border-[#4c4c4d] focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
      >
    </div>
  </ModalBox>
</template>

<script>
import ModalBox from '@/components/modals/ModalBox.vue'
import { uuidv4 } from '@/helpers/functions'

export default {
  components: {
    ModalBox
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'save'],
  data: () => ({
    name: '',
    phone: '',
    email: '',
    comment: ''
  }),
  computed: {
    maxLengthInput () {
      return '50'
    },
    buttonSaveDisabled () {
      return !this.validateNameField || !this.validatePhoneField || !this.validateEmailField
    },
    validateNameField () {
      const minNameLength = 0
      const maxNameLength = 50

      return this.name.length > minNameLength && this.name.length < maxNameLength
    },
    validatePhoneField () {
      // eslint-disable-next-line no-useless-escape
      return this.phone.toLowerCase().match(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/)
    },
    validateEmailField () {
      return String(this.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
    },
    onSave () {
      const data = {
        uid: uuidv4(),
        name: this.name,
        phone: this.phone,
        email: this.email,
        comment: this.comment
      }
      this.$emit('save', data)
      this.onClear()
    },
    onClear () {
      this.name = ''
      this.phone = ''
      this.email = ''
      this.comment = ''
    },
    onValidateField (key) {
      const defaultClass = 'border-[#4c4c4d] focus:border-[#ff9123]'
      const errorClass = 'border-rose-500 focus:border-rose-500'

      switch (key) {
        case 'name':
          return !this.validateNameField ? errorClass : defaultClass
        case 'phone':
          return !this.validatePhoneField ? errorClass : defaultClass
        case 'email':
          return !this.validateEmailField ? errorClass : defaultClass
        default:
          return defaultClass
      }
    }
  }
}
</script>

<style scoped></style>
