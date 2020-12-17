import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link,Route} from "react-router-dom";

import { connect } from "react-redux";
import { logOut } from "../action/userActions";
import SearchBox from './SearchBox'

const Header = ({ userInfo, logOut }) => {
  const logoutHandler = () => {
    logOut();
  };
  return (
    <header>
      <Navbar bg="light" variant="light" collapseOnSelect expand="lg" style={{position:'fixed',zIndex:'1', width:'100%' }}>
        <Container>
          <Link to="/">
            <Navbar.Brand variant='light' style={{color:"grey"}}>Chitrali Shop</Navbar.Brand>
          </Link>
          <Navbar.Toggle area-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Route render={({history})=><SearchBox history={history}/>}/>

            <Nav className="ml-auto">
              <Nav.Link>
                <Link to="/cart" className="react-link">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Link>
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link>
                  <Link to="/login" className="react-link">
                    <i className="fas fa-user"></i> SignIn
                  </Link>
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-menu">
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
const mapStateToProps = (state) => ({
  userInfo: state.userLogin.userInfo,
});
export default connect(mapStateToProps, { logOut })(Header);
