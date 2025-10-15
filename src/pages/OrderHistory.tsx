import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from "../lib/Firebase/firebase";
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Container, Card, ListGroup, Badge, Button, Spinner, Alert } from 'react-bootstrap';

interface Order {
  id: string;
  items: any[];
  totalPrice: number;
  totalQuantity: number;
  createdAt: any;
  status: string;
  orderDate: string;
}

const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef, 
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const ordersData: Order[] = [];
      
      querySnapshot.forEach((doc) => {
        ordersData.push({
          id: doc.id,
          ...doc.data()
        } as Order);
      });

      setOrders(ordersData);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading your orders...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4">Order History</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {orders.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <h4>No Orders Yet</h4>
            <p className="text-muted">Start shopping to see your order history!</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Browse Products
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-12 mb-4">
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Order ID:</strong> {order.id}
                  </div>
                  <Badge bg={order.status === 'pending' ? 'warning' : 'success'}>
                    {order.status.toUpperCase()}
                  </Badge>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <small className="text-muted">
                      Placed on: {formatDate(order.orderDate)}
                    </small>
                  </div>
                  
                  <ListGroup variant="flush" className="mb-3">
                    {order.items.map((item, index) => (
                      <ListGroup.Item key={index} className="d-flex align-items-center">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                          className="me-3"
                        />
                        <div className="flex-grow-1">
                          <div className="fw-bold">{item.title}</div>
                          <small className="text-muted">
                            Quantity: {item.quantity} × ${item.price.toFixed(2)}
                          </small>
                        </div>
                        <div className="text-end">
                          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Total Items:</strong> {order.totalQuantity}
                    </div>
                    <div>
                      <strong className="text-success fs-5">
                        Total: ${order.totalPrice.toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default OrderHistory;