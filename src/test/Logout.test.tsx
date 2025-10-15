import { render } from '@testing-library/react';
import Logout from '../pages/Logout';

test('matches snapshot', () => {
  const { asFragment } = render(<Logout />);
  expect(asFragment()).toMatchSnapshot();
});
