//bringing in libraries
import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
//bringing in native functions and components
import store from "./store";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from './screens/OrderListScreen'
//local styyling
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>  {/*initializing redux store*/}

      <Router> {/*react router to navigate the virtual dom*/}
        <Header />

        <main className="py-3">
          <Container style={{paddingTop:'6rem'}}>
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/admin/userList" component={UserListScreen} />
            <Route path="/admin/orderList" component={OrderListScreen} />
            <Route path="/admin/productList" exact component={ProductListScreen} />
            <Route path="/admin/productList/:pageNumber" exact component={ProductListScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route exact path="/search/:key" component={HomeScreen} />
            <Route exact path="/search/:key/page/:pageNumber" component={HomeScreen} />
            <Route exact path="/page/:pageNumber" component={HomeScreen} />
            <Route exact path="/" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
