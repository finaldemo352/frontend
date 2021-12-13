import React, { useEffect, useState } from "react";
import { getSingleProduct, reviewProduct } from "../actions/productActions.js";
import { useHistory } from "react-router";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Container,
  Button,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { cartAddAction } from "../actions/cartActions.js";
import Message from "../components/Message";
import Meta from "../components/Meta.js";
const ProductScreen = ({ match }) => {
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const {
    loading: posting,
    error: postingFailed,
    success: posted,
  } = useSelector((state) => state.reviewProduct);
  const { loading: another, error: temp } = useSelector((state) => state.cart);
  useEffect(
    () => dispatch(getSingleProduct(match.params.id)),
    [match, dispatch]
  );

  const addToCart = () => {
    dispatch(cartAddAction({ id: product._id, qty }));
    history.push("/cart");
  };
  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    console.log(ratings);
    dispatch(
      reviewProduct({ id: product._id, updateData: { comment, ratings } })
    );
  };

  return (
    <>
      {loading || another ? (
        <Loader />
      ) : error || temp ? (
        <Message>
          {temp}
          {error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Container className="my-3">
            <Link to="/">
              <Button className="btn btn-primary my-3">Go Back</Button>
            </Link>
            <Row>
              <Col md={9}>
                <Row>
                  <Col md={6}>
                    <Image src={product.image} fluid />
                    Reviews
                    {postingFailed && (
                      <Message variant="info">{postingFailed.message}</Message>
                    )}
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Ratings</Form.Label>
                        <Form.Control
                          default={5}
                          as="select"
                          onChange={(e) => setRatings(e.target.value)}
                        >
                          <option value="1">Poor</option>
                          <option value="2">Bad</option>
                          <option value="3">Okay</option>
                          <option value="4">Good</option>
                          <option value="5" default>
                            Terrific
                          </option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control
                          as="textarea"
                          onChange={(e) => setComment(e.target.value)}
                          rows={2}
                        />
                      </Form.Group>
                      <Button onClick={reviewSubmitHandler}>Post</Button>
                    </Form>
                    {!product.reviews || product.reviews.length === 0 ? (
                      <p>No Reviews available</p>
                    ) : (
                      <ListGroup variant="flush">
                        {product.reviews.map((review) => (
                          <ListGroupItem>
                            <Row>
                              <Col md={6}>
                                <p> {review.name}</p>
                              </Col>
                              <Col md={6}>
                                <Rating ratings={review.ratings} />
                              </Col>
                            </Row>

                            <Row>
                              <p>{review.comment}</p>
                            </Row>
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    )}
                  </Col>
                  <Col md={4}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>{product.name}</strong>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Rating rating={product.ratings} /> from{" "}
                        {product.numReviews} reviews
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price : </Col>
                          <Col>$ {product.price}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>{product.description}</ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price : </Col>
                        <Col>
                          <strong>$ {product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Stauts : </Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In Stocks"
                            : "Out Of Stocks"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock !== 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty:{product.quantity}</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (key) => (
                                  <option key={key + 1} value={key + 1}>
                                    {key + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        onClick={addToCart}
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default ProductScreen;
