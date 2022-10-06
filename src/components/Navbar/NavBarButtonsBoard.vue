<template>
  <div class="flex items-center gap-[10px]">
    <BoardModalBoxDelete
      v-if="showDeleteBoard"
      title="Удалить доску"
      :text="deleteMessage"
      @cancel="showDeleteBoard = false"
      @yes="onDeleteBoard"
    />
    <BoardModalBoxRename
      v-if="showAddBoard"
      :show="showAddBoard"
      title="Добавить доску"
      @cancel="showAddBoard = false"
      @save="onAddNewBoard"
    />
    <BoardModalBoxDelete
      v-if="showConfirmQuit"
      :show="showConfirmQuit"
      title="Покинуть доску"
      :text="quitBoardMessage"
      @cancel="showConfirmQuit = false"
      @yes="quitBoard"
    />
    <PopMenu>
      <NavBarButtonIcon
        icon="filter"
        :colored="isFilterSet"
      />
      <template #menu>
        <PopMenuItem
          :icon="showOnlyCardsWhereIAmResponsible ? 'check' : 'uncheck'"
          @click="clickBoardMyCards"
        >
          Ответственный я
        </PopMenuItem>
        <PopMenuItem
          :icon="showOnlyCardsWithNoResponsible ? 'check' : 'uncheck'"
          @click="clickBoardNoResponsibleCards"
        >
          Нет ответственного
        </PopMenuItem>
        <PopMenuItem
          :icon="showOnlyMyCreatedCards ? 'check' : 'uncheck'"
          @click="clickBoardMyCardsCreated"
        >
          Создатель я
        </PopMenuItem>
        <PopMenuDivider
          v-if="isFilterSet"
        />
        <PopMenuItem
          v-if="isFilterSet"
          icon="uncheck"
          @click="clickBoardFilterClear"
        >
          Сбросить
        </PopMenuItem>
      </template>
    </PopMenu>
    <PopMenu>
      <NavBarButtonIcon icon="menu" />
      <template #menu>
        <PopMenuItem
          icon="options"
          @click="clickEditBoard"
        >
          Свойства доски
        </PopMenuItem>
        <router-link :to="`/board/${selectedBoardUid}/stats`">
          <PopMenuItem
            icon="stat"
          >
            Статистика доски
          </PopMenuItem>
        </router-link>
        <router-link :to="`/board/${selectedBoardUid}/form_settings`">
          <PopMenuItem
            icon="board-form"
          >
            Форма сбора заявок
          </PopMenuItem>
        </router-link>
        <PopMenuItem
          v-if="canEditBoard"
          icon="create-subboard"
          @click="clickAddBoard"
        >
          Создать поддоску
        </PopMenuItem>
        <router-link :to="archiveLink">
          <PopMenuItem
            icon="archive"
          >
            {{ archiveText }}
          </PopMenuItem>
        </router-link>
        <PopMenuItem
          v-if="$store.state.boards.publicBoard === 0 && canEditBoard"
          @click="setPublicBoard"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.6335 21.6383C4.91717 21.6383 4.3335 21.0635 4.3335 20.356V7.67437C4.3335 6.96688 4.91717 6.39205 5.6335 6.39205H8.75526V5.48117C8.75526 5.17165 9.00288 4.92403 9.31241 4.92403H11.0369L11.0811 4.80906C11.3641 4.0043 12.1423 3.46484 13.0002 3.46484C13.858 3.46484 14.6362 4.0043 14.9192 4.80906L14.9634 4.92403H16.6879C16.9974 4.92403 17.2451 5.17165 17.2451 5.48117V6.39205H20.3668C21.0832 6.39205 21.6668 6.96688 21.6668 7.67437V20.356C21.6668 21.0635 21.0832 21.6383 20.3668 21.6383H5.6335ZM5.45663 20.5329H20.5525V7.4975H17.2451V8.40838C17.2451 8.71791 16.9974 8.96552 16.6879 8.96552H9.31241C9.00288 8.96552 8.75526 8.71791 8.75526 8.40838V7.4975H5.45663V20.5329ZM9.87839 7.85124H16.1308V6.03831H14.477C14.1675 6.03831 13.9199 5.79069 13.9199 5.48117C13.9199 4.97709 13.5131 4.57029 13.009 4.57029C12.5049 4.57029 12.0893 4.97709 12.0893 5.48117C12.0893 5.79069 11.8417 6.03831 11.5321 6.03831H9.87839V7.85124Z"
              fill="#606061"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.93311 12.7828C6.93311 12.4238 7.22412 12.1328 7.58311 12.1328H9.74977C10.1088 12.1328 10.3998 12.4238 10.3998 12.7828C10.3998 13.1418 10.1088 13.4328 9.74977 13.4328H7.58311C7.22412 13.4328 6.93311 13.1418 6.93311 12.7828ZM11.2664 12.7828C11.2664 12.4238 11.5575 12.1328 11.9164 12.1328H14.0831C14.4421 12.1328 14.7331 12.4238 14.7331 12.7828C14.7331 13.1418 14.4421 13.4328 14.0831 13.4328H11.9164C11.5575 13.4328 11.2664 13.1418 11.2664 12.7828ZM16.2498 12.1328C15.8908 12.1328 15.5998 12.4238 15.5998 12.7828C15.5998 13.1418 15.8908 13.4328 16.2498 13.4328H18.4164C18.7754 13.4328 19.0664 13.1418 19.0664 12.7828C19.0664 12.4238 18.7754 12.1328 18.4164 12.1328H16.2498Z"
              fill="#606061"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.58311 16.4648C7.22412 16.4648 6.93311 16.7559 6.93311 17.1148C6.93311 17.4738 7.22412 17.7648 7.58311 17.7648H9.74977C10.1088 17.7648 10.3998 17.4738 10.3998 17.1148C10.3998 16.7559 10.1088 16.4648 9.74977 16.4648H7.58311ZM11.9164 16.4648C11.5575 16.4648 11.2664 16.7559 11.2664 17.1148C11.2664 17.4738 11.5575 17.7648 11.9164 17.7648H14.0831C14.4421 17.7648 14.7331 17.4738 14.7331 17.1148C14.7331 16.7559 14.4421 16.4648 14.0831 16.4648H11.9164Z"
              fill="#606061"
            />
            <path
              d="M25.2667 19.6339C25.2667 20.8981 24.7645 22.1105 23.8706 23.0044C22.9767 23.8983 21.7643 24.4005 20.5001 24.4005C19.2359 24.4005 18.0234 23.8983 17.1295 23.0044C16.2356 22.1105 15.7334 20.8981 15.7334 19.6339C15.7334 18.3697 16.2356 17.1572 17.1295 16.2633C18.0234 15.3694 19.2359 14.8672 20.5001 14.8672C21.7643 14.8672 22.9767 15.3694 23.8706 16.2633C24.7645 17.1572 25.2667 18.3697 25.2667 19.6339Z"
              fill="#606061"
            />
            <path
              d="M20.9526 17.6701V16L22.6439 17.8163L24 19.2726L22.6198 20.5078L20.9526 22V20.3658C18.0255 20.1289 17 21.9479 17 21.9479C17 20.8146 17.087 19.6384 17.9166 18.7478C18.8811 17.7118 20.2778 17.6384 20.9526 17.6701Z"
              fill="white"
            />
          </svg>

          Сделать доску публичной
        </PopMenuItem>
        <PopMenuItem
          v-if="$store.state.boards.publicBoard === 1 && canEditBoard"
          @click="removePublicBoard"
        >
          Сделать доску приватной
        </PopMenuItem>
        <PopMenuItem
          v-if="$store.state.boards.publicBoard === 1"
          @click="copyPublicBoardLink"
        >
          Копировать ссылку на доску
        </PopMenuItem>
        <div
          v-if="canEditBoard"
          class="w-full h-[1px] bg-[rgba(0,0,0,.1)] my-[5px]"
        />
        <PopMenuItem
          v-if="canEditBoard"
          icon="delete"
          type="delete"
          @click="clickDeleteBoard"
        >
          Удалить доску
        </PopMenuItem>
        <PopMenuItem
          v-if="!canEditBoard"
          icon="delete"
          type="delete"
          @click="clickQuitBoard"
        >
          Покинуть доску
        </PopMenuItem>
      </template>
    </PopMenu>
  </div>
