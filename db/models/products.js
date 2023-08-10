// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  createProduct,
  getAllProducts,
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
  // make sure that price is a float value, not a string
  price = parseFloat(price);
  if (!isactive) isactive = true;

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
  /* this adapter should fetch a list of users from your db */
  try {
    // select and return an array of all products
    const { rows: products } = await client.query(`SELECT * FROM products;`);

    return products;
  } catch (error) {
    throw error;
  }
}
