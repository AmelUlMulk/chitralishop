import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from '../components/Message'
import Loader from '../components/Loader'

import { connect } from "react-redux";
import { getProduct,productCreateReview } from "../action/productAction";


const ProductScreen = ({ match, product, getProduct, history,productReviewCreate,login,productReview,productCreateReview }) => {
 console.log(product.reviews)

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const{success:reviewSuccess,error:reviewError,loading:reviewLoading}=productReviewCreate;
   
 
 useEffect(() => {
  getProduct(match.params.id)
}, [match,reviewSuccess]); 

 const addCartToHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);

  };
  const submitHandler=(e)=>{
     e.preventDefault()
    productCreateReview(match.params.id,{
      rating,
      comment
    })
    setComment('');
    setRating(0)
  }

  return (
    
    <Fragment>
      <Link className="btn btn-light  my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item variant="flush">
              <h3>{product.name}</h3>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Rating
              value={product.rating}
              text={`${product.numReviews} ${" "} reviews`}
            />
          </ListGroup.Item>
          <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
          <ListGroup.Item> Description:{product.description}</ListGroup.Item>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                        
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="btn"
                  disabled={product.countInStock === 0}
                  onClick={addCartToHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
        <h1>Reviews</h1>
         <ListGroup>
         {
           
           product.reviews&&product.reviews.length==0?<Message>
              No Reviews
           </Message>:(<p></p>)
         }
         {
             product.reviews&&product.reviews.map(review=>(
             
         <ListGroup.Item key={review._id}>
               
                <strong>
                   {review.name}
                </strong>
                <Rating value={review.rating}/>
                <p>
                  {review.comment}
                </p>
                <p>{review.createdAt.substring(0,10)}</p>
            </ListGroup.Item> 
          )) 
         }
         {
           <ListGroup.Item>
              <h2>Write a customer review</h2>
              {reviewError&&<Message variant='danger'>{reviewError}</Message>}
              {reviewLoading&&<Loader/>}
              {login?
                <Form onSubmit={submitHandler}>
                   <Form.Group controlId='rating'>
                      <Form.Control as='select' value={rating} onChange={e=>setRating(e.target.value)} >
                           <option value='' >
                             Select
                           </option>
                           <option value='1' >
                             1 poor
                           </option>
                           <option value='2'>
                             2 fair
                           </option>
                           <option value='3'>
                             3 good
                           </option>
                           <option value='4'>
                             4 very Good
                           </option>
                           <option value='5'>
                             5 exelent
                           </option>
                      </Form.Control>
                      <Form.Control style={{border:'1px solid grey'}} as='textarea' row='3' value={comment} onChange={e=>setComment(e.target.value)} placeholder='Enter Coment'>

                        </Form.Control>
                   </Form.Group>
                   <Button type='submit' variant='primary' onClick={submitHandler}>
                       Submit
                   </Button>
                </Form>
              :<Message><Link to='/login'>Sign in to add a review</Link></Message>}
           </ListGroup.Item>
         }
         </ListGroup>
        </Col>
      </Row>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  product: state.productList.product,
  productReviewCreate:state.Reviews,
  login:state.userLogin.userInfo,
});
export default connect(mapStateToProps, { getProduct,productCreateReview })(ProductScreen);
