// file:  DB/ORDERS.JS

// grab our db client connection to use with our adapters
const client = require("../client");
const { getUserById, getUserByUsername } = require("./user");

// add your database adapter fns here
module.exports = {
  createOrder,
  getAllOrders,
  attachDetailsToOrders,
  getAllOrdersByUser,
  getOrderByOrderId,
  getUserOrdersByStatus,
};

let currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

async function createOrder({ status, userid, lastupdate }) {
  // add a new order.  Newly created orders will always be status="CURRENT"
  if (!status) status = "CURRENT";
  if (!lastupdate) lastupdate = currentDate;
  if (!userid) userid = 0; // 0 = guest user

  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders (status, userid, lastupdate) 
      VALUES($1, $2, $3) 
      RETURNING *;
    `,
      [status, userid, lastupdate]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  // select and return an array of all orders
  try {
    const { rows: orders } = await client.query(`
    SELECT orders.id, status, userid, u.username, lastupdate
      FROM orders
      JOIN users u ON u.id=orders.userid
    ;`);

    return orders;
  } catch (error) {
    throw error;
  }
}

async function attachDetailsToOrders(orders) {
  // INPUT:  orders - array of order objects
  // OUTPUT: orders - array of order objects with orderdetails attached
  // for each order, attach an array of corresponding orderdetails
  try {
    // sample return for ONE order that has THREE items in ORDERDETAIL:
    //  { id: 11,  status: 'PURCHASED',  userid: 4, username: 'karla',
    //     lastupdate: 2023-08-07T05:00:00.000Z,
    //     orderdetails: [
    //      { orderid: 11,  productid: 42,  quantity: 4, itemprice: '21.89',
    //        title: 'Electronic Concrete Chicken',
    //        author: 'Joannie Hayes' },
    //      { orderid: 11,  productid: 48,  quantity: 1, itemprice: '60.27',
    //        title: 'Licensed Plastic Cheese',
    //        author: 'Ottilie Goyette' },
    //      { orderid: 11,  productid: 52,  quantity: 4, itemprice: '36.43',
    //        title: 'Rustic Metal Table',
    //        author: 'Jamal Tillman' },   ]   }

    for (let i = 0; i < orders.length; i++) {
      let _user = await getUserById(orders[i].userid);
      // add username key to each order object
      orders[i].username = _user.username;
      // get all orderdetails for this order
      let orderid = orders[i].id;

      let qryStr = `SELECT
        od.orderid AS orderid,
        od.productid AS productid,
        od.quantity AS quantity,
        od.itemprice AS itemprice,
        prod.title AS title,
        prod.author AS author
        FROM orderdetails AS od
        JOIN products prod ON prod.id=od.productid
        WHERE od.orderid=${orderid} ;`;

      let { rows: orderdetails } = await client.query(qryStr);

      // attach the orderdetails array to the orders object
      orders[i].orderdetails = orderdetails;
    }

    return;
  } catch (error) {
    throw error;
  }
}

async function getAllOrdersByUser({ username }) {
  // select and return an array of all orders made by user, include their orderdetails

  try {
    const user = await getUserByUsername(username);

    const { rows: orders } = await client.query(
      `SELECT * FROM orders WHERE userid = ${user.id};`
    );

    await attachDetailsToOrders(orders);

    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrderByOrderId({ id }) {
  // select and return an order matching the supplied id, include orderdetails

  try {
    const { rows: orders } = await client.query(
      `SELECT * FROM orders WHERE id = ${id};`
    );

    await attachDetailsToOrders(orders);

    return orders;
  } catch (error) {
    throw error;
  }
}

async function getUserOrdersByStatus(status, userid) {
  // select and return an array of orders for the current user, include orderdetails
  // if userid is not passed as a parameter, try to get it from the global BWUSERID
  console.log("getUserOrdersByStatus > ", status, userid);
  if (!userid) {
    let userid = sessionStorage.getItem("BWUSERID");
  }
  if (!userid || userid < 1) return [];
  // make sure userid is an integer, and status is uppercase
  userid = parseInt(userid);
  status = status.toUpperCase();

  try {
    const { rows: orders } = await client.query(
      `
    SELECT * FROM orders
      WHERE status=$1
      AND userid=${userid}
    ;`,
      [status]
    );

    await attachDetailsToOrders(orders);
    return orders;
  } catch (error) {
    throw error;
  }
}
