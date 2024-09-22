import React, { useState } from "react";
import AddToCart from "./AddToCart";
import { useAppContext } from "../Shares/ContextFile";
import "../componentsCSS/AddToCartList.css";
import { BsCurrencyRupee } from "react-icons/bs";
import logo from "../Images/logo.png";
import Loader from "./Loader";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const AddToCartList = () => {
  const {
    cartItem,
    setCartItem,
    quantity,
    name,
    email,
    mobile,
    loading,
    setLoading,
  } = useAppContext();
  const [serialNo, setSerialNo] = useState(1);

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItem.filter((_, index) => index !== indexToRemove);
    setCartItem(updatedCart);
  };

  const total = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  async function displayRazorpay() {
    setLoading(true);
    const amount = total.toFixed(2);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch(
      "https://ecommerce-final-0fez.onrender.com/razorpay",
      {
        method: "POST",
        body: JSON.stringify({ price: total.toFixed(2) }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((t) => t.json());

    console.log(data);

    const options = {
      key: "rzp_test_1E5NDzeBvqbYBb",
      currency: data.currency,
      amount: amount.toString(),
      order_id: data.id,
      orderName: "Shopping",
      description: "Please complete payment to receive order of the product",
      image: `${logo}`,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        userName: `${name}`,
        email: `${email}`,
        phone_number: `${mobile}`,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  }

  return (
    <React.Fragment>
      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <div className="add-cart-list">
        <h2 className="cart-title">Shopping Cart</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItem.map((cartItem, index) => (
              <tr key={index}>
                <AddToCart
                  cartItem={cartItem}
                  serialNo={serialNo + index}
                  onRemove={() => removeItem(index)}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-summary">
          <div className="cart-summary-item">
            <span>Total Price:</span>
            <div>
              <BsCurrencyRupee />
              <span className="price" value={total.toFixed(2)}>
                {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <button
          className="order-now-button"
          onClick={displayRazorpay}
          target="_blank"
        >
          Order Now
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddToCartList;
