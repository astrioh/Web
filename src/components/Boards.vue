<template>
  <div class="w-full">
    <div class="flex items-center justify-between w-full">
      <NavBar
        class="w-full pt-[8px]"
        title="Доски"
      />
      <div
        class="flex flex-none px-[12px] pt-[8px]"
      >
        <icon
          :path="listView.path"
          :width="listView.width"
          :height="listView.height"
          :box="listView.viewBox"
          class="cursor-pointer hover:text-gray-800 mr-2"
          :class="{
            'text-gray-800': !isGridView,
            'text-gray-400': isGridView
          }"
          @click="updateGridView(false)"
        />
        <icon
          :path="gridView.path"
          :width="gridView.width"
          :height="gridView.height"
          :box="gridView.viewBox"
          class="cursor-pointer hover:text-gray-800 mr-2"
          :class="{
            'text-gray-800': isGridView,
            'text-gray-400': !isGridView
          }"
          @click="updateGridView(true)"
        />
      </div>
    </div>
    <div v-if="!displayModal">
      <BoardModalBoxBoardsLimit
        v-if="showBoardsLimit"
        @cancel="showBoardsLimit = false"
        @ok="showBoardsLimit = false"
      />
      <div class="flex flex-col gap-[15px]">
        <BoardChildrenGroup
          v-if="favoriteBoards.length"
          title="Избранные доски"
          :boards="favoriteBoards"
        />
        <BoardChildrenGroup
          v-for="dep in depBoards"
          :key="dep.uid"
          :title="dep.title"
          :boards="dep.boards"
        />
        <BoardChildrenGroup
          title="Мои доски"
          :boards="privateBoards"
        >
          <BoardInputValue
            v-if="showAddBoard && index == 0"
            :show="showAddBoard"
            class="h-[48px]"
            @cancel="showAddBoard = false"
            @save="onAddNewBoard"
          />
          <ListBlocAdd
            v-else-if="index == 0"
            @click.stop="clickAddBoard"
          />
        </BoardChildrenGroup>
        <BoardChildrenGroup
          v-if="commonBoards.length"
          title="Общие доски"
          :boards="commonBoards"
          @goto="closeMenu"
        />
      </div>
    </div>
    <div
      v-if="displayModal"
      class="flex flex-col justify-center items-center "
    >
      <img
        class="mx-auto mt-10"
        width="320"
        height="314"
        src="@/assets/images/boards.svg"
        alt="Empty task image"
      >
      <div class="w-[600px]">
        <p class="font-bold p-3">
          Визуализируйте цели, проекты и командную работу с помощью досок
        </p>
        <ul class="list-decimal pl-[30px]">
          <li class="p-3 text-sm">
            Мои доски - это ваши доски. Вы можете установить цвет для доски и добавить коллег с определенными правами, чтобы приступить к совместной работе
          </li>
          <li class="p-3 text-sm">
            Общие доски - доски, к которым вам дали доступ
          </li>
          <li class="p-3 text-sm">
            Участники доски видят все карточки в ней
          </li>
        </ul>
      </div>
      <OnBoardingButton
        @okToModal="okToModal"
      />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'
import { setLocalStorageItem } from '@/store/helpers/functions'
import BoardModalBoxBoardsLimit from '@/components/Board/BoardModalBoxBoardsLimit.vue'
import ListBlocAdd from '@/components/Common/ListBlocAdd.vue'
import * as BOARD from '@/store/actions/boards'
import * as NAVIGATOR from '@/store/actions/navigator'

import gridView from '@/icons/grid-view.js'
import listView from '@/icons/list-view.js'
import { USER_VIEWED_MODAL } from '@/store/actions/onboarding.js'
import BoardInputValue from './Board/BoardInputValue.vue'

import NavBar from '@/components/Navbar/NavBar.vue'
import OnBoardingButton from './onBoarding/onBoardingButton.vue'
import BoardChildrenGroup from './Board/BoardChildrenGroup.vue'

