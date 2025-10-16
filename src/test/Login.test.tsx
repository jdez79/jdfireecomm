import { renderWithProviders } from './utils';
import Login from '../pages/Login';
import { screen, fireEvent } from '@testing-library/react';

test('renders Login heading', () => {
  renderWithProviders(<Login />);
  expect(screen.getByRole('heading', { name: /^login$/i })).toBeInTheDocument();
});

test('email input updates on change', () => {
  renderWithProviders(<Login />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
  expect(emailInput).toHaveValue('user@example.com');
});
