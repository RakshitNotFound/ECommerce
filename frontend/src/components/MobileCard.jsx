import React from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import "../componentsCSS/ProductCard.css";
import { useAppContext } from "../Shares/ContextFile";
import { ToastContainer, toast } from "react-toastify";
import StarRating from "./StarRating";

const MobileCard = ({ Mobile }) => {
  const { cartItem, setCartItem } = useAppContext();

  const cartEventHandler = () => {
    const newItem = {
      name: Mobile.name,
      price: Mobile.price,
      star: Mobile.star,
      src: Mobile.src,
      quantity: 1,
    };
    setCartItem([...cartItem, newItem]);

    toast.promise(Promise.resolve(), {
      success: `${Mobile.name} added to cart successfully`,
      type: "success",
      autoClose: 3000,
    });
  };

  return (
    <React.Fragment>
      <div className="product-card">
        <img src={Mobile.src} alt="" height={150} width={300} />
        <h3>{Mobile.name}</h3>
        <div className="rating">
          <span>
            <StarRating star={Mobile.star} />
          </span>
          <span className="review">({Mobile.customerReviews} Reviews)</span>
        </div>
        <div className="button-container">
          <button className="purchase-button">
            <BsCurrencyRupee className="rupee-icon" />
            <span>{Mobile.price}</span>
          </button>
          <button
            className="card-button"
            style={{ backgroundColor: "#ff9900", color: "white" }}
            onClick={cartEventHandler}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default MobileCard;
