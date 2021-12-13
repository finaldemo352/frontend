import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button, Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import { savePaymentMethod } from "../actions/cartActions";
import Progress from "../components/Progress";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <Progress step1 step2 step3 />
      <h1>Payments</h1>
      <Form onSubmit={formSubmitHandler}>
        <Form.Group>
          <Form.Label>Methods</Form.Label>
        </Form.Group>
        <Col>
          <Form.Check
            type="radio"
            checked
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check
            type="radio"
            disabled
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        <Button variant="primary" type="submit">
          Place Order
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
