import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../action/cartAction";
import CheckOutSteps from "../components/CheckOutSteps";

const PaymentScrean = ({ history, shippingAddress, savePaymentMethod }) => {
  if (!shippingAddress) {
    history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Tcs"
              id="tcs"
              name="paymentMethod2"
              value="Tcs"
             
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" onClick={submitHandler}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

const mapStateToProps = (state) => ({
  shippingAddress: state.cart.shippingAddress,
});

export default connect(mapStateToProps, { savePaymentMethod })(PaymentScrean);
