<template>
  <Popper
    class="light overflow-hidden"
    :disabled="!canEdit"
  >
    <div
      class="rounded-[6px] text-[12px] px-[8px] py-[5px] font-[500]"
      :class="{ 'bg-[#7B94EB] text-white': !clientUid, 'bg-[#F4F5F7] text-[#575758]': clientUid, 'cursor-pointer': canEdit }"
    >
      <!-- Empty label for responsible user -->
      <div
        v-if="!clientUid"
        class="flex items-center"
      >
        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          class="mr-[7px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5631 7.94595C11.1349 7.56757 10.6352 7.18919 10.1356 6.96216C10.0642 6.96216 9.99287 6.88649 9.9215 6.88649C9.70737 6.88649 9.49325 7.03784 9.3505 7.26487C9.27912 7.41622 9.27912 7.64324 9.3505 7.7946C9.42187 7.94595 9.49325 8.0973 9.636 8.0973C10.0642 8.24865 10.4211 8.55135 10.778 8.85405C11.1349 9.23243 11.349 9.68649 11.349 10.2162V12.4108C11.349 12.6378 11.2062 12.7135 11.0635 12.7135H1.99887C1.78475 12.7135 1.71337 12.5622 1.71337 12.4108V10.2162C1.71337 9.68649 1.9275 9.23243 2.28437 8.85405C2.71262 8.47568 4.06875 7.49189 6.4955 7.49189C8.42262 7.49189 10.0642 5.82703 10.0642 3.78378C10.0642 1.74054 8.494 0 6.4955 0C4.56837 0 2.92675 1.66487 2.92675 3.70811C2.92675 4.76757 3.355 5.75135 4.06875 6.50811C2.64125 6.88649 1.78475 7.56757 1.42787 7.94595C0.856875 8.47568 0.5 9.30811 0.5 10.2162V12.4108C0.5 13.3189 1.21375 14 1.99887 14H10.9921C11.8486 14 12.491 13.2432 12.491 12.4108V10.2162C12.5624 9.30811 12.2055 8.47568 11.5631 7.94595ZM6.4955 6.20541C5.21075 6.20541 4.14012 5.07027 4.14012 3.70811C4.14012 2.34595 5.21075 1.21081 6.4955 1.21081C7.78025 1.21081 8.85087 2.34595 8.85087 3.70811C8.85087 5.07027 7.85162 6.20541 6.4955 6.20541Z"
            fill="white"
          />
        </svg>
        <span class="truncate">Клиент</span>
      </div>
      <!-- Show response user -->
      <div
        v-if="clientUid"
        class="flex items-center group"
      >
        <svg
          width="17"
          height="14"
          viewBox="0 0 13 14"
          :class="{'group-hover:hidden': canEdit }"
          fill="none"
          class="mr-[7px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5631 7.94595C11.1349 7.56757 10.6352 7.18919 10.1356 6.96216C10.0642 6.96216 9.99287 6.88649 9.9215 6.88649C9.70737 6.88649 9.49325 7.03784 9.3505 7.26487C9.27912 7.41622 9.27912 7.64324 9.3505 7.7946C9.42187 7.94595 9.49325 8.0973 9.636 8.0973C10.0642 8.24865 10.4211 8.55135 10.778 8.85405C11.1349 9.23243 11.349 9.68649 11.349 10.2162V12.4108C11.349 12.6378 11.2062 12.7135 11.0635 12.7135H1.99887C1.78475 12.7135 1.71337 12.5622 1.71337 12.4108V10.2162C1.71337 9.68649 1.9275 9.23243 2.28437 8.85405C2.71262 8.47568 4.06875 7.49189 6.4955 7.49189C8.42262 7.49189 10.0642 5.82703 10.0642 3.78378C10.0642 1.74054 8.494 0 6.4955 0C4.56837 0 2.92675 1.66487 2.92675 3.70811C2.92675 4.76757 3.355 5.75135 4.06875 6.50811C2.64125 6.88649 1.78475 7.56757 1.42787 7.94595C0.856875 8.47568 0.5 9.30811 0.5 10.2162V12.4108C0.5 13.3189 1.21375 14 1.99887 14H10.9921C11.8486 14 12.491 13.2432 12.491 12.4108V10.2162C12.5624 9.30811 12.2055 8.47568 11.5631 7.94595ZM6.4955 6.20541C5.21075 6.20541 4.14012 5.07027 4.14012 3.70811C4.14012 2.34595 5.21075 1.21081 6.4955 1.21081C7.78025 1.21081 8.85087 2.34595 8.85087 3.70811C8.85087 5.07027 7.85162 6.20541 6.4955 6.20541Z"
            fill="#7E7E80"
          />
        </svg>
        <div
          class="items-center justify-center p-[4.5px] mr-[4px] hidden"
          :class="{'group-hover:flex': canEdit }"
          @click.stop="$emit('changeClient', ['', ''])"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class=""
          >
            <path
              d="M6.17983 5.00341L9.76317 1.42841C9.92009 1.27149 10.0082 1.05866 10.0082 0.836743C10.0082 0.614825 9.92009 0.401996 9.76317 0.245076C9.60625 0.0881567 9.39342 0 9.1715 0C8.94958 0 8.73675 0.0881567 8.57983 0.245076L5.00483 3.82841L1.42983 0.245076C1.27291 0.0881567 1.06008 -1.65342e-09 0.838165 0C0.616247 1.65342e-09 0.403418 0.0881567 0.246499 0.245076C0.0895788 0.401996 0.00142217 0.614825 0.00142217 0.836743C0.00142217 1.05866 0.0895788 1.27149 0.246499 1.42841L3.82983 5.00341L0.246499 8.57841C0.168392 8.65588 0.106397 8.74805 0.0640893 8.8496C0.0217821 8.95115 0 9.06007 0 9.17008C0 9.28009 0.0217821 9.38901 0.0640893 9.49056C0.106397 9.59211 0.168392 9.68427 0.246499 9.76174C0.323968 9.83985 0.416135 9.90185 0.517685 9.94415C0.619234 9.98646 0.728156 10.0082 0.838165 10.0082C0.948175 10.0082 1.0571 9.98646 1.15865 9.94415C1.2602 9.90185 1.35236 9.83985 1.42983 9.76174L5.00483 6.17841L8.57983 9.76174C8.6573 9.83985 8.74947 9.90185 8.85102 9.94415C8.95257 9.98646 9.06149 10.0082 9.1715 10.0082C9.28151 10.0082 9.39043 9.98646 9.49198 9.94415C9.59353 9.90185 9.6857 9.83985 9.76317 9.76174C9.84127 9.68427 9.90327 9.59211 9.94558 9.49056C9.98788 9.38901 10.0097 9.28009 10.0097 9.17008C10.0097 9.06007 9.98788 8.95115 9.94558 8.8496C9.90327 8.74805 9.84127 8.65588 9.76317 8.57841L6.17983 5.00341Z"
              fill="#7E7E80"
            />
          </svg>
        </div>
        <span class="truncate">{{ clientName }}</span>
      </div>
    </div>
    <template
      #content="{ close }"
    >
      <div class="flex items-center justify-between w-[300px]">
        <NavBarSearch
          @search="searchClients"
          @eraseSearch="requestClients"
        />
        <svg
          v-if="clientsStatus === 'loading'"
          class="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-orange-400"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <div
        v-if="clientsStatus === 'success'"
        class="h-[156px] w-[300px] overflow-y-scroll scroll-style"
      >
        <div
          v-for="(client, index) in clients"
          :key="index"
        >
          <div
            class="flex items-center text-[#4C4C4D] font-[400] text-[13px] leading-[14px] px-[6px] py-[4px] hover:bg-[#F4F5F7] rounded-[6px] cursor-pointer"
            @click="$emit('changeClient', [client.uid, client.name]), close()"
          >
            <span class="truncate">{{ client.name }}</span>
          </div>
        </div>
      </div>
    </template>
  </Popper>
