import React, { useRef, useState } from "react";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { registerUser } from "../actions/userActions";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
const RegisterScreen = (history, location) => {
  const dispatch = useDispatch();
  let { userInfo, error, loading } = useSelector((state) => state.user);
  const email = useRef();
  const password = useRef();
  const [message, setMessage] = useState(null);
  const conformPassword = useRef();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const username = useRef();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("iran");
    if (conformPassword.current.value !== password.current.value) {
      setMessage("Password do not match");
      return;
    } else {
      setMessage(null);
    }
    dispatch(
      registerUser({
        email: email.current.value,
        name: username.current.value,
        password: password.current.value,
      })
    );
    userInfo && userInfo.name && history.push(redirect);
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      {loading && <Loader />}
      {message && <Message variant="error">{message}</Message>}
      {error && <Message variant="error">{error}</Message>}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={username}
            type="text"
            placeholder="Enter Username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={password}
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="conformPassword">
          <Form.Label>Conform Password</Form.Label>
          <Form.Control
            ref={conformPassword}
            type="password"
            placeholder="Conform Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I agree T&C" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      Already a user? <Link to="/login">Login</Link>
    </FormContainer>
  );
};

export default RegisterScreen;
