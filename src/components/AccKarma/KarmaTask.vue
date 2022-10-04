<template>
  <div class="flex justify-between pt-3">
    <div class="flex items-center min-w-[40%]">
      <div class="flex items-center break-words min-w-[40%]">
        <a
          class="font-normal font-roboto font-[400] text-[15px] cursor-pointer text-[#424242] min-w-[40%] hover:text-[#007BE5] hover:underline"
          @click="setTaskFromQueue(karma.taskJson.uid)"
        >
          {{ karma.taskJson.name }}
        </a>
      </div>
    </div>
    <div class="flex flex-row">
      <span
        v-if="karma.points > 0"
        class="my-auto mr-2"
      >
        <svg
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 9.5V1.5M1.5 5L5 1.5L8.5 5"
            stroke="#1CA345"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span
        v-if="karma.points < 0"
        class="my-auto mr-2"
      >
        <svg
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 1.5V9.5M1.5 6L5 9.5L8.5 6"
            stroke="#F14821"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

      </span>
      <p
        class="text-[14px] font-bold whitespace-nowrap leading-0"
        :class="{'text-green-500': karma.points > 0, 'text-red-500': karma.points < 0 }"
      >
        {{ Math.abs(karma.points) }}
      </p>
    </div>
  </div>
  <div class="whitespace-nowrap flex items-center">
    <div class="pr-2 w-[100px]">
      <span class="inline-flex justify-center items-center h-[30px] ">
        <span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.9778 2.84523H11.9111H10.6666H5.33331H4.08886H3.0222C2.77674 2.84523 2.57775 3.04421 2.57775 3.28967V12.5341C2.57775 12.7796 2.77674 12.9786 3.0222 12.9786H12.9778C13.2232 12.9786 13.4222 12.7796 13.4222 12.5341V3.28967C13.4222 3.04421 13.2232 2.84523 12.9778 2.84523ZM3.0222 1.86745C2.23673 1.86745 1.59998 2.5042 1.59998 3.28967V12.5341C1.59998 13.3196 2.23673 13.9563 3.0222 13.9563H12.9778C13.7632 13.9563 14.4 13.3196 14.4 12.5341V3.28967C14.4 2.5042 13.7632 1.86745 12.9778 1.86745H11.9111H10.6666H5.33331H4.08886H3.0222Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M9.27675 5.06745C8.78583 5.06745 8.38786 5.46541 8.38786 5.95633C8.38786 6.44725 8.78583 6.84522 9.27675 6.84522C9.76767 6.84522 10.1656 6.44725 10.1656 5.95633C10.1656 5.46541 9.76767 5.06745 9.27675 5.06745Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M9.27675 7.55633C8.78583 7.55633 8.38786 7.9543 8.38786 8.44522C8.38786 8.93614 8.78583 9.33411 9.27675 9.33411C9.76767 9.33411 10.1656 8.93614 10.1656 8.44522C10.1656 7.9543 9.76767 7.55633 9.27675 7.55633Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M8.38786 10.9341C8.38786 10.4432 8.78583 10.0452 9.27675 10.0452C9.76767 10.0452 10.1656 10.4432 10.1656 10.9341C10.1656 11.425 9.76767 11.823 9.27675 11.823C8.78583 11.823 8.38786 11.425 8.38786 10.9341Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M11.7656 5.06745C11.2747 5.06745 10.8767 5.46541 10.8767 5.95633C10.8767 6.44725 11.2747 6.84522 11.7656 6.84522C12.2566 6.84522 12.6545 6.44725 12.6545 5.95633C12.6545 5.46541 12.2566 5.06745 11.7656 5.06745Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M10.8767 8.44522C10.8767 7.9543 11.2747 7.55633 11.7656 7.55633C12.2566 7.55633 12.6545 7.9543 12.6545 8.44522C12.6545 8.93614 12.2566 9.33411 11.7656 9.33411C11.2747 9.33411 10.8767 8.93614 10.8767 8.44522Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M11.7656 10.0452C11.2747 10.0452 10.8767 10.4432 10.8767 10.9341C10.8767 11.425 11.2747 11.823 11.7656 11.823C12.2566 11.823 12.6545 11.425 12.6545 10.9341C12.6545 10.4432 12.2566 10.0452 11.7656 10.0452Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M4.33131 5.06745C3.84039 5.06745 3.44242 5.46541 3.44242 5.95633C3.44242 6.44725 3.84039 6.84522 4.33131 6.84522C4.82223 6.84522 5.22019 6.44725 5.22019 5.95633C5.22019 5.46541 4.82223 5.06745 4.33131 5.06745Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M4.33131 7.55633C3.84039 7.55633 3.44242 7.9543 3.44242 8.44522C3.44242 8.93614 3.84039 9.33411 4.33131 9.33411C4.82223 9.33411 5.22019 8.93614 5.22019 8.44522C5.22019 7.9543 4.82223 7.55633 4.33131 7.55633Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M3.44242 10.9341C3.44242 10.4432 3.84039 10.0452 4.33131 10.0452C4.82223 10.0452 5.22019 10.4432 5.22019 10.9341C5.22019 11.425 4.82223 11.823 4.33131 11.823C3.84039 11.823 3.44242 11.425 3.44242 10.9341Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M6.8202 5.06745C6.32928 5.06745 5.93131 5.46541 5.93131 5.95633C5.93131 6.44725 6.32928 6.84522 6.8202 6.84522C7.31112 6.84522 7.70908 6.44725 7.70908 5.95633C7.70908 5.46541 7.31112 5.06745 6.8202 5.06745Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M5.93131 8.44522C5.93131 7.9543 6.32928 7.55633 6.8202 7.55633C7.31112 7.55633 7.70908 7.9543 7.70908 8.44522C7.70908 8.93614 7.31112 9.33411 6.8202 9.33411C6.32928 9.33411 5.93131 8.93614 5.93131 8.44522Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M6.8202 10.0452C6.32928 10.0452 5.93131 10.4432 5.93131 10.9341C5.93131 11.425 6.32928 11.823 6.8202 11.823C7.31112 11.823 7.70908 11.425 7.70908 10.9341C7.70908 10.4432 7.31112 10.0452 6.8202 10.0452Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M5.33331 1.423C5.33331 1.07936 5.05473 0.800781 4.71109 0.800781C4.36744 0.800781 4.08886 1.07936 4.08886 1.423V1.86745H5.33331V1.423Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M4.08886 3.55634C4.08886 3.89998 4.36744 4.17856 4.71109 4.17856C5.05473 4.17856 5.33331 3.89998 5.33331 3.55634V2.84523H4.08886V3.55634Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M11.9111 1.423C11.9111 1.07936 11.6325 0.800781 11.2889 0.800781C10.9452 0.800781 10.6666 1.07936 10.6666 1.423V1.86745H11.9111V1.423Z"
              fill="black"
              fill-opacity="0.5"
            />
            <path
              d="M10.6666 3.55634C10.6666 3.89998 10.9452 4.17856 11.2889 4.17856C11.6325 4.17856 11.9111 3.89998 11.9111 3.55634V2.84523H10.6666V3.55634Z"
              fill="black"
              fill-opacity="0.5"
            />
          </svg>

        </span>
        <span class="cursor-default pl-1 font-roboto font-[400] text-[11px] text-[#4C4C4D]">
          {{ dateToLabelFormat(new Date(karma.creation_date)) }}</span>
      </span>
    </div>
    <div class="tag-label cursor-default p-1 py-1.5 font-roboto font-[400] text-[11px] text-[#4C4C4D] px-2 whitespace-nowrap flex items-center max-w-full">
      <div
        v-if="employees[karma.taskJson.uid_customer]"
        class="flex items-center "
      >
        <img
          :src="employees[karma.taskJson.uid_customer].fotolink"
          width="40"
          height="40"
          class="w-[22px] h-[22px] rounded-[5px] border border-black/10"
        >
        <p
          class="ml-1 text-[11px] leading-[14px] whitespace-nowrap"
        >
          {{ employees[karma.taskJson.uid_customer].name }}
        </p>
      </div>
      <div
        v-else
      >
        <p
          class="ml-1 text-[12px] leading-[14px] text-[#ffffff] whitespace-nowrap"
        >
          {{ karma.taskJson.email_customer }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    karma: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    employees () {
      return this.$store.state.employees.employees
    },
    customerName () {
      return this.employees[this.karma.taskJson.uid_customer].name ?? this.karma.taskJson.email_customer
    }
  },
  methods: {
    setTaskFromQueue (uid) {
      this.$router.push('/task/' + uid)
      this.$store.state.tasks.taskFromQueue = uid
    },
    dateToLabelFormat (calendarDate) {
      const day = calendarDate.getDate()
      const month = calendarDate.toLocaleString('default', { month: 'long' })
      const weekday = calendarDate.toLocaleString('default', { weekday: 'short' })
      return day + ' ' + month + ', ' + weekday
    }
  }
}
</script>
