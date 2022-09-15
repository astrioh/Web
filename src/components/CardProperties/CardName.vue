<script>
// import Popper from 'vue3-popper'
import { isStringALink, isStringAnEmail, isStringAPhoneNumber } from '@/helpers/functions'

/**
 * TODO: сделать нормальный debounce на ввод текста
 * И вынести этот contenteditable в отдельный компонент
 */
export default {
  components: {
    // Popper
  },
  props: {
    cardName: {
      type: String,
      default: ''
    },
    canEdit: Boolean
  },
  emits: ['changeName'],
  data () {
    return {
      internalValue: this.cardName
    }
  },
  computed: {
    splitText () {
      // Убираем &nbsp (знак пробела) и разбиваем строку на слова
      return this.cardName.replaceAll(/(String.fromCharCode(160))/g, '').replaceAll(/\s+/g, ' ').split(/\s/)
    }
  },
  watch: {
    cardName (newCardName) {
      this.internalValue = ''
      this.internalValue = newCardName
    }
  },
  methods: {
    onNameInputHandler (event) {
      this.internalValue = event.target.innerText
    },
    isWordAClientCredential (word) {
      return isStringAnEmail(word) || isStringAPhoneNumber(word)
    },
    isWordALink (word) {
      // Проверяем на ссылку, но при этом не хотим считать емейлы ссылками
      return isStringALink(word) && !word.includes('@')
    },
    changeName () {
      this.$emit('changeName', this.internalValue)
    }
  }
}
</script>
<template>
  <div
    ref="cardName"
    class="text-[18px] font-[700] my-[25px] text-[#424242] min-h-[24px]"
    :contenteditable="canEdit"
    @input="onNameInputHandler($event)"
    @blur="changeName()"
  >
    <template
      v-for="(word, index) in splitText"
      :key="index"
    >
      <br v-if="word === '\n'">
      <a
        v-else-if="isWordALink(word)"
        :href="word"
        class="text-blue-600"
      >{{ word }}</a>
      <div
        v-else-if="isWordAClientCredential(word)"
        contentEditable="false"
        class="inline"
      >
        <span class="text-blue-600 underline">{{ word }}</span>
        <!-- <Popper>
          <span class="text-blue-600 underline">{{ word }}</span>

          <template #content>
            <router-link to="/clients">
              Создать клиента с этими данными
            </router-link>
          </template>
        </Popper> -->
      </div>
      <template v-else>
        {{ word }}
      </template>
      <template v-if="index !== cardName.split(' ').length - 1">
        {{ ' ' }}
      </template>
    </template>
  </div>
</template>
