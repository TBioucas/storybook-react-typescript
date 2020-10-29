// src/components/InboxScreen.stories.js

import React from 'react';
import { Provider } from 'react-redux';
import PureInboxScreen, { PureInboxScreenProps } from './InboxScreen';
import { reducer } from '../lib/redux';
import { Meta, Story } from '@storybook/react/types-6-0';
import { createStore } from 'redux';

const store = createStore(reducer);

export default {
  component: PureInboxScreen,
  title: 'InboxScreen',
  decorators: [
    (Story): JSX.Element => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as Meta;

const Template: Story<PureInboxScreenProps> = (args) => (
  <PureInboxScreen {...args} />
);

export const Default = Template.bind({});

export const Error = Template.bind({});

Error.args = {
  error: 'Something',
};
