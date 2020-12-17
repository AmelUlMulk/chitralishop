import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../action/cartAction";
import CheckOutSteps from "../components/CheckOutSteps";
const ShippingScreen = ({ history, saveShippingAddress, shippingAddress }) => {
  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : ""
  );

  const submitHandler = (e) => {
    e.preventDefault();

    saveShippingAddress({
      address,
      city,
      postalCode,
      country,
    });

    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="district">
          <Form.Label>Enter District</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter District"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

const mapStateToProps = (state) => ({
  shippingAddress: state.cart.shippingAddress,
});

export default connect(mapStateToProps, { saveShippingAddress })(
  ShippingScreen
);
