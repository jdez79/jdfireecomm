import { renderWithProviders } from './utils';
import Cart from '../pages/Cart';
import { screen } from '@testing-library/react';

test('shows empty cart message and Continue Shopping button', () => {
  renderWithProviders(<Cart />);
  expect(screen.getByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /continue shopping/i })).toBeInTheDocument();
});
