<template>
  <div class="h-full flex items-center justify-center max-w-[400px] mx-auto">
    <div class="flex flex-col w-full bg-[#F9F9F9] p-[25px] shadow-2xl">
      <h1 class="mb-[15px] text-[30px] text-center text-[#777]">
        {{ item.title }}
      </h1>
      <input
        v-model="modelInput1"
        :placeholder="item.inputs.input1"
        type="text"
        class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:border-[#ff9123] w-full mb-3 px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
      >
      <input
        v-model="modelInput2"
        :placeholder="item.inputs.input2"
        type="text"
        class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:border-[#ff9123] w-full mb-3 px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
      >
      <input
        v-model="modelInput3"
        :placeholder="item.inputs.input3"
        type="text"
        class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:border-[#ff9123] w-full mb-3 px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
      >
      <input
        v-model="modelInput4"
        :placeholder="item.inputs.input4"
        type="text"
        class="bg-[#f4f5f7]/50 rounded-[6px] border border-[#4c4c4d] focus:border-[#ff9123] w-full mb-3 px-[14px] py-[11px] text-[14px] leading-[16px] text-[#4c4c4d] font-roboto"
      >
      <button
        class="focus:ring min-w-[90px] focus:outline-none inline-flex cursor-pointer whitespace-nowrap justify-center items-center duration-150 px-[12px] py-[10px] rounded-md bg-[#ff9123] text-white text-[13px] leading-[15px] font-medium font-roboto"
        @click="submitForm"
      >
        {{ item.buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import * as BOARD from '@/store/actions/boards'
import * as BOARD_FORMS from '@/store/actions/boardforms'

export default {
  data () {
    return {
      showInput1: true,
      showInput2: true,
      showInput3: true,
      showInput4: true,
      modelInput1: '',
      modelInput2: '',
      modelInput3: '',
      modelInput4: '',
      item: {
        title: '',
        buttonText: '',
        redirectLink: '',
        inputs: {
          input1: '',
          input2: '',
          input3: '',
          input4: ''
        }
      }
    }
  },
  computed: {
    boardForm () {
      return this.$store.state.boardforms.boardForm
    }
  },
  mounted () {
    this.$store.dispatch('fullScreenToggle', 'add')
    this.$store.dispatch(BOARD_FORMS.GET_BOARD_FORM_REQUEST, this.$route.params.board_id).then((res) => {
      const data = {
        uid_board: res.data[0].uid_board,
        info: res.data[0].info
      }
      this.$store.state.boardforms.boardForm = data
      this.item.title = this.boardForm.info.title
      this.item.redirectLink = this.boardForm.info.redirect_link
      this.item.buttonText = this.boardForm.info.button_text
      this.item.inputs.input1 = this.boardForm.info?.name.text
      this.item.inputs.input2 = this.boardForm.info?.email.text
      this.item.inputs.input3 = this.boardForm.info?.phone.text
      this.item.inputs.input4 = this.boardForm.info?.comment.text

      this.showInput1 = this.boardForm.info.name.visible
      this.showInput2 = this.boardForm.info.email.visible
      this.showInput3 = this.boardForm.info.phone.visible
      this.showInput4 = this.boardForm.info.comment.visible
    })
  },
  methods: {
    submitForm () {
      const data = {
        board_uid: this.$route.params.board_id,
        title: this.modelInput1,
        comment: this.modelInput2 + ', ' + this.modelInput3 + ', ' + this.modelInput4
      }
      this.$store.dispatch(BOARD.SEND_BOARD_FORM_REQUEST, data)
      console.log(data)
    }
  }
}
</script>
