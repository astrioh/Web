<template>
  <div class="flex flex-row mt-3 justify-between">
    <span class="bg-[#f4f5f7] p-0 font-roboto font-bold font-[18px] leading-[21px] text-[#424242] w-full border-none">История изменений</span>
    <div class="flex justify-end">
      <router-link :to="'/reglaments/' + $route.params.id">
        <ReglamentSmallButton
          class="flex items-center px-[10px] py-[5px]"
        >
          <svg
            class="mr-1.5"
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.23531 6.86625L2.99406 4.625H13.8516V3.375H2.99406L5.23531 1.13375L4.35156 0.25L0.601562 4L4.35156 7.75L5.23531 6.86625Z"
              fill="#4C4C4D"
            />
          </svg>
          Назад
        </ReglamentSmallButton>
      </router-link>
    </div>
  </div>
  <div class="mt-5 p-7 bg-white rounded-[28px] flex flex-col">
    <span
      v-if="reglamentComments.length < 1"
      class="w-full text-center text-gray-500 text-[16px]"
    >История изменений пуста</span>
    <template
      v-for="(comment, index) in reglamentComments"
      :key="index"
    >
      <ReglamentHistoryElement
        :comment="reglamentComments[index].comment"
        :uid-employee="reglamentComments[index].uid_employee"
        :comment-date="reglamentComments[index].comment_date"
      />
    </template>
  </div>
</template>

<script>
import ReglamentSmallButton from '@/components/Reglaments/ReglamentSmallButton.vue'
import ReglamentHistoryElement from '@/components/Reglaments/ReglamentHistoryElement.vue'
import * as REGLAMENTS from '@/store/actions/reglaments.js'
export default {
  components: {
    ReglamentSmallButton,
    ReglamentHistoryElement
  },
  data () {
    return {
      reglamentComments: []
    }
  },
  mounted () {
    this.$store.dispatch(REGLAMENTS.GET_REGLAMENT_COMMENTS, this.$route.params.id).then((res) => {
      this.reglamentComments = res.data
    })
  }
}
</script>
