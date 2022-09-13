<template>
  <ModalBox
    :title="title"
    ok="Сохранить"
    @ok="onSave"
    @cancel="onCancel"
  >
    <div class="flex flex-col w-full">
      <span class="mb-1">Имя</span>
      <input
        ref="inputValue"
        v-model="name"
        type="text"
        class="bg-[#f4f5f7]/50 mb-3 rounded-[6px] focus:ring-0 border border-[#4c4c4d] focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
      >
      <span class="mb-1">Телефон</span>
      <input
        v-model="phone"
        type="text"
        class="bg-[#f4f5f7]/50 mb-3 rounded-[6px] focus:ring-0 border border-[#4c4c4d] focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
      >
      <span class="mb-1">Email</span>
      <input
        v-model="email"
        type="text"
        class="bg-[#f4f5f7]/50 mb-3 rounded-[6px] focus:ring-0 border border-[#4c4c4d] focus:border-[#ff9123] w-full px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
      >
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
  methods: {
    onCancel () {
      this.$emit('cancel')
    },
    onSave () {
      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        comment: this.comment
      }
      this.$emit('save', data)
    }
  }
}
</script>

<style scoped></style>
