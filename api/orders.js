const express = require("express");
const ordersRouter = express.Router();

const {
  getAllOrders,
  getAllOrdersByUser,
  getOrderByOrderId,
} = require("../db");

ordersRouter.use((req, res, next) => {
  console.log("A request is being made to /api/orders - next() is called ...");
  next();
});

// GET /api/orders - Return a list of all orders
ordersRouter.get("/", async (req, res, next) => {
  console.log("A request is being made to GET /api/orders ...");
  // console.log("req.body is ", req.body);
  try {
    const orders = await getAllOrders();
    res.send({ orders });
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:username - Get a list of all orders for specified user, include orderdetails
ordersRouter.get("/:username", async (req, res, next) => {
  console.log("A request is being made to GET /orders/username/:username ...");
  console.log("req.params : ", req.params);
  console.log("req.body : ", req.body);

  try {
    const userOrders = await getAllOrdersByUser({
      username: req.params.username,
    });

    res.send({ userOrders });
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/id/:id - Get an order matching id, include orderdetails
ordersRouter.get("/id/:id", async (req, res, next) => {
  console.log("A request is being made to GET /orders/id/:id ...");
  console.log("req.params : ", req.params);
  console.log("req.body : ", req.body);

  try {
    const userOrder = await getOrderByOrderId({ id: parseInt(req.params.id) });

    res.send({ userOrder });
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
