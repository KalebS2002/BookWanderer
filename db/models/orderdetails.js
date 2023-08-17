// file:  DB/ORDERS.JS

// grab our db client connection to use with our adapters
const client = require("../client");

// add your database adapter fns here
module.exports = {
  createOrderDetailItem,
  getAllOrderDetails,
  getOrderDetailsByOrderId,
  getOrderDetailsByIds,
  updateOrderDetails,
  deleteOrderDetails,
};

async function createOrderDetailItem({
  orderid,
  productid,
  quantity,
  itemprice,
}) {
  // add one new order detail item to an existing orderid
  // OUTPUT:  return an array of the orderdetails item that was added
  //          returns an empty array if there was conflict.
  try {
    const {
      rows: [OrderDetailItem],
    } = await client.query(
      `
      INSERT INTO orderdetails (orderid, productid, quantity, itemprice) 
      VALUES ($1, $2, $3, $4) 
      ON CONFLICT (orderid, productid) DO NOTHING 
      RETURNING *;
    `,
      [orderid, productid, quantity, itemprice]
    );

    return OrderDetailItem;
  } catch (error) {
    throw error;
  }
}

async function getAllOrderDetails() {
  // select and return an array of all orderdetails records
  try {
    const { rows: orderdetails } = await client.query(
      `SELECT * FROM orderdetails;`
    );

    return orderdetails;
  } catch (error) {
    throw error;
  }
}

async function getOrderDetailsByOrderId(pOrderId) {
  // select and return an array of all orderdetails records that match pOrderId
  try {
    const { rows: orderdetails } = await client.query(`
     SELECT * FROM orderdetails
     WHERE orderid=${pOrderId}
     ;`);

    return orderdetails;
  } catch (error) {
    throw error;
  }
}

async function getOrderDetailsByIds(orderid, productid) {
  // select and return one orderdetails record object matching a specific orderid and productid
  try {
    const { rows: orderdetails } = await client.query(`
     SELECT * FROM orderdetails
     WHERE orderid=${orderid}
     AND productid=${productid}
     ;`);

    return orderdetails;
  } catch (error) {
    throw error;
  }
}

async function updateOrderDetails({ orderid, productid, ...fields }) {
  // Update orderdetails entry:   orderid and primary key comprise the primary key for this table
  // remove these two primary key fields from the passedin fields object, so they are not part of setString
  delete fields.orderid;
  delete fields.productid;

  // Update quantity and/or item price
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [orderdetail],
    } = await client.query(
      `
    UPDATE orderdetails
    SET ${setString}
    WHERE orderid=${orderid}
    AND productid=${productid}
    RETURNING *;
  `,
      Object.values(fields)
    );

    return orderdetail;
  } catch (error) {
    throw error;
  }
}

async function deleteOrderDetails(orderid, productid) {
  // remove order detail record from database
  try {
    // console.log("deleteOrderDetails > :", orderid, productid);
    const { rows: orderdetail } = await client.query(
      `SELECT * FROM orderdetails
       WHERE orderid = ${orderid}
       AND productid = ${productid};`
    );

    if (!orderdetail) {
      return new Error({ message: "orderdetails record not found" });
    }

    await client.query(
      `DELETE FROM orderdetails
       WHERE orderid = ${orderid}
       AND productid = ${productid};`
    );

    console.log("DELETE complete");
    return rows;
  } catch (error) {
    throw error;
  }
}
