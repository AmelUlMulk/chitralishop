import React, { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getAllUserOrders } from '../action/orderAction'
import FormContainer from "../components/FormContainer";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

const OrderListScreen = ({
  Adminorders,
  history,
  getAllUserOrders
}) => {
 
  const{orders,loading,error} =Adminorders

  useEffect(() => {
      getAllUserOrders()  
  }, []);

  return (
    <>
      <h2 style={{color:'grey'}}>Orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders ? (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>IsDelevered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td> {order._id}</td>
                <td> {order.user.name}</td>
                <td>
                  {order.createdAt.substring(0,10)}
                </td>
                <td> {order.totalPrice}</td>
                <td> {order.isPaid?<p>Paid</p>:<p>Not Paid</p>}</td>
                <td> {order.isDelivered?<p>Yes</p>:<p>No</p>}</td>
                <td>
                  
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                    details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Not yet</p>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
 Adminorders:state.Orders
});
export default connect(mapStateToProps, { getAllUserOrders })(
  OrderListScreen
);
