// file:  DB/USER.JS

// grab our db client connection to use with our adapters
const client = require("../client");

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// add your database adapter fns here
module.exports = {
  createUser,
  getAllNonAdminUsers,
  getAllUsers,
  getGuestUserid,
  getUser,
  getUserById,
  getUserByUsername,
};

// create a new entry in the users table -  make sure to hash the password before storing it to the database
//  an empty array will be returned if username is already taken
  // if not using bcrypt, then uncomment this next line
  // const hashedPassword = password;
async function createUser({ username, useremail, password, isadmin }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
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

    console.log("createUser > user :", user);
    return user;
  } catch (error) {
    throw error;
  }
}

// return an array of all entries in the users table
async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`SELECT * FROM users;`);
    for (let i = 0; i < users.length; i++) {
      delete users[i].password;
    }
    return users;
  } catch (error) {
    throw error;
  }
}
  // select the 'guest99' users.id from users table.  return an object with id key, or null
  // sample return:  { id: 10 }
async function getGuestUserid() {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT id FROM users WHERE username=$1;
      `,
      ["guest99"]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// return an array of users that are NOT admin users (where isadmin=FALSE)
async function getAllNonAdminUsers() {
  try {
    const { rows: users } = await client.query(
      `SELECT id FROM users WHERE isadmin=FALSE;`
    );
    for (let i = 0; i < users.length; i++) {
      delete users[i].password;
    }
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: user } = await client.query(
      `SELECT * FROM users WHERE username=$1;
      `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// select a user by username/password.
// if match found, and password matches:   return the user object
//   example:  {  id: 5,  username: 'karla',  useremail: 'karla@none.com',  isadmin: false )
// if not found, or password does not match:   return null
async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return null;
    }
    const hashedPassword = user.password;
    let passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordsMatch) {
      return null;
    }
    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

// select a user using the user's username. Return the user object.
// return null if there is no matching user
async function getUserByUsername(userName) {

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE username=$1
    `,
      [userName]
    );

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

// select a user by id. Return the user object (or null if not found).  Do NOT return the password
async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT * FROM users WHERE id=${userId}
    `);

    if (!user) {
      return null;
    }

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
