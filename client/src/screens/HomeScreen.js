import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getProducts } from "../action/productAction";
import Spinner from "../components/Loader";
import { getUserOrders } from "../action/orderAction";
import Message from "../components/Message";
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCorosel'
import {Link} from 'react-router-dom'
const HomeScreen = ({
  getProducts,
  products,
  loading,
  error,
  getUserOrders,
  match
  ,page,pages
}) => {
  const key=match.params.key;
  const pageNumber=match.params.pageNumber||1

  console.log(key)
  //Loading Products from backend
  useEffect(() => {
    getProducts(key,pageNumber);
    getUserOrders();
  }, [key,pageNumber]);
  const [qty, setQty] = useState(0);

  return (
    <Fragment>
      {!key?<ProductCarousel/>:<Link to='/' className='btn btn-light'>Go Back</Link>}
      <h1 style={{color:'grey'}}>Latest Products</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
         <Paginate pages={pages} page={page} key={key?key:''}/>
         </>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  pages:state.productList.pages,
  page:state.productList.page,
  products: state.productList.products,
  loading: state.productList.loading,
  error: state.productList.error,
});
export default connect(mapStateToProps, { getProducts, getUserOrders })(
  HomeScreen
);
