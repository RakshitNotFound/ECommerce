import ProductCard from "./ProductCard";
import { Earphones } from "../Shares/Constants";
import "../componentsCSS/ProductList.css";
import { useAppContext } from "../Shares/ContextFile";
import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [found, setFound] = useState(false);
  const {
    range,
    query,
    isClickOnAscending,
    isClickOnDescending,
    isClickOnPrice,
    isClickOnRating,
  } = useAppContext();

  let filteredEarphones = Earphones.filter(
    (earphone) =>
      earphone.price >= range[0] &&
      earphone.price <= range[1] &&
      earphone.name?.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (filteredEarphones.length === 0) {
      setFound(true);
    } else {
      setFound(false);
    }
  }, [filteredEarphones]);

  if (isClickOnAscending === true) {
    filteredEarphones = [...filteredEarphones].sort((a, b) =>
      a.name?.toLowerCase().localeCompare(b.name)
    );
  }

  if (isClickOnDescending === true) {
    filteredEarphones = [...filteredEarphones].sort((a, b) =>
      b.name?.toLowerCase().localeCompare(a.name)
    );
  }

  if (isClickOnPrice === true) {
    filteredEarphones = [...filteredEarphones].sort(
      (a, b) => a.price - b.price
    );
  }

  if (isClickOnRating === true) {
    filteredEarphones = [...filteredEarphones].sort((a, b) => b.star - a.star);
  }

  return (
    <React.Fragment>
      {found ? (
        <h2 className="not-found">Product Not Found</h2>
      ) : (
        <div className="earphone-list">
          {filteredEarphones.map((earphone, index) => (
            <ProductCard key={index} Earphones={earphone} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductList;
