const express = require("express");
const orderdetailsRouter = express.Router();

const {
  getAllOrderDetails,
  getOrderDetailsByIds,
  deleteOrderDetails,
} = require("../db");

orderdetailsRouter.use((req, res, next) => {
  console.log(
    "A request is being made to /api/orderdetails - next() is called ..."
  );
  next();
});

// GET /api/orderdetails - Return a list of all orderdetails
orderdetailsRouter.get("/", async (req, res, next) => {
  console.log("A request is being made to GET /api/orderdetails ...");
  // console.log("req.body is ", req.body);
  try {
    const orderdetails = await getAllOrderDetails();
    res.send({ orderdetails });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/orderdetails/:orderid/:productid
orderdetailsRouter.delete("/:orderid/:productid", async (req, res, next) => {
  console.log("A request is being made to DELETE /orderdetails ...");
  console.log("req.params : ", req.params);
  let orderid = parseInt(req.params.orderid);
  let productid = parseInt(req.params.productid);

  try {
    const deletedItem = await getOrderDetailsByIds(orderid, productid);

    if (!deletedItem) {
      next(new Error({ message: "no orderdetail record to delete" }));
      return;
    }

    await deleteOrderDetails(orderid, productid);

    res.send({
      message: "OrderDetails record successfully deleted!",
      ...deletedItem,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = orderdetailsRouter;
