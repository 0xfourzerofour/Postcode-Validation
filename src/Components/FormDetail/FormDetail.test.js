//component test
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormDetail from './index';

test('Button Disabled without input', async () => {
  render(<FormDetail />);

  await fireEvent.change(screen.getByPlaceholderText('Post Code'), {
    target: {
      value: '',
    },
  });

  await fireEvent.change(screen.getByPlaceholderText('Suburb'), {
    target: {
      value: '',
    },
  });

  await fireEvent.change(screen.getByTestId('select'), {
    target: { value: '' },
  });

  expect(screen.getByText(/Click Me/i).closest('button')).toBeDisabled();
});

test('Button Disabled with only postcode input', async () => {
  render(<FormDetail />);

  await fireEvent.change(screen.getByPlaceholderText('Post Code'), {
    target: {
      value: '2103',
    },
  });

  await fireEvent.change(screen.getByPlaceholderText('Suburb'), {
    target: {
      value: '',
    },
  });

  await fireEvent.change(screen.getByTestId('select'), {
    target: { value: '' },
  });

  expect(screen.getByText(/Click Me/i).closest('button')).toBeDisabled();
});

test('Button Disabled with only suburb input', async () => {
  render(<FormDetail />);

  await fireEvent.change(screen.getByPlaceholderText('Post Code'), {
    target: {
      value: '',
    },
  });

  await fireEvent.change(screen.getByPlaceholderText('Suburb'), {
    target: {
      value: 'Mona Vale',
    },
  });

  await fireEvent.change(screen.getByTestId('select'), {
    target: { value: '' },
  });

  expect(screen.getByText(/Click Me/i).closest('button')).toBeDisabled();
});

test('Button Disabled with only state input', async () => {
  render(<FormDetail />);

  await fireEvent.change(screen.getByPlaceholderText('Post Code'), {
    target: {
      value: '',
    },
  });

  await fireEvent.change(screen.getByPlaceholderText('Suburb'), {
    target: {
      value: '',
    },
  });

  await fireEvent.change(screen.getByTestId('select'), {
    target: { value: 'NSW' },
  });

  expect(screen.getByText(/Click Me/i).closest('button')).toBeDisabled();
});

test('Button Disabled with postcode of less than 4 digits', async () => {
  render(<FormDetail />);

  await fireEvent.change(screen.getByPlaceholderText('Post Code'), {
    target: {
      value: '210',
    },
  });

  await fireEvent.change(screen.getByPlaceholderText('Suburb'), {
    target: {
      value: 'Mona Vale',
    },
  });

  await fireEvent.change(screen.getByTestId('select'), {
    target: { value: 'NSW' },
  });

  expect(screen.getByText(/Click Me/i).closest('button')).toBeDisabled();
});

test('Button nnabled with correct input', async () => {
  render(<FormDetail />);

  await fireEvent.change(screen.getByPlaceholderText('Post Code'), {
    target: {
      value: '2103',
    },
  });

  await fireEvent.change(screen.getByPlaceholderText('Suburb'), {
    target: {
      value: 'Mona Vale',
    },
  });

  await fireEvent.change(screen.getByTestId('select'), {
    target: { value: 'NSW' },
  });

  expect(screen.getByText(/Click Me/i).closest('button')).not.toBeDisabled();
});

test('Test with correct input', async () => {
  render(<FormDetail />);

  await fireEvent.change(screen.getByPlaceholderText('Post Code'), {
    target: {
      value: '2103',
    },
  });

  await fireEvent.change(screen.getByPlaceholderText('Suburb'), {
    target: {
      value: 'Mona Vale',
    },
  });

  await fireEvent.change(screen.getByTestId('select'), {
    target: { value: 'NSW' },
  });

  await fireEvent.click(screen.getByText(/Click Me/i));

  expect(
    await screen.findByText(
      'Suburb Mona Vale with the postcode 2103 is a valid address in NSW'
    )
  ).toBeVisible();
});

test('Test with correct state and postcode, but incorrect suburb name', async () => {
  render(<FormDetail />);

  await fireEvent.change(screen.getByPlaceholderText('Post Code'), {
    target: {
      value: '2102',
    },
  });

  await fireEvent.change(screen.getByPlaceholderText('Suburb'), {
    target: {
      value: 'Mona Vale',
    },
  });

  await fireEvent.change(screen.getByTestId('select'), {
    target: { value: 'NSW' },
  });

  await fireEvent.click(screen.getByText(/Click Me/i));

  expect(
    await screen.findByText(
      '2102 is a valid postcode in NSW, however the suburb name does not match Mona Vale'
    )
  ).toBeVisible();
});

test('Test with incorrect state', async () => {
  render(<FormDetail />);

  await fireEvent.change(screen.getByPlaceholderText('Post Code'), {
    target: {
      value: '2103',
    },
  });

  await fireEvent.change(screen.getByPlaceholderText('Suburb'), {
    target: {
      value: 'Mona Vale',
    },
  });

  await fireEvent.change(screen.getByTestId('select'), {
    target: { value: 'QLD' },
  });

  await fireEvent.click(screen.getByText(/Click Me/i));

  expect(
    await screen.findByText(
      'Suburb Mona Vale with the postcode 2103 does not exist in QLD'
    )
  ).toBeVisible();
});
