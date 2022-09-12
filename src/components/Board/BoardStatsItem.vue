<template>
  <div>
    {{ member.user_name }} - {{ cost }}
  </div>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    cost () {
      if (this.member.cost > 0) {
        const fractional = this.member.cost % 100
        const value = Math.floor(this.member.cost / 100)
        let valString = ''
        let valueString = value.toString()
        while (valueString) {
          valString = valueString.slice(-3) + ' ' + valString
          valueString = valueString.slice(0, -3)
        }
        valString = valString.trim()
        if (fractional > 0) {
          const frString = (fractional < 10 ? '0' : '') + fractional
          return `${valString}.${frString}`
        }
        return valString
      }
      return ''
    }
  }
}
</script>
