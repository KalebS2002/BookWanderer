console.log("Entered init_db : ", Date.now());
const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

const { createUser, createProduct } = require("../db/models");
const {
  createFakeUserObject,
  createFakeFixedUser,
  createFakeProductsObject,
} = require("./FakerData");

async function buildTables() {
  console.log("Entered buildTables : ", Date.now());
  console.time("buildTables");
  try {
    client.connect();
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS orderdetail;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);

    // build tables in correct order

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        useremail VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        isadmin BOOLEAN DEFAULT false
      );
    `);

    await client.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      isactive BOOLEAN DEFAULT true,
      qtyavailable INTEGER NOT NULL,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      price DECIMAL(9,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      format VARCHAR(255) NOT NULL,
      imageurl VARCHAR(255),
      overview VARCHAR(2000)
    );
  `);

    await client.query(`
    CREATE TABLE categories (
     categoryname VARCHAR(255) PRIMARY KEY
  );
`);
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Entered createInitialUsers : ", Date.now());
  // create fake admin user
  const admObj = {
    username: "bigminda",
    useremail: "bigminda@none.com",
    password: "12345",
    isadmin: true,
  };
  await createUser(admObj);
  // create fake users with random info (see FakeData.js)
  for (let i = 0; i < 3; i++) {
    await createUser(createFakeUserObject());
  }
  for (i = 0; i < 5; i++) {
    await createUser(createFakeFixedUser(i));
  }
  console.log("Finished creating users!");
}

async function createInitialProducts() {
  for (let i = 0; i < 25; i++) {
    await createProduct(createFakeProductsObject());
  }
  console.log("Finished creating products!");
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    await createInitialUsers();
    await createInitialProducts();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
