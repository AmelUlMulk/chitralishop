import React, { useEffect } from "react";
import { addToCart } from "../action/cartAction";
import { removeFromCart } from "../action/cartAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

const CartScreen = ({
  match,
  location,
  history,
  addToCart,
  cartItems,
  removeFromCart,
}) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : [1];
  useEffect(() => {
    if (productId) {
      addToCart(productId, qty);
    }
  }, [productId, qty]);
  console.log(qty);
  const removeFromCartHandler = (id) => {
    removeFromCart(id);
  };
  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart in Empty Go Back <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCart(item.product, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                SubToTal(
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>
                Total amount(
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
                ) Rs
              </h2>
            </ListGroup.Item>
            <ListGroup>
              <Button
                type="button"
                className="btn-btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});
export default connect(mapStateToProps, { addToCart, removeFromCart })(
  CartScreen
);
