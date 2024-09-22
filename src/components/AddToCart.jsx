import React from "react";
import "../componentsCSS/AddToCart.css";
import {
  AiFillDelete,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { useAppContext } from "../Shares/ContextFile";

const AddToCart = ({ cartItem, serialNo, onRemove }) => {
  const { setCartItem } = useAppContext();

  const decreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      setCartItem((prevCart) =>
        prevCart.map((item) =>
          item === cartItem ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const increaseQuantity = () => {
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item === cartItem ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  return (
    <React.Fragment>
      <td className="serial-no">{serialNo}</td>
      <td className="product-name">
        <img
          className="product-image"
          src={cartItem.src}
          height={25}
          width={25}
          alt="product imag"
          style={{ marginRight: "20px" }}
        />
        {cartItem.name}
      </td>
      <td className="quantity">
        {" "}
        <AiOutlineMinusCircle
          className="decrement-quantity"
          onClick={decreaseQuantity}
        />
        {cartItem.quantity + " "}
        <AiOutlinePlusCircle
          className="increment-quantity"
          onClick={increaseQuantity}
        />
      </td>
      <td className="price">{cartItem.price}</td>
      <td className="remove-button" onClick={onRemove}>
        <AiFillDelete />
      </td>
    </React.Fragment>
  );
};

export default AddToCart;
