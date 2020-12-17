import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUsersDetails, updateUserByAdmin } from "../action/userActions";
import FormContainer from "../components/FormContainer";
const UserEditScreen = ({
  match,
  history,
  userDetails,
  getUsersDetails,
  userUpdated,

  updateUserByAdmin,
}) => {
  const userId = match.params.id;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { loading, user, error } = userDetails;
  const {
    loading: updatedLoading,
    error: updatedError,
    success: updatedSuccess,
  } = userUpdated;

  useEffect(() => {
    if (updatedSuccess) {
      updateUserByAdmin(null, true);
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id != userId) {
        getUsersDetails(userId);
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, updatedSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateUserByAdmin({ _id: userId, name, email, isAdmin }, false);
  };

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {updatedLoading ? (
          <Loader></Loader>
        ) : updatedError ? (
          <Message variant="danger">{updatedError}</Message>
        ) : (
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

              <Form.Check
                type="checkbox"
                label="is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
const mapStateToProps = (state) => ({
  userDetails: state.userDetails,
  userUpdated: state.userUpdateByAdmin,
});
export default connect(mapStateToProps, { getUsersDetails, updateUserByAdmin })(
  UserEditScreen
);
