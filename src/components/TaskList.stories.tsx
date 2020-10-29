import React from 'react';

import { PureTaskList, Props } from './TaskList';
import * as TaskStories from './Task.stories';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TaskI } from '../lib/redux';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';

export default {
  component: PureTaskList,
  title: 'TaskList',
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
  },
  decorators: [
    (story): StoryFnReactReturnType => (
      <div style={{ padding: '3rem' }}>{story()}</div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <PureTaskList {...args} />;

export const Default = Template.bind({});

Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited the Default story in task.stories.js.
  tasks: [
    { ...TaskStories.Default.args?.task, id: '1', title: 'Task 1' } as TaskI,
    { ...TaskStories.Default.args?.task, id: '2', title: 'Task 2' } as TaskI,
    { ...TaskStories.Default.args?.task, id: '3', title: 'Task 3' } as TaskI,
    { ...TaskStories.Default.args?.task, id: '4', title: 'Task 4' } as TaskI,
    { ...TaskStories.Default.args?.task, id: '5', title: 'Task 5' } as TaskI,
    { ...TaskStories.Default.args?.task, id: '6', title: 'Task 6' } as TaskI,
  ],
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [
    ...(Default.args.tasks as TaskI[])?.slice(0, 5),
    { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};
