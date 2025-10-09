import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ProductProvider } from './context/ProductContext';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import ShoppingCart from './components/ShoppingCart';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <Router>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
          </Router>
        </ProductProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;