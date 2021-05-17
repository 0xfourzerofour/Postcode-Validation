//component test
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormDetail from './index';

const server = setupServer(
  // Describe the requests to mock.
  rest.get('/api/location', (req, res, ctx) => {
    const postCode = req.url.searchParams.get('postCode');
    const suburb = req.url.searchParams.get('suburb');
    const state = req.url.searchParams.get('state');

    if (postCode === '2103' && state === 'NSW') {
      return res(
        ctx.json({
          localities: {
            locality: {
              category: 'Delivery Area',
              id: 693,
              latitude: -33.67596443,
              location: 'MONA VALE',
              longitude: 151.3036278,
              postcode: 2103,
              state: 'NSW',
            },
          },
        })
      );
    }

    if (postCode === '2102' && state === 'NSW') {
      return res(
        ctx.json({
          localities: {
            locality: [
              {
                category: 'Delivery Area',
                id: 691,
                latitude: -33.68885235,
                location: 'WARRIEWOOD',
                longitude: 151.2955817,
                postcode: 2102,
                state: 'NSW',
              },
              {
                category: 'Delivery Area',
                id: 692,
                latitude: -32.8310013,
                location: 'WARRIEWOOD SHOPPING SQUARE',
                longitude: 150.1390075,
                postcode: 2102,
                state: 'NSW',
              },
            ],
          },
        })
      );
    }

    if (postCode === '2103' && state === 'QLD') {
      return res(
        ctx.json({
          localities: '',
        })
      );
    }
  })
);

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close();
});

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
