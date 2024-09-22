import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import "../componentsCSS/filter.css";
import { useContext } from "react";
import { Context, useAppContext } from "../Shares/ContextFile";
import { ImSortAlphaAsc, ImSortAlphaDesc } from "react-icons/im";
import { PiSortAscendingThin } from "react-icons/pi";
import { FaSortUp } from "react-icons/fa";

const Filter = () => {
  const { range, setRange } = useContext(Context);
  function handleChanges(event, newValue) {
    setRange(newValue);
  }

  const {
    isClickOnAscending,
    isClickOnDescending,
    isClickOnPrice,
    isClickOnRating,
    setIsClickOnAscending,
    setIsClickOnDescending,
    setIsClickOnPrice,
    setIsClickOnClearButton,
    setIsClickOnRating,
  } = useAppContext();
  const [sortedDropDown, setSortedDropDown] = useState(false);

  const sliderStyle = {
    marginLeft: "55px",
    position: "absolute",
    width: "15rem",
    marginTop: "20px",
  };

  const sortQueryHandler = () => {
    if (sortedDropDown === false) {
      setSortedDropDown(true);
    } else {
      setSortedDropDown(false);
    }
  };
  const sortAscending = () => {
    if (isClickOnAscending === false) {
      setIsClickOnAscending(true);
      setIsClickOnDescending(false);
      setIsClickOnPrice(false);
      setIsClickOnRating(false);
    }
  };

  const sortDescending = () => {
    if (isClickOnDescending === false) {
      setIsClickOnDescending(true);
      setIsClickOnAscending(false);
      setIsClickOnPrice(false);
      setIsClickOnRating(false);
    }
  };
  const sortByPrice = () => {
    if (isClickOnPrice === false) {
      setIsClickOnPrice(true);
      setIsClickOnAscending(false);
      setIsClickOnDescending(false);
      setIsClickOnRating(false);
    }
  };
  const clearButtonHandler = () => {
    setIsClickOnClearButton(true);
    setIsClickOnAscending(false);
    setIsClickOnDescending(false);
    setIsClickOnPrice(false);
    setIsClickOnRating(false);
  };

  const sortByRating = () => {
    if (isClickOnRating === false) {
      setIsClickOnRating(true);
      setIsClickOnAscending(false);
      setIsClickOnDescending(false);
      setIsClickOnPrice(false);
    }
  };

  return (
    <React.Fragment>
      <div className="wrapper-class">
        <div style={{ width: "15rem", padding: "20px", marginTop: "20px" }}>
          <div className="slider">
            <h3>Price</h3>
            <div className="slider-box">
              <Slider
                value={range}
                onChange={handleChanges}
                valueLabelDisplay="auto"
                min={0}
                max={30000}
                style={sliderStyle}
              />
            </div>
          </div>
        </div>
        <div className="sort" style={{ zIndex: "10" }}>
          <ul>
            <li className="drop-down-list">
              <button className="sort-name" onClick={sortQueryHandler}>
                Sort
              </button>
              {sortedDropDown && (
                <ul className="drop-down">
                  <li>
                    <button className="sort-name" onClick={sortAscending}>
                      <ImSortAlphaAsc className="drop-down-icon" /> Ascending
                    </button>
                  </li>
                  <li>
                    <button className="sort-name" onClick={sortDescending}>
                      <ImSortAlphaDesc className="drop-down-icon" /> Descending
                    </button>
                  </li>
                  <li>
                    <button className="sort-name" onClick={sortByPrice}>
                      <PiSortAscendingThin className="drop-down-icon" /> Price
                    </button>
                  </li>
                  <li>
                    <button className="sort-name" onClick={sortByRating}>
                      <FaSortUp className="drop-down-icon" /> Rating
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className="clear-button-div">
          <button className="clear-button" onClick={clearButtonHandler}>
            Clear Filter
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
