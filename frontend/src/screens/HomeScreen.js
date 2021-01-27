import React from "react";
import { Col, Row } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";

const HomeScreen = () => {
  return (
    <>
     
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => {
          // looping through the products and passing it as props into the product component
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
