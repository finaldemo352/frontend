import React, { useRef, useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { getUser, updateUserAdmin } from "../actions/userActions";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
const UpdateUserScreen = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userGet);
  const {
    loading: updating,
    error: updateError,
    success,
  } = useSelector((state) => state.userUpdate);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState();
  const [conformPassword, setConformPassword] = useState(null);
  const [username, setUsername] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!user || user._id != userId) {
      dispatch(getUser(userId));
    } else {
      setEmail(user.email);
      setUsername(user.name);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== conformPassword) {
      setMessage("Password do not match");
      return;
    }
    dispatch(
      updateUserAdmin({
        id: userId,
        updateData: {
          name: username,
          email,
          isAdmin,
          password,
        },
      })
    );
    if (message) {
      console.log(message);
      setMessage(null);
    }
  };

  return (
    <FormContainer>
      <h1>Update User</h1>
      {loading && <Loader />}
      {message && <Message variant="danger">{message}</Message>}
      {success && <Message variant="success">{success.message}</Message>}
      {error && <Message variant="error">{error}</Message>}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="conformPassword">
          <Form.Label>Conform Password</Form.Label>
          <Form.Control
            onChange={(e) => setConformPassword(e.target.value)}
            type="password"
            placeholder="Conform Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="isAdminCheck">
          <Form.Check
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            type="checkbox"
            label="isAdmin"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UpdateUserScreen;
