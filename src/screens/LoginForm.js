import React, { useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions.js";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const LoginForm = ({ location, history }) => {
  const email = useRef();
  const password = useRef();
  const { error, loading, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo && userInfo.name) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email.current.value, password.current.value));
  };
  return (
    <FormContainer>
      <h1>Login</h1>
      {loading && <Loader />}
      {error && <Message variant="error">{error}</Message>}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={email} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I agree T&C" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      New User? <Link to="/register">Register</Link>
    </FormContainer>
  );
};

export default LoginForm;
