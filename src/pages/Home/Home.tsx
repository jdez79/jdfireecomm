import { useEffect, useState } from "react";
import type { Product } from "../../types/types";
import ProductCard from '../../components/ProductCard';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { collection, getDocs } from "Firebase/firestore";
import { db } from '../../lib/Firebase/firebase';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsCol = collection(db, "products");
        const productSnapshot = await getDocs(productsCol);
        const productsData = productSnapshot.docs.map(doc => ({ ...(doc.data() as Product), id: doc.id }));
        setProducts(productsData);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(productsData.map(p => p.category ?? '').filter(Boolean)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getFilteredProducts = (): Product[] => {
    if (selectedCategory) {
      return products.filter((product) => product.category === selectedCategory);
    }
    return products;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="mb-4">Product Catalog</h1>
          <div className="d-flex gap-3 align-items-center flex-wrap">
            <Form.Select
              style={{ width: '300px' }}
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              aria-label="Filter products by category"
            >
              <option value=''>All Categories</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </Form.Select>
            {selectedCategory && (
              <Button
                variant="outline-secondary"
                onClick={() => setSelectedCategory('')}
                aria-label="Clear category filter"
              >
                Clear Filter
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h3 className="mt-3">Loading products...</h3>
        </div>
      ) : filteredProducts.length > 0 ? (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredProducts.map((product: Product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center my-5" role="alert">
          <h3>No products found in this category</h3>
        </div>
      )}
    </Container>
  );
};

export default Home;
