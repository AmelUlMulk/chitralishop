import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckOutSteps from "../components/CheckOutSteps";
import Message from "../components/Message";
import { createOrder } from "../action/orderAction";

const PlaceOrderScreen = ({ cart, createOrder, ordercreate, history }) => {
  const { success, order, error } = ordercreate;
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    //eslint-disable-next-line
  }, [success, history]);
  const placeOrderHandler = () => {
    createOrder({
      orderItem: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.TotalPrice,
    });
    console.log(cart.cartItems);
  };

  //calculatePrice
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(0);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.TotalPrice =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);
  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />;
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Payment Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <p>
                <strong>Order Items: </strong>
                {cart.cartItems.length === 0 ? (
                  <Message Your Cart Is Empty />
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col>{item.qty}</Col>
                          <Col md={4}>
                            {item.qty} X {item.price} = ${item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.TotalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  ordercreate: state.order,
});
export default connect(mapStateToProps, { createOrder })(PlaceOrderScreen);
