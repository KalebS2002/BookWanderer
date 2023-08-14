const express = require("express");
const productsRouter = express.Router();

// NOTE:  *ONLY* and Admin user is allowed to createProduct or updateProduct
//  Products are NEVER deleted, the "isactive" boolean is set to FALSE when a product is no longer available
const {
  getAllActiveProducts,
  // getProductById,
  createProduct,
  // updateProduct,
} = require("../db");

productsRouter.use((req, res, next) => {
  console.log(
    "A request is being made to /api/products - next() is called ..."
  );
  next();
});

// GET /api/products - Return a list of all active products
productsRouter.get("/", async (req, res, next) => {
  console.log("A request is being made to GET /api/products ...");
  // console.log("req.body is ", req.body);
  try {
    const products = await getAllActiveProducts();
    res.send({ products });
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
