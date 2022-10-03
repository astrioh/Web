<template>
  <DoitnowContent>
    <div class="flex flex-col gap-[20px] overflow-x-hidden">
      <contenteditable
        v-model="title"
        v-linkify:options="{ className: 'text-blue-600 mx-[5px]', tagName: 'a' }"
        tag="div"
        class="ring-0 outline-none font-bold text-[18px] text-[#424242] break-words"
        style="word-break: break-word"
        :contenteditable="false"
        placeholder="Введите название карточки"
        :no-nl="false"
        :no-html="false"
      />
      <DoitnowPropsColumn class="empty:hidden">
        <DoitnowPropsColumnUser
          v-if="card?.user"
          key-title="Ответственный:"
          :value-email="card?.user"
        />
        <DoitnowPropsColumnItem
          v-if="remind"
          key-title="Дата:"
          :value-text="remind"
        />
      </DoitnowPropsColumn>
      <TaskPropsCommentEditor
        v-if="card?.comment"
        text-style="!text-[16px] leading-[155%]"
        style="word-break: break-word"
        :comment="card?.comment || ''"
        :can-edit="false"
      />
    </div>
    <template #buttons>
      <DoitnowRightButton
        title="Далее"
        icon="next"
        @click="onNext"
      />
    </template>
  </DoitnowContent>
</template>

<script>
import TaskPropsCommentEditor from '@/components/TaskProperties/TaskPropsCommentEditor.vue'
import DoitnowContent from '@/components/Doitnow/DoitnowContent.vue'
import DoitnowRightButton from '@/components/Doitnow/DoitnowRightButton.vue'
import DoitnowPropsColumn from '@/components/Doitnow/DoitnowPropsColumn.vue'
import DoitnowPropsColumnItem from '@/components/Doitnow/DoitnowPropsColumnItem.vue'
import DoitnowPropsColumnUser from '@/components/Doitnow/DoitnowPropsColumnUser.vue'
import contenteditable from 'vue-contenteditable'
import linkify from 'vue-linkify'

export default {
  components: {
    TaskPropsCommentEditor,
    DoitnowRightButton,
    DoitnowPropsColumn,
    DoitnowPropsColumnItem,
    DoitnowPropsColumnUser,
    DoitnowContent,
    contenteditable
  },
  directives: {
    linkify
  },
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['next'],
  data () {
    return {
      title: this.card.name || ''
    }
  },
  computed: {
    user () {
      const userEmail = this.card?.user?.toLowerCase() || ''
      return this.$store.state.employees.employeesByEmail[userEmail]
    },
    remind () {
      if (!this.card?.date_reminder) return ''
      //
      const calendarDate = new Date(this.card.date_reminder)
      const day = calendarDate.getDate()
      const month = calendarDate.toLocaleString('default', { month: 'short' })
      const hours = String(calendarDate.getHours()).padStart(2, '0')
      const minutes = String(calendarDate.getMinutes()).padStart(2, '0')
      const time = hours === '00' && minutes === '00' ? '' : `${hours}:${minutes}`
      return `${day} ${month} ${time}`
    }
  },
  methods: {
    onNext () {
      this.$emit('next')
    }
  }
}
</script>

<style scoped>
</style>
