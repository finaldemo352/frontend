import React, { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { listOrders } from "../actions/orderAction";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { orders, error, loading } = useSelector((state) => state.ordersList);
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <Container className="my-3">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {loading && <Loader />}

          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID </th>
                <th>USER </th>
                <th>DATE </th>
                <th>TOTAL </th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i style={{ color: "red" }} className="fas fa-times" />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i style={{ color: "red" }} className="fas fa-times" />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="white" className="btn btn-sm">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default OrderListScreen;
