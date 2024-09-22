import React from "react";
import "../componentsCSS/ProductCard.css";
import { BsCurrencyRupee } from "react-icons/bs";
import { Button } from "@mui/material";
import { useAppContext } from "../Shares/ContextFile";
import { ToastContainer, toast } from "react-toastify";
import StarRating from "./StarRating";

const ProductCard = ({ Earphones, addToCartClick }) => {
  const { cartItem, setCartItem } = useAppContext();

  const addToCartEventHandler = () => {
    const newItem = {
      name: Earphones.name,
      price: Earphones.price,
      star: Earphones.star,
      src: Earphones.src,
      quantity: 1,
    };

    setCartItem([...cartItem, newItem]);
    toast.promise(Promise.resolve(), {
      success: `${Earphones.name} added to cart successfully`,
      type: "success",
      autoClose: 3000,
    });
  };

  return (
    <React.Fragment>
      <div className="product-card">
        <img src={Earphones.src} alt="" height={150} width={300} />
        <h3>{Earphones.name}</h3>
        <div className="rating">
          <span>
            <StarRating star={Earphones.star} />
          </span>
          <span className="review">({Earphones.customerReviews} Reviews)</span>
        </div>
        <div className="button-container">
          <button className="purchase-button">
            <BsCurrencyRupee className="rupee-icon" />
            <span>{Earphones.price}</span>
          </button>
          <button
            className="card-button"
            style={{
              backgroundColor: "#ff9900",
              color: "white",
              padding: " 8px 0 8px 0",
            }}
            onClick={addToCartEventHandler}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default ProductCard;
