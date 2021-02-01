import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import FormContainer from "../components/FormContainer.js";
import Loader from "../components/Loader.js";

const PaymentScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("flutterwave");

  const submitHandler = (e) => {
    e.preventDefault();

    //dispatch saveShippingAddress
    dispatch(savePaymentMethod(paymentMethod));
    // move to the next page

    history.push("/placeorder");
  };

  return (
    <FormContainer>
      {/* in the shipping screen , user already pass step 1 and step 2 */}
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Flutterwave or Credit Card"
              id="flutterwave"
              name="paymentMethod"
              value="flutterwave"
              checked
              onChange={(e)=> setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
