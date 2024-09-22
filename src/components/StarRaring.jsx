import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ star }) => {
  const style = {
    color: "golden",
  };
  const maxStars = 5;
  const starIcons = [];

  const roundedRating = Math.round(star * 2) / 2;

  for (let i = 1; i <= maxStars; i++) {
    if (i <= roundedRating) {
      starIcons.push(<FaStar style={{ style }} key={i} />);
    } else if (i - 0.5 === roundedRating) {
      starIcons.push(<FaStarHalfAlt style={{ style }} key={i} />);
    } else {
      starIcons.push(<FaRegStar style={{ style }} key={i} />);
    }
  }

  return (
    <div className="star-rating">
      {starIcons.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};

export default StarRating;
