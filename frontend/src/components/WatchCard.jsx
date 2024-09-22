import React from "react";
import "../componentsCSS/ProductCard.css";
import { BsCurrencyRupee } from "react-icons/bs";
import { useAppContext } from "../Shares/ContextFile";
import { ToastContainer, toast } from "react-toastify";
import StarRating from "./StarRating";

const WatchCard = ({ watch }) => {
  const { cartItem, setCartItem } = useAppContext();

  const cartEventHandler = () => {
    const newItem = {
      name: watch.name,
      price: watch.price,
      star: watch.star,
      src: watch.src,
      quantity: 1,
    };
    setCartItem([...cartItem, newItem]);

    toast.promise(Promise.resolve(), {
      success: `${watch.name} added to cart successfully`,
      type: "success",
      autoClose: 3000,
    });
  };

  return (
    <React.Fragment>
      <div className="product-card">
        <img src={watch.src} alt="" height={150} width={300} />
        <h3>{watch.name}</h3>
        <div className="rating">
          <span>
            <StarRating star={watch.star} />
          </span>
          <span className="review">({watch.customerReviews} Reviews)</span>
        </div>
        <div className="button-container">
          <button className="purchase-button">
            <BsCurrencyRupee className="rupee-icon" />
            <span>{watch.price}</span>
          </button>
          <button
            className="card-button"
            style={{ backgroundColor: "#ff9900", color: "white" }}
            onClick={cartEventHandler}
          >
            Add to cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default WatchCard;
