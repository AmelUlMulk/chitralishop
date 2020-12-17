import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Register } from "../action/userActions";
import FormContainer from "../components/FormContainer";
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password != password2) {
      setMessage("Passwords do not match");
    } else {
      dispatch(Register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Register User</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an Account? <Link to="/login">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
