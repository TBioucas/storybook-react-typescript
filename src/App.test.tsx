import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Taskbox title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Taskbox/i);
  expect(titleElement).toBeInTheDocument();
});