</template>

<script>
import * as CLIENTS from '@/store/actions/clients'
import Popper from 'vue3-popper'
import NavBarSearch from '@/components/Navbar/NavBarSearch.vue'

export default {
  components: {
    NavBarSearch,
    Popper
  },
  props: {
    clientUid: {
      type: String,
      default: ''
    },
    clientName: {
      type: String,
      default: ''
    },
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['changeClient'],
  computed: {
    user () {
      return this.$store.state.user.user
    },
    clients () {
      return this.$store.state.clients.clients
    },
    clientsStatus () {
      return this.$store.state.clients.status
    }
  },
  mounted () {
    this.requestClients()
  },
  methods: {
    requestClients () {
      const data = {
        organization: this.user?.owner_email,
        page: 0
      }
      this.$store.dispatch(CLIENTS.GET_CLIENTS, data)
    },
    searchClients (text) {
      const data = {
        organization: this.user?.owner_email,
        page: 0,
        search: text
      }
      this.$store.dispatch(CLIENTS.GET_CLIENTS, data)
    }
  }
}
</script>

<style scoped>
.light {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #444444;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 8px;
  --popper-theme-padding: 10px 10px;
  --popper-theme-box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1), 0px 3px 5px rgba(0, 0, 0, 0.12);
}
</style>
