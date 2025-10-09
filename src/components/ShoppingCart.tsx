import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { 
  selectCartItems, 
  selectCartTotal, 
  selectCartItemCount, 
  removeFromCart, 
  updateQuantity,
  clearCart 
} from '../store/cartSlice';
import { Container, Row, Col, Button, Card, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartItemCount = useSelector(selectCartItemCount);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    setShowCheckoutModal(true);
  };

  const handleCloseModal = () => {
    setShowCheckoutModal(false);
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info" className="text-center">
          <h4>Your cart is empty</h4>
          <p>Add some products to get started!</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Shopping Cart</h1>
      
      <Row>
        <Col md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="img-fluid"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/150?text=${encodeURIComponent(item.title)}`;
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <h5>{item.title}</h5>
                    <p className="text-muted">{item.category}</p>
                  </Col>
                  <Col md={2}>
                    <p className="mb-0">
                      <strong>${item.price.toFixed(2)}</strong>
                    </p>
                  </Col>
                  <Col md={2}>
                    <div className="d-flex align-items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline-secondary"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button 
                        size="sm" 
                        variant="outline-secondary"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col md={2} className="text-end">
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Body>
              <h4>Order Summary</h4>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Total Items:</span>
                <strong>{cartItemCount}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Total Price:</span>
                <strong className="text-success">${cartTotal.toFixed(2)}</strong>
              </div>
              <hr />
              <Button 
                variant="success" 
                className="w-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              <Button 
                variant="outline-secondary" 
                className="w-100 mt-2"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Checkout Success Modal */}
      <Modal show={showCheckoutModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="mb-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                fill="green" 
                className="bi bi-check-circle" 
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
            </div>
            <h5>Thank you for your purchase!</h5>
            <p>Your order has been placed successfully.</p>
            <p className="text-muted">Total: ${cartTotal.toFixed(2)}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Continue Shopping
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ShoppingCart;