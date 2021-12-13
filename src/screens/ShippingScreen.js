import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { saveShippingAddress } from "../actions/cartActions";
import Progress from "../components/Progress";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, shippingAddress, error } = useSelector(
    (state) => state.cart
  );

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [pinCode, setPinCode] = useState(shippingAddress.pinCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const data = { address, city, pinCode, country };
    dispatch(saveShippingAddress(data));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <Progress step1 step2 />
      <h1>Shipping Address</h1>
      {loading && <Loader />}

      {error && <Message variant="error">{error}</Message>}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="address"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="city"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pincode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            type="text"
            placeholder="pin code ex-201010"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            placeholder="country"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Pay Now
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
