import Product from "../modals/productsModal.js"; //bringing in the modals 
import asyncHandler from "../middleware/async.js"; //bringing in the modals

//desc
//fetch all products from the database
const getAllProducts = asyncHandler(async (req, res, next) => {
  //setting products per page 
 const pageSize=10;
 //converting the page number from req to number
 const page=Number(req.query.pageNumber)||1
//setting up the search key from request
  const key=req.query.key?{
    name:{
      $regex:req.query.key,
      $options:'i'
    }
  }:{}
  //getting the number of products currently in the database or either products respected to key
  const count=await Product.countDocuments({...key})
  //getting only 10 products from the database skipping the previous already selected 
  const products = await Product.find({...key}).limit(pageSize).skip(pageSize*(page-1));
  //responding with the products the page and the total number of pages which is total products divided by 10
  res.json({products,page,pages:Math.ceil(count/pageSize)});
});

//fetch a single product through id from req url
const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  //if there is product with the respected id send it else throw a handled error 
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
//deleting a product based on id
const deleteAProduct = asyncHandler(async (req, res, next) => {
  //first finding the product
  const product = await Product.findById(req.params.id);
  //if found calling the remove function form mongoose on it
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
  //setting an object as a new instance of Product modal
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
  //saving the product in data base with hardcode values
  const createdProduct = await product.save();
  //returning that product
  res.status(201).json(createdProduct);
});
//Update product , which is really creating a prodcut
const updateProduct = asyncHandler(async (req, res, next) => {
  //fetch the following from the body of request
  const {
    name,
    description,
    price,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  //then finding the product in the database
  const product = await Product.findById(req.params.id);
  if (product) {
    //if found and there is a name value in the body assign that value to products name all same below
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
//creating product review 
const createProductReview = asyncHandler(async (req, res, next) => {
//fething the rating and comment passed through the body
  const {
   rating,comment
  } = req.body;
  //finding the prodcut
  const product = await Product.findById(req.params.id);
  
  
  if (product) {
   //checking if the product was already reviewed by the logged in user passed by the auth middleware then looping through the review array of product

    const alreadyReviewed= product.reviews.find(review=>review.user.toString()===req.user._id.toString())
  //if reviewed throw handled error can't review
    if(alreadyReviewed){
      res.status(400)
      throw new Error(' Sorry Product already Reviwed By You')
    }
    //if not creatig an review object
    const review={
      name:req.user.name,
      rating:Number(rating),
      comment,
      user:req.user._id
    }

     //pushing the review into the review array
    product.reviews.push(review)
    //updating number of reviews 
    product.numReviews=product.reviews.length
    //calculating the average rating 
    product.rating=product.reviews.reduce((acc,item)=>item.rating +acc,0)/product.reviews.length
   //saving updated product reviews in databse
    await product.save()
    res.status(201).json({
      message:'Review Added'
    });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});
//fetching top rated products
const getTopRatedProduct = asyncHandler(async (req, res, next) => {
  //fetch top 3 rated products 
  const topProducts=await Product.find({}).sort("rating -1").limit(3);
  //returning the top products
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
