<template>
  <div class="w-full flex flex-col py-6 px-[20px] bg-white rounded-[8px]">
    <div class="font-roboto text-center text-[#424242] text-[25px] font-bold">
      Пройти регламент "{{ name }}"
    </div>
    <div
      v-if="date"
      class="flex gap-[4px] mt-[12px]"
    >
      <div class="flex-none font-roboto text-[#7E7E80] text-[13px]">
        Последнее изменение {{ dateCommon }}
      </div>
      <div
        v-if="lastChange"
        class="grow font-roboto text-[#7E7E80] text-[13px] truncate"
      >
        {{ lastChange }}
      </div>
    </div>
    <button
      class="place-self-center mt-[35px] w-[238px] h-[40px] cursor-pointer px-[40px] rounded-[6px] bg-[#F2B679] hover:bg-slate-200"
      @click="gotoReglamentContent"
    >
      <div class="font-roboto text-[#2E2E2E] text-[14px] font-medium">
        Пройти регламент
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    uid: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    lastChange: {
      type: String,
      default: ''
    }
  },
  computed: {
    dateCommon () {
      if (this.lastChange) return `${this.date}:`
      return this.date
    }
  },
  methods: {
    gotoReglamentContent () {
      this.$router.push('/reglaments/' + this.uid)
      this.$store.state.reglaments.returnDoitnow = true
      this.$store.commit('NAVIGATOR_SUCCESS')
    }
  }
}
</script>
