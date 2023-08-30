const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");



const {
  createUser,
  getAllUsers,
  getUserByUsername,
  updateCurrentGuestOrderForExistingUser,
  updateCurrentGuestOrderForNewUser,
} = require("../db");


const {requireUser} = require('./adminAccess')


usersRouter.use((req, res, next) => {
  console.log("A request is being made to /api/users - next() is called ...");
  next();
});

// GET /api/users - Return a list of all users
usersRouter.get("/", async (req, res, next) => {
  console.log("A request is being made to GET /api/users ...");
  // console.log("req.body is ", req.body);
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  //Destructures the request body and parses out username, password, and useremail
  const { username, password, useremail } = req.body;

  //Attempt to create the user in the database
  try {
    const isadmin = false;
    //check to see if username already exists in database
    const _user = await getUserByUsername(username);

    //If there is an existing user with the username, return an error
    if (_user) {
      return next({
        message: `User ${username} is already taken.`,
        name: "UserTakenError",
        error: "UserTakenError",
      });
    }

    //Create the new user
    const user = await createUser({
      username,
      useremail,
      password,
      isadmin,
    });

    //Updates current guest order for new user
    await updateCurrentGuestOrderForNewUser(user.id);

    //Send back successful response with user and message
    res.send({
      message: "REGISTRATION SUCCESSFUL!  Thank you for signing up",
      user: {
        userid: user.id,
        username: user.username,
        useremail: user.useremail,
      },
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  try {
    //Gets user if exists in database by the request body's username
    const user = await getUserByUsername(req.body.username);

    //If the user does not exist, send back an error
    if (!user) {
      return next({
        message: "That user does not exist, please try another username.",
      });
    }

    //Compare the request body's username and the encrypted database password for the respective user
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //If passwords do not match, send back an error
    if (!isPasswordValid) {
      return next({
        message:
          "ERROR:  password does not match. Please check your information and try again.",
      });
    }

    //Remove unnessecary information from user object
    delete user.password;
    delete user.isadmin;

  //Updates current guest order for new user
    await updateCurrentGuestOrderForExistingUser(user.id);
    console.log(user);
    
    //Send back successful response with user and message
    res.send({ user, message: "SUCCESSFULLY logged in!" });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me
usersRouter.get('/me', async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error)
  }
})


module.exports = usersRouter;
