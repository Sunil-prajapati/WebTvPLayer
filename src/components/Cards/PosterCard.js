import React from "react";
import noPoster from "../../assets/images/noPoster.png";
import "../../styles/component/posterCard.scss";
import PropTypes from "prop-types";
import { addDefaultSrc } from "../../constant/helper";

export default function PosterCard({ image }) {
  return (
    <div className="poster-card-container">
      <img
        src={image ? image : noPoster}
        className="poster-card"
        alt="movie poster"
        onError={addDefaultSrc}
      />
    </div>
  );
}

PosterCard.propTypes = {
  image: PropTypes.any,
};
PosterCard.defaultProps = {
  image: noPoster,
};
