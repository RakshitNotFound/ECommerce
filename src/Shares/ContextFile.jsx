import React, { createContext, useContext, useState, useEffect } from "react";

export const Context = createContext();

export function useAppContext() {
  return useContext(Context);
}

const ContextFile = (props) => {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState([0, 50000]);
  const [found, setFound] = useState(false);
  const [isClickOnAscending, setIsClickOnAscending] = useState(false);
  const [isClickOnDescending, setIsClickOnDescending] = useState(false);
  const [isClickOnPrice, setIsClickOnPrice] = useState(false);
  const [isClickOnRating, setIsClickOnRating] = useState(false);
  const [isClickOnClearButton, setIsClickOnClearButton] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("cartItem");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [serialNo, setSerialNo] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    // console.log(cartItem);
  }, [cartItem]);

  // console.log(cartItem);
  return (
    <Context.Provider
      value={{
        query,
        setQuery,
        range,
        setRange,
        found,
        setFound,
        isClickOnAscending,
        setIsClickOnAscending,
        isClickOnDescending,
        setIsClickOnDescending,
        isClickOnPrice,
        setIsClickOnPrice,
        isClickOnClearButton,
        setIsClickOnClearButton,
        cartItem,
        setCartItem,
        serialNo,
        setSerialNo,
        quantity,
        setQuantity,
        isLogIn,
        setIsLogIn,
        name,
        setName,
        isClickOnRating,
        setIsClickOnRating,
        email,
        setEmail,
        mobile,
        setMobile,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextFile;
