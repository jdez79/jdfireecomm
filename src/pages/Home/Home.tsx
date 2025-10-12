import { useEffect } from "react";
import type { Product } from "../../types/types";
import ProductCard from '../../components/ProductCard';
import { useProductContext } from "../../context/ProductContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../../api/api";
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

const Home: React.FC = () => {
  const { products, selectedCategory, dispatch } = useProductContext();

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (productsData) {
      dispatch({ type: 'SET_PRODUCTS', payload: productsData?.data });
    }
  }, [dispatch, productsData]);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products.filter(
        (product: Product) => product.category === selectedCategory
      );
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
              onChange={(e) =>
                dispatch({ type: 'SET_SELECTED_CATEGORY', payload: e.target.value })
              }
              value={selectedCategory}
            >
              <option value=''>All Categories</option>
              {categories?.data.map((category: string) => (
                <option value={category} key={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </Form.Select>
            {selectedCategory && (
              <Button
                variant="outline-secondary"
                onClick={() => dispatch({ type: "SET_SELECTED_CATEGORY", payload: '' })}
              >
                Clear Filter
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {isLoading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h3 className="mt-3">Loading products...</h3>
        </div>
      )}

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {filteredProducts.map((product: Product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center my-5">
          <h3>No products found in this category</h3>
        </div>
      )}
    </Container>
  );
};

export default Home;