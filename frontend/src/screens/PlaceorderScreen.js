import React, { useState } from "react";
import { ListGroup, Image, Card, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import Message from "../components/Message";
import Loader from "../components/Loader.js";

const PlaceorderScreen = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {/* display the shipping address */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {" "}
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country},
              </p>
            </ListGroup.Item>

            {/* display the payment method */}
            <ListGroup.Item>
              <h2>Payment Method </h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceorderScreen;
