<template>
  <select
    ref="selectedOption"
    v-model="selectedOption"
    class="form-control form-control-width-100 mt-[20px]"
    @change="selectOption"
  >
    <option
      value="clientchat"
      :selected="true"
    >
      Чат клиента
    </option>
    <option
      v-for="option in selectOptions"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script>

export default {
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  emits: ['selectCard', 'clearCardChat'],
  data () {
    return {
      timerId: 0,
      selectedOption: ''
    }
  },
  computed: {
    selectOptions () {
      return this.cards.map(card => ({
        value: card.uid,
        label: card.name
      }))
    }
  },
  methods: {
    selectOption () {
      if (this.$refs.selectedOption.value === 'clientchat') {
        this.$emit('clearCardChat')
      } else {
        this.$emit('selectCard', this.$refs.selectedOption.value)
      }
    }
  }
}
</script>
