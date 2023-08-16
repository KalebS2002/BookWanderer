const express = require("express");
const usersRouter = express.Router();

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
router.post('/register', async (req, res, next) => {
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

module.exports = usersRouter;
