const express = require("express");
const productsRouter = express.Router();
// NOTE:  *ONLY* and Admin user is allowed to createProduct or updateProduct
//  Products are NEVER deleted, the "isactive" boolean is set to FALSE when a product is no longer available
const {
  getAllActiveProducts,
  updateProduct,
  createProduct,
  getProductsById,
  deleteProduct
} = require("../db");

const {adminAccess} = require("./adminAccess")

productsRouter.use((req, res, next) => {
  console.log(
    "A request is being made to /api/products - next() is called ..."
  );
  next();
});

//Authentication process is working..

// GET /api/products - Return a list of all active products
productsRouter.get("/", async (req, res, next) => {
  console.log("A request is being made to GET /api/products ...");
  // console.log("req.body is ", req.body);
    const products = await getAllActiveProducts();
    res.send({ products });
   
});

// POST /api/products - Create new products.
// Tested it out with Postman and it is working
productsRouter.post("/", adminAccess, async (req, res, next) => {
  const {
    title,
    author,
    price,
    category,
    format,
    overview,
    qtyavailable,
    imageurl,
  } = req.body;
  // Set isactive to true when creating a new product
  const isactive = true;

  const newProduct = await createProduct({
    title,
    author,
    price,
    category,
    format,
    overview,
    isactive,
    qtyavailable,
    imageurl,
  }).catch(next);

  res.status(201).json(newProduct);
});

// GET /api/products/:id - Return a product that matches the ID
productsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const product = await getProductsById(id).catch(next);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// PATCH /api/products/:id route to update a product based on the provided ID:

productsRouter.patch("/:id", adminAccess, async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  const product = await getProductsById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const updatedProduct = await updateProduct(id, updates);
  console.log("test", updatedProduct);
  res.json(updatedProduct);
});
// PATCH /api/products/delete/:id 
    // Use the deleteProduct function to set isactive to false
productsRouter.patch("/delete/:id", adminAccess, async (req, res, next) => {
      const { id } = req.params;
    
      const product = await getProductsById(id);
    
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
    
      const updatedProduct = await deleteProduct(id);
    
      res.json(updatedProduct);
    });


module.exports = productsRouter;

