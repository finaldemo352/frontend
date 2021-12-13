import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import {
  deleteProduct,
  getProducts,
  createProduct,
} from "../actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

const ProductListScreen = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const { loading, products, error, page, pages } = useSelector(
    (state) => state.productList
  );
  const { userInfo } = useSelector((state) => state.user);
  const {
    loading: deleting,
    error: deleteError,
    success,
  } = useSelector((state) => state.productDelete);
  const {
    loading: creating,
    error: createError,
    success: createdProduct,
    product,
  } = useSelector((state) => state.newProduct);
  const [deleteMsg, setDelete] = useState(success && success.message);
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push(`/login`);
    }
    if (createdProduct) {
      setDelete(null);
      history.push(`/admin/products/${product._id}/edit`);
    } else {
      dispatch(getProducts("", pageNumber));
    }
  }, [dispatch, success, createdProduct, userInfo, pageNumber, history]);

  const createHandler = () => {
    dispatch({ type: PRODUCT_DELETE_RESET });

    dispatch(createProduct());
  };

  const deleteHandler = (id) => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch(deleteProduct(id));
  };
  return (
    <>
      <Row className="align-item-center my-3">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={createHandler} className="btn ">
            <i className="fas fa-plus"> Create Product</i>
          </Button>
        </Col>
      </Row>
      {deleteMsg && <Message variant="danger">{deleteMsg}</Message>}
      {createdProduct && (
        <Message variant="success">Created Product Successfully</Message>
      )}
      {loading || deleting || creating ? (
        <Loader />
      ) : error || deleteError ? (
        <Message variant="danger">
          {error || deleteError || createError}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID </th>
                <th>NAME </th>
                <th>BRAND </th>
                <th>CATEGORY </th>
                <th>PRICE</th>
                <th>EDIT</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>
                      <LinkContainer to={`/admin/products/${product._id}/edit`}>
                        <Button variant="white" className="btn btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
