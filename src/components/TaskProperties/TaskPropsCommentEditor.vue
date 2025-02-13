<template>
  <div
    class="description-content"
    @click.stop="editComment"
  >
    <div
      id="taskPropsCommentEditor"
      v-linkify:options="{ className: 'text-blue-600' }"
      class="font-[400] text-[14px] leading-[21px] text-[#4C4C4D]"
      :class="textStyle"
      :contenteditable="isEditable"
      :data-placeholder="placeholderComment"
      @blur="changeComment($event)"
      @keydown.esc="onEsc"
      @paste="onPasteComment($event)"
      v-html="currHtmlText"
    />
  </div>
</template>

<script>
import linkify from 'vue-linkify'

export default {
  directives: {
    linkify
  },
  props: {
    canEdit: {
      type: Boolean,
      default: false
    },
    comment: {
      type: String,
      default: ''
    },
    textStyle: {
      type: String,
      default: ''
    }
  },
  emits: ['changeComment', 'onPasteFile'],
  data: () => ({
    isEditable: false,
    currHtmlText: '',
    onPaste_StripFormatting_IEPaste: false
  }),
  computed: {
    placeholderComment () {
      if (this.canEdit) return 'Добавить заметку...'
      return ''
    }

  },
  watch: {
    comment: {
      immediate: true,
      handler: function (val) {
        this.currHtmlText = val.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br/>')
      }
    }
  },
  methods: {
    scrollSelectionIntoView () {
      const selection = window.getSelection()
      if (!selection.rangeCount) {
        return
      }
      const firstRange = selection.getRangeAt(0)
      if (firstRange.commonAncestorContainer === document) {
        return
      }
      const tempAnchorEl = document.createElement('br')
      firstRange.insertNode(tempAnchorEl)
      tempAnchorEl.scrollIntoView({
        block: 'end'
      })
      tempAnchorEl.remove()
    },
    onPasteComment (e) {
      if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
        e.preventDefault()
        const text = e.originalEvent.clipboardData.getData('text/plain')
        window.document.execCommand('insertText', false, text)
      } else if (e.clipboardData && e.clipboardData.getData) {
        e.preventDefault()
        const text = e.clipboardData.getData('text/plain')
        window.document.execCommand('insertText', false, text)
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!this.onPaste_StripFormatting_IEPaste) {
          this.onPaste_StripFormatting_IEPaste = true
          e.preventDefault()
          window.document.execCommand('ms-pasteTextOnly', false)
        }
        this.onPaste_StripFormatting_IEPaste = false
      }
      // файлы
      const items = (e.clipboardData || e.originalEvent.clipboardData)?.items
      if (items) {
        for (const item of items) {
          if (item.kind === 'file') {
            this.$emit('onPasteFile', e)
            break
          }
        }
      }
      this.scrollSelectionIntoView()
    },
    /**
     * @param {Element} e
     * @returns {String}
     */
    editComment (e) {
      if (!this.canEdit) return
      if (this.isEditable) return
      this.isEditable = true
      // этот код ставит фокус в taskPropsCommentEditor
      // и перемещает курсор в конец текста (или туда куда нажали)
      this.$nextTick(function () {
        const commentEditor = document.getElementById('taskPropsCommentEditor')
        // ставим фокус
        commentEditor.focus({ preventScroll: false })
        // ставим курсор в конец
        const range = document.createRange()
        if (document.caretRangeFromPoint) {
          // если браузер позволяет - берем позицию
          // из положения курсора
          const caretPos = document.caretRangeFromPoint(e.clientX, e.clientY)
          range.setStart(caretPos.startContainer, caretPos.startOffset)
          range.setEnd(caretPos.startContainer, caretPos.startOffset)
        } else if (document.caretPositionFromPoint) {
          // если браузер позволяет - берем позицию
          // из положения курсора
          const caretPos = document.caretPositionFromPoint(e.clientX, e.clientY)
          range.setStart(caretPos.offsetNode, caretPos.offset)
          range.setEnd(caretPos.offsetNode, caretPos.offset)
        } else {
          // если нет - то ставим курсор в конец текста
          range.selectNodeContents(commentEditor)
          range.collapse(false)
        }
        const sel = document.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      })
    },
    /**
     * @param {Element} el
     * @returns {String}
     */
    getElementText (el) {
      // пытаемся достать текст из едита браузера
      // в котором сейчас идет ввод через Selection
      if (typeof window.getSelection !== 'undefined') {
        const sel = window.getSelection()
        let tempRange = null
        if (sel.rangeCount) tempRange = sel.getRangeAt(0)
        sel.removeAllRanges()
        const range = document.createRange()
        range.selectNodeContents(el)
        sel.addRange(range)
        const text = sel.toString()
        sel.removeAllRanges()
        if (tempRange) sel.addRange(tempRange)
        return text.trim()
      }
      return el.innerText.trim()
    },
    changeComment (e) {
      if (!this.canEdit) return
      // не следить за его изменениями - если он не редактируемый
      // (может ошибочно сюда попасть)
      if (!this.isEditable) return
      const text = this.getElementText(e.target)
      this.isEditable = false
      if (text === this.comment) return
      this.$emit('changeComment', text)
    },
    onEsc (e) {
      e.target.blur()
    }
  }
}
</script>

<style scoped>
.description-content {
  width: 100%;
  font-size: 14px;
  padding-right: 5px;
  min-height: 100px;
  display: inline-block;
}
.description-content div:empty:before {
  content: attr(data-placeholder);
  color: gray;
}
</style>
