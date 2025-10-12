import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity, 
  clearCart 
} from '../store/cartSlice';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/Firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Container, Row, Col, Card, Button, ListGroup, Badge, Alert, Spinner, Modal } from 'react-bootstrap';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalQuantity, totalPrice } = useAppSelector((state) => state.cart);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      setError('Please login to place an order');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const order = {
        userId: user.uid,
        userEmail: user.email,
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category
        })),
        totalQuantity,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        status: 'pending',
        createdAt: Timestamp.now(),
        orderDate: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'orders'), order);
      
      setSuccess(`Order placed successfully! Order ID: ${docRef.id}`);
      setShowModal(true);
      
      setTimeout(() => {
        dispatch(clearCart());
        setShowModal(false);
        navigate('/order-history');
      }, 3000);

    } catch (err: any) {
      console.error('Error placing order:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <div className="py-5">
          <h2 className="mb-4">Your Cart is Empty</h2>
          <p className="text-muted mb-4">Add some products to get started!</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Cart Items ({totalQuantity})</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {items.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col xs={3} md={2}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="img-fluid rounded"
                        style={{ maxHeight: '100px', objectFit: 'contain' }}
                      />
                    </Col>
                    <Col xs={9} md={4}>
                      <h6 className="mb-2">{item.title}</h6>
                      <Badge bg="secondary" className="mb-2">{item.category}</Badge>
                      <div className="text-success fw-bold">${item.price.toFixed(2)}</div>
                    </Col>
                    <Col xs={6} md={3} className="mt-3 mt-md-0">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline-secondary"
                          onClick={() => dispatch(decrementQuantity(item.id))}
                        >
                          -
                        </Button>
                        <span className="fw-bold px-3">{item.quantity}</span>
                        <Button 
                          size="sm" 
                          variant="outline-secondary"
                          onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col xs={6} md={3} className="mt-3 mt-md-0 text-end">
                      <div className="mb-2">
                        <strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <h4 className="mb-4">Order Summary</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({totalQuantity}):</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span className="text-success">FREE</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong className="fs-5">Total:</strong>
                <strong className="text-success fs-4">${totalPrice.toFixed(2)}</strong>
              </div>

              {!user && (
                <Alert variant="warning" className="small">
                  Please <Alert.Link href="/login">login</Alert.Link> to place an order
                </Alert>
              )}

              <Button 
                variant="primary" 
                className="w-100 mb-2"
                onClick={handlePlaceOrder}
                disabled={loading || !user}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
              
              <Button 
                variant="outline-secondary" 
                className="w-100 mb-2"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
              
              <Button 
                variant="outline-danger" 
                className="w-100"
                onClick={() => dispatch(clearCart())}
                disabled={loading}
              >
                Clear Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="mb-3">
            <svg 
              className="text-success" 
              width="64" 
              height="64" 
              fill="currentColor" 
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          </div>
          <p className="mb-0">Your order has been placed successfully!</p>
          <p className="text-muted">Redirecting to order history...</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Cart;