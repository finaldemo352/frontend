import React, { Fragment, useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.usersList);
  const {
    loading: deletingUser,
    error: deleteError,
    success,
  } = useSelector((state) => state.userDelete);
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, success]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <Container className="my-3">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {deletingUser && <Loader></Loader>}
          {(deleteError || success) && (
            <Message variant="info">{deleteError || success.message}</Message>
          )}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID </th>
                <th>NAME </th>
                <th>EMAIL </th>
                <th>ADMIN </th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          style={{ color: "green" }}
                          className="fas fa-check"
                        ></i>
                      ) : (
                        <i
                          style={{ color: "red" }}
                          className="fas fa-times"
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/${user._id}/edit`}>
                        <Button variant="white" className="btn btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
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

export default UserListScreen;
