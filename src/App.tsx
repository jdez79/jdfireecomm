import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/Home.tsx';
import Profile from './pages/Profile';
import { ProductProvider } from './context/ProductContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import Register from './pages/Register';
import LoginPage from './pages/Login';
import Logout from './pages/Logout';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const client = new QueryClient;

  return (
    <QueryClientProvider client={client}>
    <ProductProvider>
      <AuthProvider>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<Logout />} />
              </Routes>
      </AuthProvider>
    </ProductProvider>
  </QueryClientProvider>
  );
}

export default App;