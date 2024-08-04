import React from "react";
import PropTypes from "prop-types";

export default function Line({ className, color }) {
  return <div className={`W-[100%] h-[1px] ${color} ${className}`}></div>;
}

Line.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};
Line.defaultProps = {
  color: "bg-grey-100",
};
