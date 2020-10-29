// A simple redux store/actions/reducer implementation.
// A true app would be more complex and separated into different files.
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const ARCHIVE_TASK = 'ARCHIVE_TASK';
export const PIN_TASK = 'PIN_TASK';

export interface TaskI {
  id: string;
  title: string;
  state: string;
}

export interface ArchiveTaskAction {
  type: typeof ARCHIVE_TASK;
  payload: string;
}

export interface PinTaskAction {
  type: typeof PIN_TASK;
  payload: string;
}

export type ArchiveActionTypes = ArchiveTaskAction | PinTaskAction;

export function archiveTask(id: string): ArchiveActionTypes {
  return {
    type: ARCHIVE_TASK,
    payload: id,
  };
}

export function pinTask(id: string): ArchiveActionTypes {
  return {
    type: PIN_TASK,
    payload: id,
  };
}

// All our reducers simply change the state of a single task.
const taskStateReducer = (taskState: string) => {
  return (state: TaskStateI, action: ArchiveActionTypes): TaskStateI => {
    return {
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.payload ? { ...task, state: taskState } : task
      ),
    };
  };
};

export interface TaskStateI {
  tasks: TaskI[];
  error?: boolean;
}

const initialState: TaskStateI = {
  tasks: [],
};

// The reducer describes how the contents of the store change for each action
export const reducer = (
  state = initialState,
  action: ArchiveActionTypes
): TaskStateI => {
  switch (action.type) {
    case ARCHIVE_TASK:
      return taskStateReducer('TASK_ARCHIVED')(state, action);
    case PIN_TASK:
      return taskStateReducer('TASK_PINNED')(state, action);
    default:
      return state;
  }
};

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks: TaskI[] = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

// We export the constructed redux store
const store = createStore(
  reducer,
  { tasks: defaultTasks },
  composeWithDevTools(applyMiddleware())
);

export default store;
