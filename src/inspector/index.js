import { getInspectorMessage, isKnownInspectorMessageType } from '@/inspector/message.js'
import { showNotify } from '@/store/helpers/functions'
import store from '@/store/index.js'
import { createTaskMessage } from '@/websync/task_message.js'
import { computed } from 'vue'

import * as TYPES from '@/websync/types.js'
import processCreate from '@/websync/create.js'
import processRemove from '@/websync/remove.js'
import processUpdate from '@/websync/update.js'

/**
 * @type {WebSocket | undefined}
 */
let socket
/**
 * @type {boolean}
 */
let isSocketForceClosed = false

const user = computed(() => store.state.user.user)

const employees = computed(() => store.state.employees.employees)

function isNotificationSoundOn () {
  return store?.state?.inspector?.is_notification_sound_on
}

function parseObject (obj) {
  switch (obj.operation) {
    case TYPES.TYPE_OBJECT_REGLAMENT:
      processCreate(obj)
      break
    case TYPES.TYPE_OPERATION_CREATE:
      processCreate(obj)
      break
    case TYPES.TYPE_OPERATION_REMOVE:
      processRemove(obj)
      break
    case TYPES.TYPE_OPERATION_UPDATE:
      processUpdate(obj)
      break
  }
}
export function initInspectorSocket (force = false) {
  if (socket && socket.readyState !== WebSocket.CLOSED && !force) return
  if (socket && socket.readyState !== WebSocket.CLOSED) socket.close()

  isSocketForceClosed = false
  socket = new WebSocket(process.env.VUE_APP_INSPECTOR_WS)
  socket.onopen = function () {
    const auth = {
      type: 'auth',
      message: user.value.current_user_uid,
      data: user.value.current_user_email,
      organization: user.value.owner_email,
      token: localStorage.getItem('user-token'),
      employee: JSON.stringify(employees.value[user.value.current_user_uid])
    }
    socket.send(JSON.stringify(auth))
  }
  socket.onmessage = function (event) {
    if (process.env.VUE_APP_EXTENDED_LOGS) console.log('inspector obj', event.data)
    parseMessage(event.data)
  }
  socket.onclose = function () {
    setTimeout(function () {
      !isSocketForceClosed && initInspectorSocket()
    }, 1000)
  }
  socket.onerror = function () {
    socket.close()
  }
}

function parseMessage (data) {
  try {
    const parsedData = { ...JSON.parse(data) }
    if (parsedData?.uid_json) {
      createNotificationAndInspectorMessage(parsedData)
    } else {
      parseObject(parsedData)
    }
  } catch (e) {
    console.log('parseMessage inspector error', e)
  }
}

function createNotificationAndInspectorMessage (parsedData) {
  if (!isKnownInspectorMessageType(parsedData.message)) {
    return
  }
  showNotify(
    {
      uid: parsedData?.uid_json,
      group: 'inspector',
      title: 'Инспектор',
      text: getInspectorMessage(parsedData.message, parsedData.task.taskJson),
      task: parsedData.task.taskJson
    },
    isNotificationSoundOn()
  )

  // Creating inspector message from notification
  parsedData.message_obj.uid_creator = 'inspector' // Let chat know it is message from inspector
  parsedData.message_obj.date_create = parsedData.message_obj.creation_date
  const message = {
    uid_task: parsedData.task.taskJson.uid,
    obj: parsedData.message_obj
  }
  createTaskMessage(message)
}

export function disconnectInspectorSocket () {
  isSocketForceClosed = true
  socket.close()
}
