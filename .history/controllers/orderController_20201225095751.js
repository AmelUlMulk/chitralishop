import asyncHandler from "../middleware/async.js";
import Order from "../modals/orderModal.js";
import sendEmail from '../utils/sendEmail.js';


const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItem,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItem && orderItem.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
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

    const createdOrder = await order.save();
    try {
      sendEmail({
         email:req.user.email,
         subject:'Order placed on Chitrali-Shop'
      })

      res.status(201).json(createdOrder);
    } catch (error) {
      throw new Error('Email not send')
    }
   
  }
});
//Get Order by id
const getOrderById = asyncHandler(async (req, res) => {
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
  const order = await Order.find({ user: req.user._id });
  res.json(order);
});
//get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});
const updateOrdertoDelivered=asyncHandler(async(req,res)=>{
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
