import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { updateProduct } from "../actions/productActions";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { getSingleProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
const ProductUpdateScreen = ({ match, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const {
    loading: updating,
    error: updateError,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name && product._id !== productId) {
        dispatch(getSingleProduct(productId));
      } else {
        setName(product.name);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setNumReviews(product.numReviews);
        setCategory(product.category);
        setPrice(product.price);
        setImage(product.image);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, history, successUpdate]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        id: productId,
        updateData: {
          name,
          brand,
          countInStock,
          price,
          numReviews,
          image,
          description,
          category,
        },
      })
    );
  };

  const fileUploadHandler = async (e) => {
    const file = e.target.files[0];
    const imgUrl = "https://api.imgbb.com/1/upload";

    let body = new FormData();
    body.set("key", "4aaacc4e0a5212ef5c3f9d2facd40d64");
    body.append("image", file);
    const response = await axios({
      method: "post",
      url: imgUrl,
      data: body,
    });
    if (!response.ok) {
      console.log("image not uploaded");
    }
    setImage(response.data.data.image.url);
  };

  return (
    <>
      <Link to="/admin/productlist">
        <Button className="my-3">Go Back</Button>
      </Link>
      <FormContainer>
        <h1>Update Product</h1>
        {loading && <Loader />}
        {updating && <Loader />}
        {successUpdate && (
          <Message variant="success">{successUpdate.message}</Message>
        )}
        {updateError && <Message variant="danger">{updateError}</Message>}
        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              type="text"
              placeholder="Brand"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="reviews">
            <Form.Label>Num Review</Form.Label>
            <Form.Control
              value={numReviews}
              onChange={(e) => setNumReviews(e.target.value)}
              type="text"
              placeholder="Reviews"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="category"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              label="price"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="count">
            <Form.Label>Stock Count</Form.Label>
            <Form.Control
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              type="text"
              label="countInStock"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              placeholder="image"
            />
            <Form.File
              custom
              id="image-file"
              label="Choose File"
              onChange={fileUploadHandler}
            />
            {uploading && <Loader />}
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="description"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductUpdateScreen;
