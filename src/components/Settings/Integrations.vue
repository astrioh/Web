<template>
  <IntegrationsModalBox
    v-if="showIntegration"
    title="Интеграция с Яндекс.Почта"
    @cancel="showIntegration = false"
    @save="showIntegration = false"
  />
  <NavBar
    class="pt-[8px]"
    title="Интеграции"
  />
  <div class="w-full p-10 h-full bg-white rounded-[8px]">
    <div class="flex w-[300px] justify-center flex-col">
      <div class="flex items-center">
        <img
          class="h-[30px] w-[30px]"
          src="@/assets/images/yPochta.png"
        >
        <span class="ml-[10px] font-[500]">Интеграция через Яндекс.Почта</span>
      </div>
      <button
        class="mt-[10px] rounded-[10px] h-[40px] text-white bg-orange-300 "
        @click="showIntegration = true"
      >
        Интеграция
      </button>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/Navbar/NavBar'
import IntegrationsModalBox from '@/components/Settings/IntegrationsModalBox.vue'

export default {
  components: {
    NavBar,
    IntegrationsModalBox
  },
  data () {
    return {
      showIntegration: false
    }
  }
}
</script>
