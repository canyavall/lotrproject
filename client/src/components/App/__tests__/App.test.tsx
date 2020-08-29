import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders all buttons', () => {
  const { getByText } = render(<App />);

  const northButton = getByText(/North/i);
  expect(northButton).toBeInTheDocument();

  const southButton = getByText(/South/i);
  expect(southButton).toBeInTheDocument();

  const eastButton = getByText(/East/i);
  expect(eastButton).toBeInTheDocument();

  const westButton = getByText(/West/i);
  expect(westButton).toBeInTheDocument();
});


