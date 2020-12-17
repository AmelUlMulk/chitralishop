import React, { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,

} from "../action/productAction";
import Paginate from '../components/Paginate' ;
import FormContainer from "../components/FormContainer";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

const ProductListScreen = ({
  ProductList,
  getProducts,
  userInfo,
  history,
  deleteProduct,
  ProductDelete,
  ProductCreate,
  createProduct,
  match
}) => {

  const { products, error, loading ,page,pages} = ProductList;
  const pageNumber=match.params.pageNumber||1
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = ProductDelete;
  const {
    loading: createLoading,
    error: createError,
    success: CreateSuccess,
    product: createdProduct,
  } = ProductCreate;
  const createProductHandler = () => {
    createProduct({});
  };
  const onDeleteHandler = (id) => {
    if (window.confirm("Are You Sure?")) {
      deleteProduct(id);
    }
  };
  useEffect(() => {
    createProduct(null, true);

    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (CreateSuccess) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      getProducts('',pageNumber);
    }
  }, [history, userInfo, deleteSuccess, CreateSuccess, createProduct,pageNumber]);

  return (
    <>
      <Row className="aligh-item-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loader />}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {createLoading && <Loader />}
      {createError && <Message variant="danger">{deleteError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products ? (
        <>
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td> {product._id}</td>
                <td> {product.name}</td>
                <td> {product.price}</td>
                <td>{product.category}</td>
                <td> {product.brand}</td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => onDeleteHandler(product._id)}
                  >
                    Delete
                  </Button>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      <Paginate pages={pages} page={page} isAdmin={true}/>
      </>
      ) : (
        <p>Not yet</p>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  ProductList: state.productList,
  userInfo: state.userLogin.userInfo,
  ProductDelete: state.productDelete,
  ProductCreate: state.productCreate,
});
export default connect(mapStateToProps, {
  getProducts,
  deleteProduct,
  createProduct,
})(ProductListScreen);
