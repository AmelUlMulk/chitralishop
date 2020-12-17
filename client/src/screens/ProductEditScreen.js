import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from 'axios';
import {
  getProduct,
  createProduct,
  updateProduct,
} from "../action/productAction";
import FormContainer from "../components/FormContainer";

const ProductEditScreen = ({
  match,
  history,
  productList,
  getProduct,
  updateProduct,
  createProduct,
  productUpdate,
}) => {
  //getting from state
  const { product, loading, success, error } = productList;
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = productUpdate;
  //

  const [price, setPrice] = useState(0);
  const [name, setName] = useState(" ");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);
  //
  const productId = match.params.id;
  useEffect(() => {
    if (updateSuccess) {
      updateProduct(null, true);
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id != productId) {
        getProduct(productId);
        console.log(product);
      } else {
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setCountInStock(product.countInStock);
      }
    }
  }, [history, product, updateSuccess]);

  const uploadFileHandler=async(e)=>{
    const file=e.target.files[0];
    
    const formData= new FormData()
      formData.append('image',file)
      console.log(file)
      setUploading(true)
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        };
        
        const {data}=await axios.post('/api/upload',formData,config)
        
        console.log(data)
        setImage(data)
        setUploading(false)
      } catch (err) {
        console.error(err)
        setUploading(true)
      }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct(
      {
        _id: productId,
        name,
        description,
        category,
        price,
        brand,
        image,
        countInStock,
      },
      null
    );
  };

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>

              <Form.Label>Enter Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
              <Form.Label>Enter Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Count In Stock"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control type='file' label='Choose File' custom onChange={
                uploadFileHandler
              }>
             
              </Form.Control>
              {uploading&&<Loader/>}

            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
const mapStateToProps = (state) => ({
  productList: state.productList,
  productUpdate: state.productUpdate,
});
export default connect(mapStateToProps, {
  getProduct,
  createProduct,
  updateProduct,
})(ProductEditScreen);
