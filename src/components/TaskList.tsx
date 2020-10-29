import React from 'react';
import Task from './Task';

import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
} from 'react-redux';
import {
  ArchiveActionTypes,
  archiveTask,
  pinTask,
  TaskI,
  TaskStateI,
} from '../lib/redux';
import { Dispatch } from 'redux';

interface OwnProps {}

interface ConnectedProps {
  loading?: boolean;
  tasks: TaskI[];
}

interface ConnectedDispatch {
  onPinTask: (id: string) => ArchiveActionTypes;
  onArchiveTask: (id: string) => ArchiveActionTypes;
}

export type Props = OwnProps & ConnectedDispatch & ConnectedProps;

export function PureTaskList(props: Props): JSX.Element {
  const { tasks, loading, onPinTask, onArchiveTask } = props;

  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (
    <div className='loading-item'>
      <span className='glow-checkbox' />
      <span className='glow-text'>
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className='list-items'>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className='list-items'>
        <div className='wrapper-message'>
          <span className='icon-check' />
          <div className='title-message'>You have no tasks</div>
          <div className='subtitle-message'>Sit back and relax</div>
        </div>
      </div>
    );
  }
  const tasksInOrder = [
    ...tasks.filter((t) => t.state === 'TASK_PINNED'),
    ...tasks.filter((t) => t.state !== 'TASK_PINNED'),
  ];
  return (
    <div className='list-items'>
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}

const mapDispatchToProps: MapDispatchToPropsParam<
  ConnectedDispatch,
  OwnProps
> = (dispatch: Dispatch) => ({
  onPinTask: (id: string): ArchiveActionTypes => dispatch(pinTask(id)),
  onArchiveTask: (id: string): ArchiveActionTypes => dispatch(archiveTask(id)),
});

const mapStateToPropsParam: MapStateToPropsParam<
  ConnectedProps,
  OwnProps,
  TaskStateI
> = (state: TaskStateI) => ({
  tasks: state.tasks.filter(
    (task: TaskI) => task.state === 'TASK_INBOX' || task.state === 'TASK_PINNED'
  ),
});

export default connect(mapStateToPropsParam, mapDispatchToProps)(PureTaskList);
