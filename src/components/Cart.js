import React, { Component, useEffect, useState } from "react";
import "../style/Cart.css";


import LandingPage_Background from "../Images/BookWanderer_LandingPageBackground.png";
import Footer from "./Footer";

let CustomerCart = []

/*

  The Problem:
  1.) We need to add a Checkout button at the bottom of Cart.Js page that will caculate the total and send it over to checkout.js.
  2.) To do this, we need to add up the sum of all items in Cart.js

  3.) Add a button inside of the footer.js.
  How can we change the footer?..


*/

async function deleteFromCart(event) {
  let order = document.getElementById(event.target.parentNode.id)
  let productid
  order.remove()

  for (let key in CustomerCart) {
    if (CustomerCart[key].id === Number(order.id)) {
      CustomerCart.splice(CustomerCart[key], 1)
    }
  }
}

async function EditQuantity(event, order) {

  let QuantityHTML = event.target.parentNode.querySelector('#Quantity')
  let Total = event.target.parentNode.querySelector
  for (let key in CustomerCart) {
    if (CustomerCart[key].productid === order.productid) {
      let newQuantity = 0
      if (event.target.id === 'AddQuantity') {

        newQuantity = Number(order.quantity) + Number(1)
        order.quantity = newQuantity
      } else if (event.target.id === 'SubtractQuantity') {

        newQuantity = Number(order.quantity) - Number(1)
        order.quantity = newQuantity
      }
      console.log(newQuantity)
      try {
        const response = await fetch(`api/orderdetails/${order.orderid}/${order.productid}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify({ "quantity": newQuantity })
        })
        const result = await response.json()

        QuantityHTML.innerHTML = `Quantity: ${newQuantity}`



      } catch (error) {
        console.error(`An error has occured when Adding/Subtracting the quanity ${error} : EditQuanity`)
      }
    }

  }

}

export async function addToCart(purchaceAmount, order, stockImg) {
  console.log('Adding To Cart')

  let NewOrder = {
    id: order.id,
    title: order.title,
    author: order.author,
    img: stockImg,
    price: order.price,
    amount: purchaceAmount,
    total: null,
  }

  let OrderFound = false
  for (let key in CustomerCart) {

    if (CustomerCart[key].id === NewOrder.id) {
      CustomerCart[key].amount = Number(CustomerCart[key].amount) + Number(purchaceAmount)
      CustomerCart[key].total = Number(CustomerCart[key].price) * Number(CustomerCart[key].amount)
      OrderFound = true
      break
    }
  }
  if (!OrderFound) {
    NewOrder.total = Number(NewOrder.price) * Number(NewOrder.amount)
    CustomerCart.push(NewOrder)
  }
  console.log('Added')
}

function Cart() {
  let isLoggedIn = localStorage.getItem('isLoggedIn')
  let user_Id = null
  const [CustomerCart, setCustomerCart] = useState('')

  if (!isLoggedIn) {
    user_Id = '1'
  } else {
    user_Id = '11'
  }


  async function EditQuantity(event, order) {

    let QuantityHTML = event.target.parentNode.querySelector('#Quantity')
    let Total = event.target.parentNode.querySelector
    for (let key in CustomerCart) {
      if (CustomerCart[key].productid === order.productid) {
        let newQuantity = 0
        if (event.target.id === 'AddQuantity') {

          newQuantity = Number(order.quantity) + Number(1)
          order.quantity = newQuantity
        } else if (event.target.id === 'SubtractQuantity') {

          newQuantity = Number(order.quantity) - Number(1)
          order.quantity = newQuantity
        }
        console.log(newQuantity)
        try {
          const response = await fetch(`api/orderdetails/${order.orderid}/${order.productid}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": 'application/json',
            },
            body: JSON.stringify({ "quantity": newQuantity })
          })
          const result = await response.json()

          QuantityHTML.innerHTML = `Quantity: ${newQuantity}`



        } catch (error) {
          console.error(`An error has occured when Adding/Subtracting the quanity ${error} : EditQuanity`)
        }
      }

    }

  }

  async function getUserOrders(user_Id) {

    try {
      const response = await fetch(`http://localhost:4000/api/orders/status/current/${user_Id}`)
      const result = await response.json()
      const userOrders = result.userOrders

      for (let key in userOrders) {
        if (userOrders[key].userid === Number(user_Id)) {
          return userOrders[key].orderdetails
        }
      }


    } catch (error) {
      console.error(
        `An Error Has Occured Fetching The OrderDetails database ${error} : addToCart`
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      let orderDetails = await getUserOrders(user_Id)
      setCustomerCart(orderDetails)
    }
    fetchData()

  }, []);

  if (CustomerCart.length === 0) {


    return (
      <div id="EmptyCart">
        <h2 className="Title">Your Cart is Empty!</h2>
        <img className="Background" src={LandingPage_Background}></img>

      </div>
    )


  } else {

  }
  console.log(CustomerCart)
  return (
    <div id="FullCart">
      {CustomerCart.map((product) => {
        console.log(product)
        return (
          <ul key={product.productid}>
            <div id={product.orderid} className="order">
              <p id="Title" className="content">Title: {product.title}  </p>
              <p id="Author" className="content">Author: {product.author}</p>
              <img src={product.imageurl} className="content"></img>
              <section id="QuanitySection">
                <p id="Quantity" className="content">Quantity: {product.quantity}</p>
                <button id="AddQuantity" className="content" onClick={(e) => (EditQuantity(e, product))}>+</button>
                <button id="SubtractQuantity" className="content" onClick={(e) => (EditQuantity(e, product))}>-</button>
              </section>

              <p id="Price" className="content">Price: ${product.itemprice}</p>

              <button
                id="remove"
                className="content"
                onClick={deleteFromCart}
              >
                Remove
              </button>
            </div>
          </ul>

        );
      })}
      <Footer page={'Cart'} />
    </div>
  );

}

export default Cart