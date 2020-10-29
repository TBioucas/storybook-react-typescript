import React, { FC } from 'react';
import { ArchiveActionTypes, TaskI } from '../lib/redux';

export interface TaskProps {
  task: TaskI;
  onPinTask: (id: string) => ArchiveActionTypes;
  onArchiveTask: (id: string) => ArchiveActionTypes;
}

const Task: FC<TaskProps> = ({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}) => {
  return (
    <div className={`list-item ${state}`}>
      <label className='checkbox'>
        <input
          type='checkbox'
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true}
          name='checked'
        />
        <span
          className='checkbox-custom'
          onClick={(): ArchiveActionTypes => onArchiveTask(id)}
          onKeyPress={(): ArchiveActionTypes => onArchiveTask(id)}
          role='button'
          tabIndex={0}
        />
      </label>
      <div className='title'>
        <input
          type='text'
          value={title}
          readOnly={true}
          placeholder='Input title'
        />
      </div>

      <div
        className='actions'
        onClick={(event): void => event.stopPropagation()}
        onKeyPress={(event): void => event.stopPropagation()}
        role='button'
        tabIndex={0}>
        {state !== 'TASK_ARCHIVED' && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            onClick={(): ArchiveActionTypes => onPinTask(id)}
            onKeyPress={(): ArchiveActionTypes => onPinTask(id)}
            role='link'
            tabIndex={0}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
};

export default Task;