export default {
  components: {
    Icon,
    BoardModalBoxBoardsLimit,
    ListBlocAdd,
    BoardInputValue,
    NavBar,
    OnBoardingButton,
    BoardChildrenGroup
  },
  data () {
    return {
      showAddBoard: false,
      showBoardsLimit: false,
      gridView,
      listView
    }
  },
  computed: {
    isGridView () {
      return this.$store.state.isGridView
    },
    isPropertiesMobileExpanded () {
      return this.$store.state.isPropertiesMobileExpanded
    },
    displayModal () {
      return !this.$store.state.onboarding?.visitedModals?.includes('boards') && this.$store.state?.onboarding?.showModals
    },
    storeNavigator () {
      return this.$store.state.navigator.navigator
    },
    boards () {
      return this.$store.getters.sortedNavigator.new_private_boards
    },
    favoriteBoards () {
      const boards = Object.values(this.$store.state.boards.boards)
      const arrFavBoards = boards.filter(board => board.favorite === 1)
      arrFavBoards.sort((board1, board2) => { return board1.name.localeCompare(board2.name) })
      return arrFavBoards
    },
    privateBoards () {
      const boards = this.storeNavigator?.new_private_boards[0]?.items ?? []
      return boards.filter(board => this.depBoardsMap[board.uid] === undefined)
    },
    commonBoards () {
      const boards = this.storeNavigator?.new_private_boards[1]?.items ?? []
      return boards.filter(board => this.depBoardsMap[board.uid] === undefined)
    },
    depBoardsMap () {
      return this.depBoards.reduce((acc, dep) => {
        dep.boards.forEach(board => {
          acc[board.uid] = dep
        })
        return acc
      }, {})
    },
    depBoards () {
      const boards = Object.values(this.$store.state.boards.boards)
      const depsMap = boards.reduce((acc, board) => {
        Object.keys(board.deps).forEach(depUid => {
          if (acc[depUid] === undefined) acc[depUid] = []
          acc[depUid].push(board)
        })
        return acc
      }, {})
      const allDeps = this.$store.getters.sortedDepartments
      return allDeps.reduce((acc, dep) => {
        if (depsMap[dep.uid] && dep.name) {
          const depGroup = {
            uid: dep.uid,
            title: dep.name,
            boards: depsMap[dep.uid]
          }
          depGroup.boards.sort((board1, board2) => { return board1.name.localeCompare(board2.name) })
          acc.push(depGroup)
        }
        return acc
      }, [])
    }
  },
  methods: {
    print (val) {
      console.log(val)
    },
    updateGridView (value) {
      this.$store.commit('basic', { key: 'isGridView', value: value })
      setLocalStorageItem('isGridView', value)
    },
    gotoChildren (board) {
      this.$router.push(`/board/${board.uid}`)
    },
    clickAddBoard () {
      // если лицензия истекла
      if (Object.keys(this.$store.state.boards.boards).length >= 3 && this.$store.getters.isLicenseExpired) {
        this.showBoardsLimit = true
        return
      }
      this.showAddBoard = true
    },
    onAddNewBoard (name) {
      this.showAddBoard = false
      const title = name.trim()
      if (title) {
        // добавляем новую доску и переходим в неё
        const boardData = {
          name: title
        }

        this.$store.dispatch(BOARD.CREATE_BOARD_REQUEST, boardData).then((res) => {
          const board = res.data
          // заполняем недостающие параметры
          board.global_property_uid = '1b30b42c-b77e-40a4-9b43-a19991809add'
          board.color = '#A998B6'
          //
          this.$store.commit(BOARD.PUSH_BOARD, [board])
          this.$store.commit(NAVIGATOR.NAVIGATOR_PUSH_BOARD, [board])
          this.gotoChildren(board)
        })
      }
    },
    okToModal () {
      this.$store.commit(USER_VIEWED_MODAL, 'boards')
    }
  }
}
</script>

<style scoped></style>
