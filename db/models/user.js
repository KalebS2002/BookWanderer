// grab our db client connection to use with our adapters
const client = require("../client");

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername
};

//make sure to hash the password before storing it to the database
async function createUser({ username, useremail, password, isadmin }) {
  // console.log("createUser > u : p", useremail, password);
  if (!isadmin) {
    isadmin = false;
  }
  // if not using bcrypt:
  // const hashedPassword = password;
  // inside of createUser({ username, password}) use the bcrypt hash function to generate a hashed password
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  // console.log("hashedPassword > ", hashedPassword);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (username, useremail, password, isadmin) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, useremail, hashedPassword, isadmin]
    );

    //console.log("createUser > user :", user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
    // select and return an array of all users
    const { rows: users } = await client.query(`SELECT * FROM users;`);

    return users;
  } catch (error) {
    throw error;
  }
}
async function getUserById(id) {
  try {
    const {rows: [user]} = await client.query(`
      SELECT *
      FROM users
      WHERE id = $1;
    `, [id]);
    // if it doesn't exist, return null
    if (!user) return null;
    // if it does:
    // delete the 'password' key from the returned object
    delete user.password; 
    console.log(user)
    return user;  
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  // first get the user
  try {
    const {rows} = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1;
    `, [username]);
    // if it doesn't exist, return null
    if (!rows || !rows.length) return ;

    const [user] = rows;
    delete user.password;
    console.log(user)
    return user;
  } catch (error) {
    throw error;
  }
}
