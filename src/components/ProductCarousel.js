import Loader from "./Loader";
import Message from "./Message";
import { getTopProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Carousel, Image } from "react-bootstrap";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.topRated);
  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark my-3">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/products/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid></Image>
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {product.name}(${product.price})
                  </h2>
                </Carousel.Caption>{" "}
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductCarousel;
