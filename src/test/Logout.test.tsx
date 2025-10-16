import { renderWithProviders } from './utils';
import Logout from '../pages/Logout';
import { screen } from '@testing-library/react';

test('renders Logout component', () => {
  renderWithProviders(<Logout />);
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});
