import Product from "../modals/productsModal.js";
import asyncHandler from "../middleware/async.js";

const getAllProducts = asyncHandler(async (req, res, next) => {
 const pageSize=10;
 const page=Number(req.query.pageNumber)||1

  const key=req.query.key?{
    name:{
      $regex:req.query.key,
      $options:'i'
    }
  }:{}
  const count=await Product.countDocuments({...key})
  const products = await Product.find({...key}).limit(pageSize).skip(pageSize*(page-1));

  res.json({products,page,pages:Math.ceil(count/pageSize)});
});

const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
const deleteAProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({
      message: "Product Removed",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
//create a new product
const createAProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: "sampleName",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
//Update product
const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    price,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name ? name : product.name;
    product.description = description ? description : product.description;
    product.price = price ? price : product.price;
    product.image = image ? image : product.image;
    product.brand = brand ? brand : product.brand;
    product.category = category ? category : product.category;
    product.countInStock = countInStock ? countInStock : product.countInStock;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});
const createProductReview = asyncHandler(async (req, res, next) => {
  const {
   rating,comment
  } = req.body;
  const product = await Product.findById(req.params.id);
  

  if (product) {
    const alreadyReviewed= product.reviews.find(review=>review.user.toString()===req.user._id.toString())
  
    if(alreadyReviewed){
      res.status(400)
      throw new Error(' Sorry Product already Reviwed By You')
    }
    const review={
      name:req.user.name,
      rating:Number(rating),
      comment,
      user:req.user._id
    }
    product.reviews.push(review)
    
    product.numReviews=product.reviews.length
    product.rating=product.reviews.reduce((acc,item)=>item.rating +acc,0)/product.reviews.length

    await product.save()
    res.status(201).json({
      message:'Review Added'
    });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

const getTopRatedProduct = asyncHandler(async (req, res, next) => {
  const topProducts=await Product.find({}).sort("rating -1").limit(3);
   res.json(topProducts)
});

export {
  getAllProducts,
  getSingleProduct,
  deleteAProduct,
  createAProduct,
  updateProduct,
  createProductReview,
  getTopRatedProduct
};
