import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAddAction, cartRemoveAction } from "../actions/cartActions.js";
import { Row, Form, Button, Container, Col, Image } from "react-bootstrap";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let { name, image, qty, price, countInStock, _id } = props.product;

  const addToCart = (e) => {
    dispatch(cartAddAction({ id: _id, qty: e.target.value }));
    history.push("/cart");
  };
  const removeFromCartHandler = () => {
    dispatch(cartRemoveAction({ id: _id }));
  };

  return (
    <Container>
      <Row>
        <Col md={2}>
          <Image src={image} rounded fluid alt={name} />
        </Col>
        <Col md={3}>
          <Link to={`/products/${_id}`}>
            <h5>{name}</h5>
          </Link>
        </Col>
        <Col md={2}>
          <h5>{price}</h5>
        </Col>
        <Col md={3}>
          <Form.Control as="select" value={qty} onChange={(e) => addToCart(e)}>
            {[...Array(countInStock).keys()].map((key) => (
              <option key={key + 1} value={key + 1}>
                {key + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button type="button" variant="light" onClick={removeFromCartHandler}>
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartItem;
