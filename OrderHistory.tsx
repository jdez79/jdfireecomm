import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Container, ListGroup, Spinner, Button, Alert } from 'react-bootstrap';

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    async function fetchOrders() {
      setLoading(true);
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user, navigate]);

  if (loading) return <Spinner />;
  return (
    <Container>
      <h2>Order History</h2>
      {orders.length === 0
        ? <Alert>No orders found!</Alert>
        : <ListGroup>
            {orders.map(order => (
              <ListGroup.Item
                key={order.id}
                action
                onClick={() => navigate(`/order-history/${order.id}`)}
              >
                <div>
                  <strong>ID:</strong> {order.id} <br />
                  <strong>Date:</strong> {order.orderDate && new Date(order.orderDate).toLocaleString()} <br />
                  <strong>Total:</strong> ${order.totalPrice?.toFixed(2)}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
      }
    </Container>
  );
};

export default OrderHistory;
