<template>
  <ModalBoxAddClient
    v-if="showAddClient"
    title="Добавить клиента"
    :card-email="cardEmail"
    :card-phone="cardPhone"
    @cancel="showAddClient = false"
    @save="onAddNewClient"
  />
  <Popper
    class="light overflow-hidden"
    :disabled="!canEdit"
    @open:popper="onShowClients"
  >
    <div
      class="text-[12px] py-[5px] font-[500] bg-[#F4F5F7] text-[#575758]"
      :class="{ 'cursor-pointer': canEdit, 'flex items-center hover:bg-[#0000000a] h-[40px] px-[20px] rounded-[8px]': isQueue, 'px-[8px] rounded-[6px]': !isQueue }"
    >
      <!-- Empty label for responsible user -->
      <div
        v-if="!isClientSet"
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
            fill="currentColor"
          />
        </svg>
        <span class="truncate">Контакт</span>
      </div>
      <div
        v-else
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
        <CardClientSearch
          @search="searchClients"
          @eraseSearch="requestClients"
        />
      </div>
      <div
        class="h-[156px] w-[300px] overflow-y-scroll scroll-style relative"
      >
        <svg
          v-if="clientsStatus === 'loading'"
          class="m-auto w-[20px] h-[20px] text-gray-200 animate-spin dark:text-gray-600 fill-orange-400"
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
        <div
          v-else
        >
          <template
            v-if="!clients.length"
          >
            <div class="text-[#7e7e80] text-[13px] text-center leading-[14px] px-[36px] py-[12px] break-word">
              {{ searchResult }}
            </div>
          </template>
          <template
            v-for="(client, index) in clients"
            v-else
            :key="index"
          >
            <div
              class="flex items-center px-[6px] py-[4px] hover:bg-[#F4F5F7] rounded-[6px] cursor-pointer"
              @click="$emit('changeClient', [client.uid, client.name]), close()"
            >
              <svg
                class="flex-none mr-[5px]"
                width="24"
                height="24"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="22"
                  height="22"
                  rx="7"
                  fill="black"
                  fill-opacity="0.1"
                />
                <path
                  d="M4.58504 17.3313C4.58552 17.3669 4.59281 17.402 4.6065 17.4347C4.62019 17.4674 4.64 17.4969 4.66481 17.5218C4.68961 17.5466 4.71893 17.5661 4.75107 17.5792C4.78322 17.5924 4.81757 17.5989 4.85217 17.5984H17.1473C17.1819 17.599 17.2163 17.5925 17.2485 17.5794C17.2807 17.5662 17.31 17.5467 17.3349 17.5219C17.3597 17.4971 17.3795 17.4675 17.3933 17.4348C17.407 17.4021 17.4143 17.3669 17.4148 17.3313V17.0124C17.4208 16.9162 17.4333 16.4368 17.126 15.9064C16.9322 15.5719 16.6508 15.2832 16.2898 15.0477C15.8532 14.7628 15.2976 14.5568 14.6256 14.4328C14.2844 14.3835 13.946 14.3157 13.6118 14.23C12.7229 13.9965 12.6452 13.7899 12.6446 13.7878C12.6394 13.7674 12.6319 13.7477 12.6223 13.7291C12.6148 13.6909 12.5969 13.5457 12.6314 13.157C12.7185 12.1694 13.2335 11.5858 13.6472 11.1169C13.7776 10.9692 13.9009 10.8292 13.9957 10.6924C14.4054 10.1018 14.4432 9.42969 14.4449 9.388C14.4465 9.31414 14.4365 9.2405 14.4155 9.16985C14.375 9.04133 14.2997 8.96143 14.2443 8.90238C14.2312 8.88886 14.2185 8.87496 14.2061 8.8607C14.2021 8.85583 14.1913 8.84263 14.2011 8.77629C14.2342 8.56255 14.2571 8.34727 14.2696 8.13122C14.2885 7.78316 14.3031 7.2628 14.2156 6.75599C14.2028 6.65919 14.1833 6.56343 14.1575 6.46941C14.0653 6.12065 13.9174 5.82261 13.7117 5.57667C13.6763 5.53673 12.8158 4.60404 10.3177 4.41299C9.97223 4.38659 9.63081 4.40083 9.29444 4.41855C9.19497 4.42082 9.09597 4.43339 8.99894 4.45606C8.74093 4.52449 8.67204 4.69262 8.65414 4.78676C8.62408 4.94307 8.67677 5.06396 8.71155 5.14455C8.71662 5.15601 8.72303 5.17025 8.71189 5.20777C8.65414 5.30017 8.56262 5.38354 8.46975 5.46239C8.44273 5.48566 7.81661 6.04145 7.78217 6.76711C7.68929 7.31907 7.69605 8.17881 7.80581 8.77316C7.81256 8.80616 7.82168 8.85479 7.80648 8.88779C7.68828 8.99652 7.55455 9.11983 7.55488 9.4012C7.55624 9.42969 7.5944 10.1015 8.00404 10.6924C8.0986 10.8292 8.22187 10.9689 8.35189 11.1165L8.35256 11.1169C8.76626 11.5858 9.28127 12.1694 9.3684 13.1566C9.40251 13.5457 9.38461 13.6905 9.37752 13.7291C9.36772 13.7476 9.36012 13.7673 9.35489 13.7878C9.35456 13.7899 9.27722 13.9958 8.39241 14.2289C7.88179 14.3634 7.37927 14.4321 7.36408 14.4339C6.71094 14.5475 6.15878 14.7486 5.72279 15.0317C5.36313 15.2655 5.08114 15.5552 4.88526 15.8921C4.57186 16.4306 4.58031 16.921 4.5847 17.0107V17.3313H4.58504Z"
                  fill="black"
                  fill-opacity="0.65"
                />
              </svg>
              <div class="my-[4px]">
                <div class="text-[#4C4C4D] text-[13px] leading-[14px] truncate">
                  {{ client.name }}
                </div>
                <div
                  v-if="client.phone || client.email"
                  class="text-[#7e7e80] text-[11px] leading-[12px] truncate"
                >
                  {{ `${client.phone} ${client.email ? ' <' + client.email + '>' : ''}` }}
                </div>
              </div>
            </div>
          </template>
          <div
            v-if="!searchText && (cardPhone || cardEmail)"
            class="flex items-center px-[6px] py-[4px] hover:bg-[#F4F5F7] rounded-[6px] cursor-pointer"
            @click="showModalAddClient"
          >
            <svg
              class="flex-none mr-[5px]"
              width="24"
              height="24"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="22"
                height="22"
                rx="7"
                fill="black"
                fill-opacity="0.1"
              />
              <symbol
                id="plus"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.66824 7.3379L8.67295 3.28854C8.67295 3.111 8.60243 2.94074 8.47689 2.8152C8.35135 2.68967 8.18109 2.61914 8.00356 2.61914C7.82602 2.61914 7.65576 2.68967 7.53022 2.8152C7.40469 2.94074 7.33416 3.111 7.33416 3.28853L7.33888 7.3379L3.28951 7.33319C3.11198 7.33319 2.94171 7.40371 2.81618 7.52925C2.69064 7.65478 2.62012 7.82505 2.62012 8.00258C2.62012 8.18011 2.69064 8.35038 2.81618 8.47591C2.94171 8.60145 3.11198 8.67197 3.28951 8.67197L7.33888 8.66726L7.33416 12.7166C7.3338 12.8046 7.35087 12.8918 7.38438 12.9732C7.41789 13.0546 7.46719 13.1285 7.52942 13.1908C7.59165 13.253 7.66559 13.3023 7.74696 13.3358C7.82834 13.3693 7.91555 13.3864 8.00356 13.386C8.09156 13.3864 8.17877 13.3693 8.26015 13.3358C8.34153 13.3023 8.41546 13.253 8.47769 13.1908C8.53993 13.1285 8.58922 13.0546 8.62273 12.9732C8.65624 12.8918 8.67331 12.8046 8.67295 12.7166L8.66824 8.66726L12.7176 8.67197C12.8056 8.67233 12.8928 8.65527 12.9742 8.62176C13.0556 8.58824 13.1295 8.53895 13.1917 8.47672C13.254 8.41449 13.3033 8.34055 13.3368 8.25917C13.3703 8.17779 13.3874 8.09059 13.387 8.00258C13.3874 7.91457 13.3703 7.82736 13.3368 7.74599C13.3033 7.66461 13.254 7.59067 13.1917 7.52844C13.1295 7.46621 13.0556 7.41692 12.9742 7.3834C12.8928 7.34989 12.8056 7.33283 12.7176 7.33319L8.66824 7.3379Z"
                  fill="black"
                  fill-opacity="0.65"
                />
              </symbol>
              <use
                xlink:href="#plus"
                x="3"
                y="3"
                width="16"
                height="16"
              />

            </svg>
            <div class="my-[4px]">
              <div class="text-[#7e7e80] text-[13px] leading-[14px] truncate">
                Добавить новый контакт
              </div>
              <div
                class="text-[#7e7e80] text-[11px] leading-[12px] truncate"
              >
                {{ `${cardPhone} ${cardEmail ? ' <' + cardEmail + '>' : ''}` }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Popper>
</template>

<script>
import * as CLIENTS from '@/store/actions/clients'
import Popper from 'vue3-popper'
import CardClientSearch from '@/components/CardProperties/CardClientSearch.vue'
import ModalBoxAddClient from '@/components/Clients/ModalBoxAddClient.vue'

export default {
  components: {
    CardClientSearch,
    ModalBoxAddClient,
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
    cardName: {
      type: String,
      default: ''
    },
    cardComment: {
      type: String,
      default: ''
    },
    canEdit: {
      type: Boolean,
      default: false
    },
    isQueue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['changeClient'],
  data () {
    return {
      showAddClient: false,
      searchResult: '',
      searchText: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    },
    clients () {
      return this.$store.state.clients.clients
    },
    clientsStatus () {
      return this.$store.state.clients.status
    },
    isClientSet () {
      return this.clientUid && this.clientUid !== '00000000-0000-0000-0000-000000000000'
    },
    cardEmail () {
      return this.checkIfEmailInString(this.cardName) || this.checkIfEmailInString(this.cardComment)
    },
    cardPhone () {
      return this.checkIfPhoneInString(this.cardName) || this.checkIfPhoneInString(this.cardComment)
    }
  },
  methods: {
    onShowClients () {
      this.requestClients()
    },
    requestClients () {
      if (this.cardEmail) {
        this.searchClients(this.cardEmail)
      } else if (this.cardPhone) {
        this.searchClients(this.cardPhone)
      } else {
        this.$store.commit(CLIENTS.SET_CLIENTS, [])
      }
      this.searchText = ''
      this.searchResult = 'Найдите контакт по имени, email или номеру телефона'
    },
    searchClients (text) {
      const data = {
        organization: this.user?.owner_email,
        page: 1,
        search: text
      }
      this.$store.dispatch(CLIENTS.GET_CLIENTS, data)
      this.searchText = text
      this.searchResult = 'Контакт не найден'
    },
    checkIfEmailInString (text) {
      const regex = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
      return regex.exec(text) ? regex.exec(text)[0] : ''
    },
    checkIfPhoneInString (text) {
      const regex = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g
      const exected = regex.exec(text)
      return exected ? exected[0] : ''
    },
    showModalAddClient () {
      this.showAddClient = true
    },
    async onAddNewClient (client) {
      this.showAddClient = false
      const clientToSend = {
        uid: client.uid,
        organization: this.user?.owner_email,
        name: client.name,
        email: client.email,
        phone: client.phone,
        comment: client.comment,
        date_create: client.date_create
      }
      await this.$store.dispatch(CLIENTS.ADD_NEW_CLIENT, clientToSend)
      await this.$emit('changeClient', [clientToSend.uid, clientToSend.name])
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
