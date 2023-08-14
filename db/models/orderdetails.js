// file:  DB/ORDERS.JS

// grab our db client connection to use with our adapters
const client = require("../client");

// add your database adapter fns here
module.exports = {
  createOrderDetailItem,
  getAllOrderDetails,
  getOrderDetailsByOrderId,
  getOrderDetailsByIds,
  deleteOrderDetails,
};

async function createOrderDetailItem({
  orderid,
  productid,
  quantity,
  itemprice,
}) {
  // add one new order detail item to an existing orderid
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
  // select and return one orderdetails record matching orderid and productid
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

// async function updateRoutineActivity({ id, ...fields }) {
//   // Find the routine_activity with id equal to the passed in id

//   delete fields.id; // remove id from the fields object, so it is not part of setString
//   // console.log("updateRoutineActivity > id : ", id);
//   // console.log("updateRoutineActivity > fields : ", fields);

//   // Update the count or duration as necessary
//   const setString = Object.keys(fields)
//     .map((key, index) => `"${key}"=$${index + 1}`)
//     .join(", ");
//   // console.log("updateRoutineActivity > setString: ", setString);
//   // return early if this is called without fields
//   if (setString.length === 0) {
//     return;
//   }

//   try {
//     const {
//       rows: [routine_activity],
//     } = await client.query(
//       `
//     UPDATE routine_activities
//     SET ${setString}
//     WHERE id=${id}
//     RETURNING *;
//   `,
//       Object.values(fields)
//     );
//     // console.log(
//     //   "updateRoutineActivity > routine_activity : ",
//     //   routine_activity
//     // );
//     return routine_activity;
//   } catch (error) {
//     throw error;
//   }
// }

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
