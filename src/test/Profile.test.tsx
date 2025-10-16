import { renderWithProviders } from './utils';
import Profile from '../pages/Profile';
import { screen } from '@testing-library/react';

test('renders Profile heading and form inputs', () => {
  renderWithProviders(<Profile />);
  expect(screen.getByRole('heading', { name: /^profile$/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /update profile/i })).toBeInTheDocument();
});
