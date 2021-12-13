import { Card, Container, ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CartItem from "../components/CartItem.js";
import { Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const CartScreen = ({ history }) => {
  const { loading, cartItems, error } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const submitHadler = (e) => {
    if (!userInfo.name) {
      <Redirect to="/login" />;
    }
    history.push("/shipping");
  };
  useEffect(() => {
    const tempCount = cartItems.reduce((sum, a) => sum + a.qty, 0);
    const tempPrice = cartItems.reduce((sum, a) => sum + a.qty * a.price, 0);
    setCount(tempCount);
    setTotalPrice(tempPrice);
  }, [cartItems]);

  return (
    <>
      <h2>Shopping cart</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row style={{ margin: "20px" }}>
          <Col md={7}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.name}>
                  <CartItem product={item} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={2}></Col>
          <Col md={3}>
            <Card>
              <ListGroup varient="flush">
                <ListGroup.Item as="div">
                  <div>
                    <h5>
                      Subtotal ({count ? count : 0} items) <br />
                      <strong>
                        ₹{totalPrice ? totalPrice.toFixed(2) : 0}/-
                      </strong>
                    </h5>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={submitHadler}
                    style={{ width: "100%" }}
                    className="btn-block"
                    type="button"
                  >
                    CheckOut
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartScreen;
