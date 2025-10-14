import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import type { Product } from "../types/types";
import { Card, Button, Toast, ToastContainer, Badge } from 'react-bootstrap';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowToast(true);
  };

  const handleImageError = () => {
    setImgError(true);
  };

  // Create star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} style={{ color: '#ffc107', fontSize: '18px' }}>★</span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} style={{ color: '#ffc107', fontSize: '18px' }}>⯨</span>
        );
      } else {
        stars.push(
          <span key={i} style={{ color: '#ddd', fontSize: '18px' }}>★</span>
        );
      }
    }
    return stars;
  };

  return (
    <>
      <Card style={{ width: '18rem' }} className="h-100 shadow-sm">
        <div className="p-3 d-flex justify-content-center" style={{ height: '200px' }}>
          <Card.Img 
            variant="top"
            src={imgError ? `https://via.placeholder.com/150?text=${encodeURIComponent(product.title)}` : product.image}
            alt={product.title}
            style={{ objectFit: 'contain', maxHeight: '100%', width: 'auto' }}
            onError={handleImageError}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate" title={product.title}>
            {product.title}
          </Card.Title>
          <Card.Text className="text-muted small">
            <Badge bg="secondary">{product.category}</Badge>
          </Card.Text>
          <Card.Text 
            className="flex-grow-1"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {product.description}
          </Card.Text>
          <div className="mb-2 d-flex align-items-center gap-1">
            <div className="d-flex">
              {product.rating && typeof product.rating.rate === 'number' ? renderStars(product.rating.rate) : null}
            </div>
            <small className="text-muted ms-1">
              {product.rating && typeof product.rating.rate === 'number'
                ? `${product.rating.rate.toFixed(1)} (${product.rating.count} reviews)`
                : 'No reviews'}
            </small>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <h5 className="text-success mb-0">
              Price: ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
            </h5>
            <Button 
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {product.title} added to cart!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ProductCard;
