const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt")

const { getAllUsers, getUserByUsername, createUser } = require("../db");

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
usersRouter.post('/register', async (req, res, next) => {
    const { username, password, useremail } = req.body;
  
    try {
      const isadmin = false;
      const _user = await getUserByUsername(username)

      if (_user) {
        res.send({
            message: `User ${username} is already taken.`,
            name: 'UserTakenError',
            error: 'UserTakenError'
        });
        throw new Error('UserTakenError')
      }

      const user = await createUser({
        username,
        useremail,
        password,
        isadmin
      });
  


      res.send({ 
        message: "thank you for signing up",
        user: {
            username: user.username,
            useremail: user.useremail
        } 
      });
    }  catch ({ name, message}) {
        next({ name, message})
      } 
  });

  // POST /api/users/login
usersRouter.post('/login', async(req, res, next) => {
  try {
    const user = await getUserByUsername(req.body.username);
      if (!user) {
        res.send({
          message: `That user does not exist, please try another username.`,
          name: 'UserDoesNotExistError',
          error: 'UserDoesNotExistError'
        });
        throw new Error('UserDoesNotExistError')
      }
      console.log(req.body.password, user.password)
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      console.log(isPasswordValid)

      if (!isPasswordValid) {
          res.send({
            message: `Error logging in, please check your information and try again.`,
            name: 'UserPasswordError',
            error: 'UserPasswordError'
          });
          throw new Error('UserPasswordError')
      }

      res.send({ message: "you're logged in!", user: user});

  } catch (error) {
      next(error);
  }
})
module.exports = usersRouter;