</template>

<script>
import NavBarButtonIcon from '@/components/Navbar/NavBarButtonIcon.vue'
import PopMenu from '@/components/Common/PopMenu.vue'
import PopMenuItem from '@/components/Common/PopMenuItem.vue'
import PopMenuDivider from '@/components/Common/PopMenuDivider.vue'
import BoardModalBoxDelete from '@/components/Board/BoardModalBoxDelete.vue'
import BoardModalBoxRename from '@/components/Board/BoardModalBoxRename.vue'

import * as BOARD from '@/store/actions/boards'
import * as CARD from '@/store/actions/cards'
import * as NAVIGATOR from '@/store/actions/navigator'

import { NAVIGATOR_REMOVE_BOARD } from '@/store/actions/navigator'

export default {
  components: {
    NavBarButtonIcon,
    PopMenu,
    PopMenuItem,
    PopMenuDivider,
    BoardModalBoxRename,
    BoardModalBoxDelete
  },
  props: {
    boardUid: {
      type: String,
      default: ''
    }
  },
  emits: ['popNavBar'],
  data () {
    return {
      showDeleteBoard: false,
      showBoardsLimit: false,
      showConfirmQuit: false,
      showAddBoard: false
    }
  },
  computed: {
    deleteMessage () {
      if (this.board.children.length !== 0) {
        return `Вы действительно хотите удалить доску ${this.selectedBoard.name}? \n\n Внимание! Все дочерние доски будут удалены.`
      }
      return `Вы действительно хотите удалить доску ${this.selectedBoard.name}?`
    },
    quitBoardMessage () {
      return `Вы действительно хотите покинуть доску ${this.selectedBoard.name}? Обратно можно попасть, только если владелец доски опять вас добавит.`
    },
    archiveLink () {
      if (this.$route.name === 'boardArchive') {
        return `/board/${this.selectedBoardUid}/`
      } else {
        return `/board/${this.selectedBoardUid}/archive`
      }
    },
    archiveText () {
      if (this.$route.name === 'boardArchive') {
        return 'Вернуться в доску'
      } else {
        return 'Архив'
      }
    },
    board () {
      return this.$store.state.boards.boards[this.boardUid]
    },
    canEditBoard () {
      return this.board?.email_creator === this.$store.state.user.user?.current_user_email
    },
    canAddChild () {
      const user = this.$store.state.user.user
      return this.board?.email_creator === user.current_user_email
    },
    showOnlyCardsWhereIAmResponsible () {
      return this.$store.state.boards.showOnlyCardsWhereIAmResponsible
    },
    showOnlyCardsWithNoResponsible () {
      return this.$store.state.boards.showOnlyCardsWithNoResponsible
    },
    showOnlyMyCreatedCards () {
      return this.$store.state.boards.showOnlyMyCreatedCards
    },
    selectedBoard () {
      return this.$store.state.boards.selectedBoard
    },
    currentLocation () {
      return window.location.origin
    },
    selectedBoardUid () {
      return this.selectedBoard?.uid || ''
    },
    isFilterSet () {
      return this.showOnlyMyCreatedCards || this.showOnlyCardsWhereIAmResponsible || this.showOnlyCardsWithNoResponsible
    }
  },
  mounted () {
    this.$store.state.boards.publicBoard = this.$store.state.boards.boards[this.boardUid].public_link_status
  },
  methods: {
    clickEditBoard () {
      if (!this.$store.state.isPropertiesMobileExpanded) {
        this.$store.dispatch('asidePropertiesToggle', true)
      }
      this.$store.commit('basic', { key: 'propertiesState', value: 'board' })
      this.$store.commit(BOARD.SELECT_BOARD, this.board)
      this.$store.commit(CARD.SELECT_CARD, '')
    },
    clickDeleteBoard () {
      this.showDeleteBoard = true
    },
    clickQuitBoard () {
      this.showConfirmQuit = true
    },
    clickAddBoard () {
      // если лицензия истекла
      if (Object.keys(this.$store.state.boards.boards).length >= 3 && this.$store.getters.isLicenseExpired) {
        this.showBoardsLimit = true
        return
      }
      this.showAddBoard = true
    },
    setPublicBoard () {
      const data = {
        uid: this.board.uid,
        public_link_status: 1
      }
      this.$store.dispatch(BOARD.PUBLIC_LINK_STATUS_BOARD_REQUEST, data)
    },
    removePublicBoard () {
      const data = {
        uid: this.board.uid,
        public_link_status: 0
      }
      this.$store.dispatch(BOARD.PUBLIC_LINK_STATUS_BOARD_REQUEST, data)
    },
    onAddNewBoard (name) {
      this.showAddBoard = false
      const title = name.trim()
      if (title) {
        // добавляем новую доску и переходим в неё
        const boardData = {
          name: title,
          parent: this.board.uid
        }
        this.$store.dispatch(BOARD.CREATE_BOARD_REQUEST, boardData).then((res) => {
          const board = res.data
          // заполняем недостающие параметры
          board.global_property_uid = '1b30b42c-b77e-40a4-9b43-a19991809add'
          board.color = '#A998B6'
          //
          this.$store.commit(BOARD.PUSH_BOARD, [board])
          this.$store.commit(NAVIGATOR.NAVIGATOR_PUSH_BOARD, [board])
          this.$router.push(`/board/${board.uid}`)
        })
      }
    },
    onDeleteBoard () {
      this.showDeleteBoard = false
      //
      this.$store.dispatch(BOARD.REMOVE_BOARD_REQUEST, this.boardUid)
        .then(() => {
          // надо отправлять сначала - иначе не сработает если доска удалена
          this.$emit('popNavBar')
          //
          this.$store.dispatch('asidePropertiesToggle', false)
          this.$store.commit(BOARD.SELECT_BOARD, undefined)
          //
          this.$store.commit(NAVIGATOR_REMOVE_BOARD, this.board)
          // для актуального значения количества досок
          this.$store.commit(BOARD.REMOVE_BOARD_REQUEST, this.boardUid)
        })
    },
    clickBoardMyCards () {
      this.$store.commit(BOARD.SHOW_BOARD_MY_CARDS_WHERE_IAM_RESPONSIBLE, !this.showOnlyCardsWhereIAmResponsible)
      this.$store.commit(BOARD.SHOW_BOARD_CARDS_WITH_NO_RESPONSIBLE, false)
      this.$store.commit(BOARD.SHOW_BOARD_MY_CREATED_CARDS, false)
    },
    clickBoardNoResponsibleCards () {
      this.$store.commit(BOARD.SHOW_BOARD_MY_CARDS_WHERE_IAM_RESPONSIBLE, false)
      this.$store.commit(BOARD.SHOW_BOARD_CARDS_WITH_NO_RESPONSIBLE, !this.showOnlyCardsWithNoResponsible)
      this.$store.commit(BOARD.SHOW_BOARD_MY_CREATED_CARDS, false)
    },
    clickBoardMyCardsCreated () {
      this.$store.commit(BOARD.SHOW_BOARD_MY_CARDS_WHERE_IAM_RESPONSIBLE, false)
      this.$store.commit(BOARD.SHOW_BOARD_CARDS_WITH_NO_RESPONSIBLE, false)
      this.$store.commit(BOARD.SHOW_BOARD_MY_CREATED_CARDS, !this.showOnlyMyCreatedCards)
    },
    clickBoardFilterClear () {
      this.$store.commit(BOARD.BOARD_CLEAR_FILTER)
    },
    copyPublicBoardLink () {
      navigator.clipboard.writeText(this.currentLocation + '/board/' + this.$route.params.board_id + '/public')
    },
    quitBoard () {
      this.showConfirmQuit = false

      this.$store.dispatch(BOARD.QUIT_BOARD_REQUEST, {
        uid: this.selectedBoardUid,
        uid_user: this.$store.state.user.user.current_user_uid
      })
        .then((resp) => {
          this.$store.dispatch('asidePropertiesToggle', false)
          this.$store.commit(NAVIGATOR_REMOVE_BOARD, this.selectedBoard)
          this.$store.commit(BOARD.REMOVE_BOARD_REQUEST, this.selectedBoard.uid)
          // выходим выше на один уровень навигации (надеемся что эта доска последняя в стеке)
          this.$router.push('/board')
        })
    }
  }
}
</script>

<style scoped>

</style>
