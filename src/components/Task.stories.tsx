import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import { TaskI } from '../lib/redux';

import Task, { TaskProps } from './Task';

export default {
  component: Task,
  title: 'Task',
};

const Template: Story<TaskProps> = (args) => <Task {...args} />;

export const Default = Template.bind({});

Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
  },
};

export const Pinned = Template.bind({});

Pinned.args = {
  task: {
    ...(Default.args.task as TaskI),
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});

Archived.args = {
  task: {
    ...(Default.args.task as TaskI),
    state: 'TASK_ARCHIVED',
  },
};
