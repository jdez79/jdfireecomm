import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MockAuthProvider } from './mocks/MockAuthProvider';
import { store } from '../store/store';

export function renderWithProviders(ui: ReactNode) {
  return render(
    <Provider store={store}>
      <MockAuthProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </MockAuthProvider>
    </Provider>
  );
}
