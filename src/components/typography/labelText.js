import React from "react";
import PropTypes from "prop-types";

export default function LabelText({
  text,
  fontSize,
  textColor,
  fontWeight,
  textAlign,
  className,
  noWrap,
  lineheight,
}) {
  return (
    <p
      className={`${fontSize} ${textColor} ${fontWeight} ${textAlign} ${className} ${lineheight} ${noWrap ? 'whitespace-nowrap':''} label-text overflow-ellipsis  overflow-hidden`}
    >
      {text}
    </p>
  );
}

LabelText.propTypes = {
  text: PropTypes.any,
  fontSize: PropTypes.string,
  textColor: PropTypes.string,
  fontWeight: PropTypes.string,
  textAlign: PropTypes.string,
  className: PropTypes.string,
  lineheight: PropTypes.string,
};

LabelText.defaultProps = {
  text: "",
  fontSize: "lg:text-3xl text-sm",
  textColor: "text-black",
  fontWeight: "font-medium",
  textAlign: "text-left",
  noWrap:false,
};
