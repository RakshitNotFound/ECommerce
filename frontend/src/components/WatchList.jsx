import React, { useEffect, useState } from "react";
import { watch } from "../Shares/Constants";
import WatchCard from "./WatchCard";
import { useAppContext } from "../Shares/ContextFile";

const WatchList = () => {
  const {
    range,
    query,
    isClickOnAscending,
    isClickOnDescending,
    isClickOnPrice,
    isClickOnRating,
  } = useAppContext();

  const [found, setFound] = useState(false);

  let filteredProduct = watch.filter(
    (watch) =>
      watch.price >= range[0] &&
      watch.price <= range[1] &&
      watch.name?.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (filteredProduct.length === 0) {
      setFound(true);
    } else {
      setFound(false);
    }
  }, [filteredProduct]);

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
          {filteredProduct.map((watches, index) => (
            <WatchCard key={index} watch={watches} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default WatchList;
