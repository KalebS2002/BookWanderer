// file:  DB/PRODUCTS.JS

// grab our db client connection to use with our adapters
const client = require("../client");

// add your database adapter fns here
module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  getProductsByAuthor,
  getAllActiveProducts,
  getProductsByTitle,
  updateProduct,
  destroyProduct,
  deleteProduct,
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
// This function select and return the product matches to the id
async function getProductsById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT * FROM products
    WHERE id = $1
    `,
      [id]
    );
    return product || null;
  } catch (error) {
    throw error;
  }
}
async function getProductsByAuthor(author) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * FROM products
      WHERE author = $1
    `,
      [author]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductsByTitle(title) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * FROM products
      WHERE title = $1
    `,
      [title]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(id, updates) {
  try {
    const fieldsToBeUpdated = [
      "title",
      "author",
      "price",
      "category",
      "format",
      "overview",
      "isactive",
      "qtyavailable",
      "imageurl",
    ];
    // to store the fields that are being updated
    const updateFields = [];
    // An array to store the values
    const values = [id];
    // Used forEach method to iterate over the fieldsToBeUpdated
    // Construct the updateFields and values
    fieldsToBeUpdated.forEach((field) => {
      // Check if the field exists in the updated object
      if (updates[field] !== undefined) {
        // Add the field to the updateField and push placeholder
        updateFields.push(`${field} = $${values.length + 1}`);
        values.push(updates[field]);
      }
    });
    //If no update being pushed, throw an error
    if (updateFields.length === 0) {
      throw new Error("No update being made.");
    }

    const {
      rows: [product],
    } = await client.query(
      `
    UPDATE products
    SET ${updateFields.join(", ")}
    WHERE id = $1
    RETURNING *;
  `,
      values
    );
    //  console.log(product)
    return product;
  } catch (error) {
    throw error;
  }
}

// Random Dummy Data to test my updateProduct code and will delete later

const idtoUpdate = 2;
const updates = {
  title: "Harry Potter and lame bois ",
  author: "Baajii",
  price: "60.10",
  isactive: true,
};
// updateProduct(idtoUpdate, updates)

async function destroyProduct(id) {
  try {
    const {
      rows: [deleteProduct],
    } = await client.query(
      `
    DELETE FROM products
    WHERE id = $1
    RETURNING *;
  `,
      [id]
    );

    if (!deleteProduct) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    return deleteProduct;
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

// The deleteProduct function will replace destroyProduct.
// The team decided it would be better to make a product inactive rather than delete it from the database
async function deleteProduct(id) {
  try {
    const updates = {
      isactive: false,
    };

    const updatedProduct = await updateProduct(id, updates);
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}
