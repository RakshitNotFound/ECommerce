import React from "react";
import MobileCard from "./MobileCard";
import { Mobiles } from "../Shares/Constants";
import "../componentsCSS/ProductList.css";
import { useAppContext } from "../Shares/ContextFile";

const MobileList = () => {
  const {
    range,
    found,
    query,
    isClickOnAscending,
    isClickOnDescending,
    isClickOnPrice,
    isClickOnRating,
  } = useAppContext();

  let filteredProduct = Mobiles.filter(
    (mobile) =>
      mobile.price >= range[0] &&
      mobile.price <= range[1] &&
      mobile.name?.toLowerCase().includes(query.toLowerCase())
  );
  if (isClickOnAscending === true) {
    filteredProduct = [...filteredProduct].sort((a, b) =>
      a.name?.toLowerCase().localeCompare(b.name)
    );
  }

  if (isClickOnDescending === true) {
    filteredProduct = [...filteredProduct].sort((a, b) =>
      b.name?.toLowerCase().localeCompare(a.name)
    );
  }

  if (isClickOnPrice === true) {
    filteredProduct = [...filteredProduct].sort((a, b) => a.price - b.price);
  }
  if (isClickOnRating === true) {
    filteredProduct = [...filteredProduct].sort((a, b) => b.star - a.star);
  }
  return (
    <React.Fragment>
      {found ? (
        <h2 style={{ textAlign: "center" }}>Product Not Found</h2>
      ) : (
        <div className="earphone-list">
          {filteredProduct.map((mobile, index) => (
            <MobileCard key={index} Mobile={mobile} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default MobileList;
