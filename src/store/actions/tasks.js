// Tasks requests
export const TASKS_REQUEST = 'TASKS_REQUEST'
export const SUBTASKS_REQUEST = 'SUBTASKS_REQUEST'
export const OPENED_TASKS_REQUEST = 'OPENED_TASKS_REQUEST'
export const UNSORTED_TASKS_REQUEST = 'UNSORTED_TASKS_REQUEST'
export const OVERDUE_TASKS_REQUEST = 'OVERDUE_TASKS_REQUEST'
export const UNREAD_TASKS_REQUEST = 'UNREAD_TASKS_REQUEST'
export const DOITNOW_TASKS_REQUEST = 'DOITNOW_TASKS_REQUEST'
export const IN_WORK_TASKS_REQUEST = 'IN_WORK_TASKS_REQUEST'
export const IN_FOCUS_TASKS_REQUEST = 'IN_FOCUS_TASKS_REQUEST'
export const READY_FOR_COMPLITION_TASKS_REQUEST =
  'READY_FOR_COMPLITION_TASKS_REQUEST'
export const DELEGATED_TASKS_REQUEST = 'DELEGATED_TASKS_REQUEST'
export const ACTION_GET_TASKS_DELEGATED_BY_ME = 'getTasksDelegateByMyToUserUid'
export const DELEGATED_TO_USER_TASKS_REQUEST = 'DELEGATED_TO_USER_TASKS_REQUEST'
export const ACTION_GET_TASK_DELEGATE_ME = 'getTasksDelegateMeByUserUid'
export const PROJECT_TASKS_REQUEST = 'PROJECT_TASKS_REQUEST'
export const TAG_TASKS_REQUEST = 'TAG_TASKS_REQUEST'
export const COLOR_TASKS_REQUEST = 'COLOR_TASKS_REQUEST'
export const EMPLOYEE_TASKS_REQUEST = 'EMPLOYEE_TASKS_REQUEST'
export const DATE_TASKS_REQUEST = 'DATE_TASKS_REQUEST'
export const ONE_TASK_REQUEST = 'ONE_TASK_REQUEST'
export const CHANGE_TASK_REDELEGATE = 'CHANGE_TASK_REDELEGATE'
export const DAYS_WITH_TASKS = 'DAYS_WITH_TASKS'
export const GET_TASK_CHILDRENS = 'GET_TASK_CHILDRENS'
// Tasks CRUD
export const CREATE_TASK = 'CREATE_TASK'
export const CHANGE_TASK_NAME = 'CHANGE_TASK_NAME'
export const CHANGE_TASK_COMMENT = 'CHANGE_TASK_COMMENT'
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
export const CHANGE_TASK_PERFORMER = 'CHANGE_TASK_PERFORMER'
export const CHANGE_TASK_COLOR = 'CHANGE_TASK_COLOR'
export const CHANGE_TASK_PROJECT = 'CHANGE_TASK_PROJECT'
export const CHANGE_TASK_CHECKLIST = 'CHANGE_TASK_CHECKLIST'
export const CHANGE_TASK_ACCESS = 'CHANGE_TASK_ACCESS'
export const QUIT_FROM_COMMON_TASK = 'QUIT_FROM_COMMON_TASK'
export const CHANGE_TASK_FOCUS = 'CHANGE_TASK_FOCUS'
export const CHANGE_TASK_READ = 'CHANGE_TASK_READ'
export const CHANGE_TASK_TAGS = 'CHANGE_TASK_TAGS'
export const CHANGE_TASK_DATE = 'CHANGE_TASK_DATE'
export const CHANGE_TASK_PARENT_AND_ORDER = 'CHANGE_TASK_PARENT_AND_ORDER'
export const REMOVE_TASK = 'REMOVE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const HAS_MSGS = 'HAS_MSGS'
export const ADD_TO_NEWTASKS = 'ADD_TO_NEWTASKS'
export const MSG_EQUAL = 'MSG_EQUAL'
// Tasks inner processes and events
export const TASKS_SUCCESS = 'TASKS_SUCCESS'
export const SUBTASKS_SUCCESS = 'SUBTASKS_SUCCESS'
export const TASKS_ERROR = 'TASKS_ERROR'
export const ADD_TO_LEAVES_TASKS_WITHOUT_CHILDREN =
  'ADD_TO_LEAVES_TASKS_WITHOUT_CHILDREN'

export const ADD_LOADED_TASK = 'ADD_LOADED_TASK'
export const CLEAN_UP_LOADED_TASKS = 'CLEAN_UP_LOADED_TASKS'

export const SELECT_TASK = 'SELECT_TASK'
export const SELECT_NEXT_TASK = 'SELECT_NEXT_TASK'
export const COPY_TASK = 'COPY_TASK'
export const RESET_COPY_TASK = 'RESET_COPY_TASK'
export const SEARCH_TASK = 'SEARCH_TASK'

export const ADD_TASK_TAGS = 'ADD_TASK_TAGS'
export const UPDATE_NEW_TASK_LIST = 'UPDATE_NEW_TASK_LIST'

export const RESET_STATE_TASKS = 'RESET_STATE_TASKS'

export const MARK_TASK_AS_READ = 'MARK_TASK_AS_READ'
export const ADD_TASK = 'ADD_TASK'
export const ADD_SUBTASK = 'ADD_SUBTASK'
export const PASTE_TO_SUBTASK = 'PASTE_TO_SUBTASK'
export const REMOVE_TASK_FROM_LEAVES = 'REMOVE_TASK_FROM_LEAVES'
export const REMOVE_TASK_FROM_ROOTS = 'REMOVE_TASK_FROM_ROOTS'
export const ADD_TASK_TO_ROOTS = 'ADD_TASK_TO_ROOTS'
export const ADD_TASK_TO_LEAVES = 'ADD_TASK_TO_LEAVES'
export const SELECT_TAG = 'SELECT_TAG'

// Tasks repeater
export const RESET_REPEAT_CHANGE = 'RESET_REPEAT_CHANGE'
export const EVERY_DAY_CHANGE = 'EVERY_DAY_CHANGE'
export const EVERY_WEEK_CHANGE = 'EVERY_WEEK_CHANGE'
export const EVERY_MONTH_CHANGE = 'EVERY_MONTH_CHANGE'
export const EVERY_YEAR_CHANGE = 'EVERY_YEAR_CHANGE'

// Tags
export const CREATE_TAG_REQUEST = 'CREATE_TAG_REQUEST'
export const PUSH_TAG = 'PUSH_TAG'
export const UPDATE_TAG_REQUEST = 'UPDATE_TAG_REQUEST'
export const REMOVE_TAG_REQUEST = 'REMOVE_TAG_REQUEST'

// Inspector
export const GET_INSPECTABLE_TASKS = 'GET_INSPECTABLE_TASKS'
