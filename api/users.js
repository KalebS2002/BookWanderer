const express = require("express");
const usersRouter = express.Router();

const { getAllUsers } = require("../db");

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

module.exports = usersRouter;
