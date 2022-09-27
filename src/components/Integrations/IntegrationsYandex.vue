<template>
  <IntegrationsModalBoxYandex
    v-if="showIntegration"
    title="Интеграция с Яндекс.Почта"
    @cancel="changeShowIntegrationState(false)"
    @onSave="emailIntegrate"
  />
  <ModalBoxDelete
    v-if="removeIntegrationModal"
    title="Разорвать интеграцию"
    :text="'Вы уверены, что хотите разорвать интеграцию?'"
    @cancel="showRemoveIntegration(false)"
    @yes="removeIntegration"
  />
  <NavBar
    class="pt-[8px]"
    title="Интеграции"
    route="/settings/integrations"
    :breadcrumbs="[{ name: 'Яндекс.Почта', selected: true }]"
  />
  <div class="w-full px-10 py-5 h-auto bg-white rounded-[8px]">
    <div class="py-3">
      <button
        class="p-2 px-4 rounded-[5px] bg-[#FFFAFA] border-[1px] border-black"
      >
        Корпоративная
      </button>
    </div>
    <div
      class="flex w-[450px] justify-center flex-col"
    >
      <div class="flex items-center">
        <img
          class="h-[30px] w-[30px]"
          src="@/assets/images/yPochta.png"
        >
        <span class="ml-[10px] font-[500]">Корпоративная интеграция через Яндекс.Почта</span>
      </div>
      <button
        v-if="!isOrganizationIntegrated"
        class="mt-[10px] rounded-[10px] h-[40px] text-white bg-orange-300"
        @click="changeShowIntegrationState(true)"
      >
        Интеграция
      </button>
      <div
        v-else
        class="flex flex-col"
      >
        <button
          class="mt-[10px] rounded-[10px] h-[40px] text-white bg-[#44944A]"
        >
          Уже интегрированно
        </button>
        <button
          class="mt-[10px] rounded-[10px] h-[40px] text-white bg-[#CD5C5C]"
          @click="showRemoveIntegration(true)"
        >
          Разорвать интеграцию
        </button>
      </div>
    </div>
    <article class="mt-[30px]">
      <p class="font-[500]">
        Инструкция по интеграции:
      </p>
      <p class="mt-[10px] font-[600] text-[18px]">
        Шаг 1. Настройте почтовый ящик
      </p>
      <p class="mt-[10px]">
        <ul class="list-inside list-decimal">
          <li>
            Откройте
            <a
              class="text-[#04b]"
              href="https://mail.yandex.ru/?dpda=yes#setup/client"
              target="_blank"
            >
              раздел «Почтовые программы»
            </a>
            в настройках Яндекс Почты.
          </li>
          <li>
            Выберите опции
            <span class="font-[500]">С сервера imap.yandex.ru по протоколу IMAP</span>
            и
            <span class="font-[500]">Пароли приложений и OAuth-токены.</span>
          </li>
          <li>
            Сохраните изменения.
          </li>
        </ul>
      </p>
      <p class="mt-[10px] font-[600] text-[18px]">
        Шаг 2. Создайте пароль приложения
      </p>
      <p class="mt-[10px]">
        <ul class="list-inside list-decimal">
          <li>
            Откройте страницу
            <a
              class="text-[#04b]"
              href="https://passport.yandex.ru/profile/"
              target="_blank"
            >
              Управление аккаунтом.
            </a>
          </li>
          <li>
            В разделе
            <span class="font-[500]">Пароли и авторизация</span>
            выберите
            <span class="font-[500]">Включить пароли приложений.</span>
            Подтвердите действие и нажмите
            <span class="font-[500]">Создать новый пароль.</span>
          </li>
          <li>
            Выберите тип приложения <span class="font-[500]">Почта.</span>
          </li>
          <li>
            Придумайте название пароля, например укажите название приложения, для которого вы создаете пароль. С этим названием пароль будет отображаться в списке.
          </li>
          <li>
            Нажмите кнопку Создать. Пароль приложения отобразится во всплывающем окне.
          </li>
        </ul>
      </p>
    </article>
  </div>
</template>
<script>
import * as YANDEX from '@/store/actions/yandexInt.js'

import IntegrationsModalBoxYandex from '@/components/Integrations/IntegrationsModalBoxYandex.vue'
import ModalBoxDelete from '@/components/Common/ModalBoxDelete.vue'
import NavBar from '../Navbar/NavBar.vue'

export default {
  components: {
    NavBar,
    IntegrationsModalBoxYandex,
    ModalBoxDelete
  },
  data () {
    return {
      showIntegration: false,
      currentScreen: 'corpo',
      removeIntegrationModal: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    },
    isOrganizationIntegrated () {
      return this.$store.state.integrations.integrations.yandex.isIntegrated
    }
  },
  mounted () {
    this.$store.dispatch(YANDEX.GET_ORGANIZATION_INTEGRATION, this.user.owner_email)
  },
  methods: {
    changeShowIntegrationState (value) {
      this.showIntegration = value
    },
    showRemoveIntegration (value) {
      this.removeIntegrationModal = value
    },
    emailIntegrate (login, password) {
      this.$store.dispatch(YANDEX.IMAP_GET_ORGANIZATION_MSGS_YANDEX_MAIL, {
        ya_login: login,
        ya_password: password,
        organization_email: this.user.owner_email
      }).then(() => {
        this.changeShowIntegrationState(false)
      })
    },
    removeIntegration () {
      this.$store.dispatch(YANDEX.YANDEX_REMOVE_EMAIL_INTEGRATION, this.user.owner_email)
        .then(() => {
          this.showRemoveIntegration(false)
        })
    }
  }
}
</script>
