import React from "react";
import PropTypes from "prop-types";
import LabelText from "../typography/labelText";
import "../../styles/component/heading.scss";

export default function Heading({ heading,className }) {
  return (
    <div className={`movie-info-container ${className}`}>
      <LabelText
        text={heading}
        fontSize="lg:text-3xl text-lg"
        textColor="text-white"
        className="lg:py-2 py-1 lg:px-5 px-1"
        textAlign="text-center"
      />
    </div>
  );
}

Heading.propTypes = {
  heading: PropTypes.string,
  className: PropTypes.string
};
Heading.defaultProps = {
  heading: "HEADING",
};
