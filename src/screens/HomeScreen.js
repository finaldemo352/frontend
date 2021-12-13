import React, { useEffect } from "react";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { getProducts } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber;
  const dispatch = useDispatch();
  const { loading, products, error, pages, page } = useSelector(
    (state) => state.productList
  );
  const keyword = match.params.keyword;

  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="my-3 btn btn-dark">
          Go Back
        </Link>
      )}
      <Row className="container">
        <h1>Latest Products</h1>
      </Row>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          products.map((item) => {
            return (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={item} />
              </Col>
            );
          })
        )}
      </Row>
      <Paginate
        pages={pages}
        page={page}
        keyword={keyword ? keyword : ""}
      ></Paginate>
    </>
  );
};

export default HomeScreen;
