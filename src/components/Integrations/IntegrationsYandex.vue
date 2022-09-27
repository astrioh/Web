<template>
  <IntegrationsModalBoxYandex
    v-if="showIntegration"
    title="Интеграция с Яндекс.Почта"
    @cancel="changeShowIntegrationState(false)"
    @save="changeShowIntegrationState(false)"
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
        :class="{ 'bg-[#F5F5F5]': isScreenCorpo }"
        class="p-2 px-4 rounded-[5px] bg-[#FFFAFA] border-[1px] border-black"
        @click="changeCurrentScreen('corpo')"
      >
        Корпоративная
      </button>
      <button
        :class="{ 'bg-[#F5F5F5]': !isScreenCorpo }"
        class="ml-[10px] p-2 px-4 rounded-[5px] bg-[#FFFAFA] border-[1px] border-black"
        @click="changeCurrentScreen('personal')"
      >
        Персональная
      </button>
    </div>
    <div
      v-if="isScreenCorpo"
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
        class="mt-[10px] rounded-[10px] h-[40px] text-white bg-orange-300 "
        @click="changeShowIntegrationState(true)"
      >
        Интеграция
      </button>
    </div>
    <div
      v-if="!isScreenCorpo"
      class="flex w-[450px] justify-center flex-col"
    >
      <div class="flex items-center">
        <img
          class="h-[30px] w-[30px]"
          src="@/assets/images/yPochta.png"
        >
        <span class="ml-[10px] font-[500]">Персональная интеграция через Яндекс.Почта</span>
      </div>
      <button
        class="mt-[10px] rounded-[10px] h-[40px] text-white bg-orange-300 "
        @click="changeShowIntegrationState(true)"
      >
        Интеграция
      </button>
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
import IntegrationsModalBoxYandex from '@/components/Integrations/IntegrationsModalBoxYandex.vue'
import NavBar from '../Navbar/NavBar.vue'

export default {
  components: {
    NavBar,
    IntegrationsModalBoxYandex
  },
  data () {
    return {
      showIntegration: false,
      currentScreen: 'corpo'
    }
  },
  computed: {
    isScreenCorpo () {
      return this.currentScreen === 'corpo'
    }
  },
  methods: {
    changeShowIntegrationState (value) {
      this.showIntegration = value
    },
    changeCurrentScreen (screen) {
      this.currentScreen = screen
    }
  }
}
</script>
