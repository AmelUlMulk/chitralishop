import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrderDetails,updateOrder} from "../action/orderAction";


const OrderScreen = ({ match, orderDetail, getOrderDetails,login,updateOrder,orderUpdate }) => {
  const orderId = match.params.id;
  const { order, loading, error } = orderDetail;
  const {loading:updateLoading}=orderUpdate
  if (!loading) {
    order.itemsPrice = order.orderItem
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    getOrderDetails(orderId);
  }, [updateLoading]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order : {`${orderId}`}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>

              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success"> Delivered On:{order.deliveredAt.substring(0,10)} At {order.deliveredAt.substring(11,16)}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>
            </ListGroup.Item>
           
            <ListGroup.Item>
              <h2>Order Items</h2>
              <p>
                <strong>Order Items: </strong>
                {order.orderItem.length === 0 ? (
                  <Message Order Is Empty />
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItem.map((item, index) => (
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
          {
            login&&!order.isDelivered &&(
               <ListGroup>
                 <Button type='button' className='btn btn-block' onClick={()=>{
                   updateOrder(orderId)
                 }}>
                      Mark As Delivered
                 </Button>
               </ListGroup>
            )
          }
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  orderDetail: state.orderDetail,
  login:state.userLogin.userInfo.isAdmin,
  orderUpdate:state.OrderUpdate
});
export default connect(mapStateToProps, { getOrderDetails,updateOrder })(OrderScreen);
