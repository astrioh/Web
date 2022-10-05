<template>
  <NavBar
    class="mt-[8px]"
    title="Карма"
  />
  <!--  -->
  <div
    v-if="user.tarif !== 'alpha' && user.tarif !== 'trial' || isLicenseExpired"
    class="grid grid-cols-1 gap-4 p-5 bg-white rounded mt-2"
  >
    <KarmaNoLicenceWindow />
  </div>
  <div
    v-else
  >
    <KarmaSkeleton v-if="showSkeleton" />
    <div
      v-else
      class="rounded-xl bg-white min-h-[300px] mb-[22px]"
    >
      <div class="mx-7">
        <KarmaScore
          :karma-quantity="karmaQuantity"
          :success-quantity="successQuantity"
          :overdue-quantity="overdueQuantity"
        />

        <div class="flex justify-between">
          <div class="border border-gray-200 rounded-[12px] flex flex-col w-full h-[332px] p-[24px] mr-5">
            <span class="font-[500] mb-3 text-[16px] leading-[18px] ml-2 text-[#4C4C4D]">В срок</span>
            <LineChart
              class="mb-3"
              :data="successChartData"
            />
          </div>
          <div class="border border-gray-200 rounded-[12px] flex flex-col w-full h-[332px] p-[24px]">
            <span class="font-[500] mb-3 text-[16px] leading-[18px] ml-2 text-[#4C4C4D]">Просрочено</span>
            <LineChart
              class="mb-3"
              :data="overdueChartData"
            />
          </div>
        </div>
        <KarmaHistory />
      </div>
    </div>
  </div>
</template>

<script>
import * as chartConfig from '@/components/Charts/chart.config.js'
import KarmaSkeleton from '@/components/Settings/KarmaSkeleton.vue'
import LineChart from '@/components/Charts/LineChart.vue'
import NavBar from '@/components/Navbar/NavBar.vue'
import KarmaNoLicenceWindow from '../AccKarma/KarmaNoLicenceWindow.vue'
import KarmaHistory from '../AccKarma/KarmaHistory.vue'
import KarmaScore from '../AccKarma/KarmaScore.vue'

export default {
  components: {
    NavBar,
    KarmaSkeleton,
    LineChart,
    KarmaNoLicenceWindow,
    KarmaHistory,
    KarmaScore
  },
  data () {
    return {
      successChartData: null,
      overdueChartData: null,
      showSkeleton: true
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    },
    isLicenseExpired () {
      return this.$store.getters.isLicenseExpired
    },
    currentLocation () {
      return window.location.href
    },
    karmaList () {
      return this.$store.state.inspector.karma
    },
    karmaQuantity () {
      let quantity = 0
      for (const karma of this.karmaList) quantity += karma.points
      return quantity
    },
    successQuantity () {
      let quantity = 0
      for (const karma of this.karmaList) {
        if (karma.points > 0) {
          quantity += 1
        }
      }
      return quantity
    },
    overdueQuantity () {
      let quantity = 0
      for (const karma of this.karmaList) {
        if (karma.points < 0) {
          quantity += 1
        }
      }
      return quantity
    }
  },
  mounted () {
    this.$store.dispatch('KARMA_REQUEST', this.user?.current_user_uid).then((resp) => {
      const success = []
      const overdue = []
      for (const karma of resp.data) {
        if (karma.points > 0) success.push(karma)
        else if (karma.points < 0) overdue.push(karma)
      }
      this.successChartData = chartConfig.karmaChartData(success, 'success')
      this.overdueChartData = chartConfig.karmaChartData(overdue, 'danger')
      this.showSkeleton = false
    })
  }
}
</script>
