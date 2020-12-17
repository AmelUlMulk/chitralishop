import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUsersDetails, updateUser } from "../action/userActions";
import { getUserOrders } from "../action/orderAction";
import { LinkContainer } from "react-router-bootstrap";
const ProfileScreen = ({
  location,
  history,
  userDetails,
  userInfo,
  getUsersDetails,
  updateUser,
  userUpdateProfile,
  userOrders,
  getUserOrders,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const { error, loading, user } = userDetails;
  const { success } = userUpdateProfile;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { loading: loadingOrders, error: errorOrders, orders } = userOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        getUsersDetails("profile");
        getUserOrders();
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [getUsersDetails, getUserOrders, redirect, userInfo, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password != password2) {
      setMessage("Passwords do not match");
    } else {
      updateUser({ id: user._id, name, email, password });
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1 >User Profile</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">{`profile Updateds`}</Message>}

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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responcive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELEVERED</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <p style={{ color: "green" }}>Paid</p>
                    ) : (
                      <p style={{ color: "red" }}>Not Paid</p>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <p style={{ color: "green" }}>Yes</p>
                    ) : (
                      <p style={{ color: "red" }}>No</p>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => ({
  userDetails: state.userDetails,
  userInfo: state.userLogin.userInfo,
  userUpdateProfile: state.userUpdateProfile,
  userOrders: state.userOrders,
});
export default connect(mapStateToProps, {
  getUsersDetails,
  updateUser,
  getUserOrders,
})(ProfileScreen);
