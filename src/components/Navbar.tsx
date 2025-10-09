import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../store/cartSlice';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

const NavigationBar: React.FC = () => {
  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          E-Commerce Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Shopping Cart
              {cartItemCount > 0 && (
                <Badge bg="danger" className="ms-2">
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;