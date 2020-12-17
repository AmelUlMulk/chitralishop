import React,{useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Carousel,Image} from 'react-bootstrap' ;
import Loader from './Loader';
import Message from './Message'
import {getTopProducts} from '../action/productAction'
import {connect} from 'react-redux'

const ProductCorosel = ({getTopProducts,TopRated}) => {
  const{products,loading,error}=TopRated
  useEffect(()=>{
        getTopProducts()
  },[getTopProducts]) 
  return loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
      <Carousel pause='hover' className="bg-light" >
            {products.map(product=>(
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}  style={{display:'flex',
                flexDirection:'column',
                alignItems:'center'
                }} >
                        <Image src={product.image} alt={product.name} fluid style={{padding:'4rem 0'}} />
                       
                        <Carousel.Caption className='carousel-caption' >
                            <h2 style={{color:'grey'}}>{product.name} ({product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))} 
      </Carousel>
  )
}
const mapStateToProps=(state)=>({
      TopRated:state.TopProducts
})
export default connect(mapStateToProps,{getTopProducts})(ProductCorosel)
