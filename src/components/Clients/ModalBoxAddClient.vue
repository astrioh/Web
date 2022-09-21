<template>
  <ModalBox
    :title="title"
    ok="Сохранить"
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
          v-if="!validationInputs.name"
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
          v-if="!validationInputs.phone"
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
          v-if="!validationInputs.email"
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
    comment: '',
    validationInputs: {
      name: true,
      phone: true,
      email: true
    }
  }),
  computed: {
    maxLengthInput () {
      return '50'
    },
    validateForm () {
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
      if (!this.validateNameField) {
        this.validationInputs.name = false
      } else {
        this.validationInputs.name = true
      }
      if (!this.validatePhoneField) {
        this.validationInputs.phone = false
      } else {
        this.validationInputs.phone = true
      }
      if (!this.validateEmailField) {
        this.validationInputs.email = false
      } else {
        this.validationInputs.email = true
      }

      if (!this.validateForm) {
        const data = {
          uid: uuidv4(),
          name: this.name,
          phone: this.phone,
          email: this.email,
          comment: this.comment
        }
        this.$emit('save', data)
      }
    },
    onValidateField (key) {
      const defaultClass = 'border-[#4c4c4d] focus:border-[#ff9123]'
      const errorClass = 'border-rose-500 focus:border-rose-500'
      const { name, phone, email } = this.validationInputs

      switch (key) {
        case 'name':
          return !name ? errorClass : defaultClass
        case 'phone':
          return !phone ? errorClass : defaultClass
        case 'email':
          return !email ? errorClass : defaultClass
        default:
          return defaultClass
      }
    }
  }
}
</script>

<style scoped></style>
