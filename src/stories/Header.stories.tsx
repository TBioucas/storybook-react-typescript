import { Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Header, HeaderProps } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
};

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: true,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
