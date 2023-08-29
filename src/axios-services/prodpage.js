import axios from "axios";

export async function addOneItemToCart(product) {
  console.log("axios addOneItemToCart", product);
  try {
    const { data } = await axios.post("api/orders", {
      userid: sessionStorage.getItem("BWUSERID"),
      productid: product.id,
      itemprice: product.price,
      quantity: 1,
    });
    console.log("axios add > data:", data);
    data.success = false;
    if (data?.orderDetail) {
      if (data?.orderDetail[0]?.message == "NOT_ENOUGH") {
        console.log("not enough");
        alert("Sorry - there are not more of this item to add to your order.");
      } else {
        data.success = true;
        alert("Added item to cart!");
      }
    }
    return data;
  } catch (error) {
    console.error(`An error occured when adding item to cart.`);
  }
}
