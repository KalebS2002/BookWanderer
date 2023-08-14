// file:  DB/PRODUCTS.JS

// grab our db client connection to use with our adapters
const client = require("../client");

// add your database adapter fns here
module.exports = {
  createProduct,
  getAllProducts,
  getAllActiveProducts,
};

async function createProduct({
  title,
  author,
  price,
  category,
  format,
  overview,
  isactive,
  qtyavailable,
  imageurl,
}) {
  // create a new products record.  Only an Admin user sh be allowed to do this
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products (isactive, qtyavailable, title, author, price, category, format, imageurl, overview) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *;
    `,
      [
        isactive,
        qtyavailable,
        title,
        author,
        price,
        category,
        format,
        imageurl,
        overview,
      ]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  // return an array of ALL products (both active and inactive)
  try {
    const { rows: products } = await client.query(`SELECT * FROM products;`);

    return products;
  } catch (error) {
    throw error;
  }
}

async function getAllActiveProducts() {
  // return an array of products that are ACTIVE
  try {
    const { rows: products } = await client.query(
      `SELECT * FROM products WHERE isactive=TRUE;`
    );

    return products;
  } catch (error) {
    throw error;
  }
}
