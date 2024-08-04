import React from "react";
import PropTypes from "prop-types";
import { COLORS } from "../../constant/enum";
import ReactStars from "react-rating-stars-component";
import Rating from "../../assets/svg/rating.js";
import "../../styles/component/starRating.scss";
import HalfStar from "../../assets/svg/halfStart";
import { screenWidth } from "../../constant/helper";

export default function StarRating({ rating }) {
  return (
    <div className=" start-rating-container lg:mt-5 mt-2">
      <ReactStars
        count={5}
        size={screenWidth > 860 ? 43 : 26}
        activeColor={COLORS.BRIGHT_YELLOW}
        isHalf={true}
        value={rating}
        edit={false}
        emptyIcon={<Rating />}
        fullIcon={<Rating fill={COLORS.BRIGHT_YELLOW} />}
        halfIcon={<HalfStar />}
      />
    </div>
  );
}
StarRating.propTypes = {
  rating: PropTypes.number,
};

StarRating.defaultProps = {
  rating: 0,
};
