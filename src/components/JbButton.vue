<template>
  <component
    :is="is"
    :class="componentClass"
    :href="href"
    :type="computedType"
    :to="to"
    :target="target"
    :disabled="disabled"
  >
    <span
      v-if="label"
      :class="labelClass"
    >{{ label }}</span>
    <Icon
      v-if="icon !== 'google'"
      :path="icon"
      :box="'0 0 24 24'"
    />
    <svg
      v-if="icon == 'google'"
      width="22"
      height="22"
      fill="none"
      class="ml-[10px]"
      xmlns="http://www.w3.org/2000/svg"
    ><path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.56 11.25c0-.78-.07-1.53-.2-2.25H11v4.255h5.92a5.06 5.06 0 0 1-2.195 3.32v2.76h3.555c2.08-1.915 3.28-4.735 3.28-8.085Z"
      fill="#4285F4"
    /><path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.001 22c2.97 0 5.46-.986 7.28-2.666l-3.555-2.76c-.985.66-2.245 1.05-3.725 1.05-2.864 0-5.29-1.934-6.154-4.534H1.172v2.85a10.995 10.995 0 0 0 9.83 6.06Z"
      fill="#34A853"
    /><path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.845 13.088a6.611 6.611 0 0 1-.345-2.09c0-.725.125-1.43.345-2.09v-2.85H1.17A10.995 10.995 0 0 0 0 10.999c0 1.775.425 3.455 1.17 4.94l3.675-2.85Z"
      fill="#FBBC05"
    /><path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.001 4.375c1.615 0 3.065.555 4.205 1.645l3.155-3.155C16.456 1.09 13.966 0 11.001 0c-4.3 0-8.02 2.465-9.83 6.06l3.676 2.85c.865-2.6 3.29-4.535 6.154-4.535Z"
      fill="#EA4335"
    /></svg>
  </component>
</template>

<script>
import { getButtonColor } from '@/colors.js'
import Icon from '@/components/Icon.vue'

export default {
  components: {
    Icon
  },
  props: {
    label: {
      type: [String, Number],
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    href: {
      type: String,
      default: null
    },
    rounded: {
      type: String,
      default: 'rounded'
    },
    target: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    },
    type: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'white'
    },
    as: {
      type: String,
      default: null
    },
    small: Boolean,
    outline: Boolean,
    active: Boolean,
    disabled: Boolean
  },
  computed: {
    is () {
      if (this.as) {
        return this.as
      }

      if (this.to) {
        return 'router-link'
      }

      if (this.href) {
        return 'a'
      }

      return 'button'
    },
    computedType () {
      if (this.is === 'button') {
        return this.type ?? 'button'
      }

      return null
    },
    labelClass () {
      return this.small && this.icon ? 'px-0.5' : 'px-1'
    },
    componentClass () {
      const base = [
        'inline-flex',
        'cursor-pointer',
        'justify-center',
        'items-center',
        'whitespace-nowrap',
        'focus:outline-none',
        'transition-colors',
        'focus:ring',
        'duration-150',
        'py-2.5',
        'border',
        'rounded-lg',
        this.active ? 'ring ring-black dark:ring-white' : 'ring-blue-700',
        this.small ? 'p-1' : 'p-2',
        getButtonColor(this.color, this.outline, !this.disabled)
      ]

      if (this.disabled) {
        base.push(
          'cursor-not-allowed',
          this.outline ? 'opacity-50' : 'opacity-70'
        )
      }

      return base
    }
  }
}
</script>

<style scoped></style>
