//component test
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  queryAllByPlaceholderText,
  queryByPlaceholderText,
  getByText,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormDetail from './index';

test('loads and displays greeting', async () => {
  render(<FormDetail />);

  await userEvent.type(screen.getByPlaceholderText('Post Code'), '2103');
  await userEvent.type(screen.getByPlaceholderText('Suburb'), 'Mona Vale');
  await userEvent.selectOptions(getByText('NSW'), 'NSW');

  expect(
    await screen.findByText('Suburb Matches postcode')
  ).toBeInTheDocument();
});
