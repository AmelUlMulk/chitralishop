import asyncHandler from "../middleware/async.js";
import Order from "../modals/orderModal.js";
import sendEmail from '../utils/sendEmail.js';

//adding an order 
const addOrderItems = asyncHandler(async (req, res) => {
  //extracting the data to be ordered
  const {
    orderItem,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
//ensuring there is not order item and the demand for that order is zero then return error
  if (orderItem && orderItem.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    //creating a new order object
    const order = new Order({
      orderItem,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
//saving the new order in created order
    const createdOrder = await order.save();
  //sending confirmation email
  
      const emailSend=sendEmail({
         email:req.user.email,
         subject:'Order placed on Chitrali-Shop'
      })
  if(emailSend){
    res.status(201).json(createdOrder);
  }else{
    throw new Error('email not send')
  }
    
   
  }
});
//Get Order by id
const getOrderById = asyncHandler(async (req, res) => {
  //getting order details by id and getting the user who placed that order
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
//get orders for a particuler user
const getOrderByUser = asyncHandler(async (req, res) => {
  //getting all the orders placed by user
  const order = await Order.find({ user: req.user._id });
  res.json(order);
});
//get all orders with user details
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});
const updateOrdertoDelivered=asyncHandler(async(req,res)=>{
  //admin route to update the order delivered part to true
   const order=await Order.findById(req.params.id);
    if(order){
      order.isDelivered=true,
      order.deliveredAt=Date.now()
      const updatedOrder= await order.save()
      res.json(updatedOrder)
    }
    else{
      res.status(404)
      throw new Error('Order Not Found')
    }

})

export { addOrderItems, getOrderById, getOrderByUser,getAllOrders,updateOrdertoDelivered };
