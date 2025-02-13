import store from '@/store/index.js'

const ORIGIN_MESSAGE_TYPE = 1
const IGNORE_MESSAGE_TYPE = 2
const OVERDUE_MESSAGE_TYPE = 3
const BETWEEN_MESSAGE_TYPE = 4
const CALL_MESSAGE_TYPE = 5
const PERFOMER_DOESNT_HAVE_PHONE_NUMBER_MESSAGE_TYPE = 511
const SMS_MESSAGE_TYPE = 6
const BEFORE_DEADLINE_MESSAGE_TYPE = 7
const AFTER_DEADLINE_MESSAGE_TYPE = 8
const INFO_MESSAGE_TYPE = 9

function dateToLabelFormat (calendarDate) {
  const day = calendarDate.getDate()
  const month = calendarDate.toLocaleString('default', { month: 'short' })
  return day + ' ' + month
}

function pad2 (n) {
  return (n < 10 ? '0' : '') + n
}

function dateToTimeFormat (date) {
  const hours = pad2(date.getHours())
  const seconds = pad2(date.getSeconds())
  return hours + ':' + seconds
}

export function isKnownInspectorMessageType (messageType) {
  return [1, 2, 3, 4, 5, 511, 6, 7, 8, 9].includes(messageType)
}

export function getInspectorMessage (type, task, payload = 'performer') {
  const currentUser = store?.state?.user?.user?.current_user_uid
  const customer = store?.state?.employees?.employees[task.uid_customer]
  const performer = store?.state?.employees?.employees[task.uid_performer]
  const customerName =
    customer?.name.length > 30
      ? customer?.name.substring(0, 30) + '...'
      : customer?.name ?? '[Удаленный сотрудник] '
  const performerName =
    performer?.name.length > 30
      ? performer?.name.substring(0, 30) + '...'
      : performer?.name ?? '[Удаленный сотрудник]'
  const performerPhone =
    store?.state?.employees?.employees[task.uid_performer]?.phone?.split(
      ' '
    )[0] ?? '[Неизвестный номер телефона]'

  const customerPhone =
    store?.state?.employees?.employees[task.uid_customer]?.phone?.split(
      ' '
    )[0] ?? '[Неизвестный номер телефона]'

  if (!task) {
    return '???'
  }

  // простите, когда будет рефакторинг, буду переделывать
  let textMessage

  switch (type) {
    case INFO_MESSAGE_TYPE:
      return (
        'Задача поручена: ' +
        performerName +
        ' ' +
        new Date(task.date_create).toLocaleString()
      )
    case ORIGIN_MESSAGE_TYPE:
      return (
        performerName +
        ', вы согласны со сроком? Все будет готово до ' +
        dateToLabelFormat(new Date(task.customer_date_end)) +
        '? И до ' +
        dateToTimeFormat(new Date(task.customer_date_end)) +
        ' завершите задачу?'
      )
    case IGNORE_MESSAGE_TYPE:
      return (
        performerName +
        ', вы не ответили после того как получили задачу от ' +
        customerName +
        '. Пожалуйста напишите вопросы если есть' +
        (currentUser === task.uid_customer ? '' : ', или нажмите: ')
      )
    case OVERDUE_MESSAGE_TYPE:
      return (
        performerName +
        ', вы просрочили задачу - напишите причину почему задача еще не выполнена и когда ожидать выполнения? А лучше свяжитесь с заказачиком и обсудите эту ситуацию'
      )
    case BETWEEN_MESSAGE_TYPE:
      return (
        performerName +
        ', как идут дела? Пожалуйста, приложите промежуточные результаты.'
      )
    case CALL_MESSAGE_TYPE:
      if (payload === 'performer') {
        textMessage = 'Я позвонил исполнителю на номер ' + performerPhone + '.'
      } else if (payload === 'customer') {
        textMessage =
          'Исполнитель игнорирует задачу более 24 часов, я позвонил Заказчику на номер ' +
          customerPhone +
          '.'
      }
      return textMessage
    case PERFOMER_DOESNT_HAVE_PHONE_NUMBER_MESSAGE_TYPE:
      return (
        'Я уже хотел связаться с ' +
        performerName +
        ', но в базе нет номера телефона исполнителя или номер в неверном формате. Пожалуйста, добавьте номер телефона исполнителя.'
      )
    case SMS_MESSAGE_TYPE:
      return 'Я отправил смс исполнителю на номер ' + performerPhone + '.'
    case BEFORE_DEADLINE_MESSAGE_TYPE:
      return (
        performerName +
        ', вы завершили задачу в срок и получаете +15 баллов к вашей карме.'
      )
    case AFTER_DEADLINE_MESSAGE_TYPE:
      return (
        performerName +
        ', вы просрочили задачу и ничего не написали даже после дедлайна, пожалуйста позвоните руководителю и обьясните причину. С вас снимается 15 баллов за такое грубое нарушение.'
      )
  }
}
