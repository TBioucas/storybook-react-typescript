import React from 'react';

import { Page, PageProps } from './Page';
import * as HeaderStories from './Header.stories';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Example/Page',
  component: Page,
};

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
