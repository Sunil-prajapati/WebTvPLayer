import React from "react";
import "../../styles/component/buttons.scss";
import LabelText from "../typography/labelText";
import PropTypes from "prop-types";

export default function NormalButton({caption, bgColor,onClick,fontSize,className,containerClass}) {
  return (
    <div className={`normal-button ${bgColor} ${containerClass} cursor-pointer`} onClick={onClick}>
      <LabelText
        text={caption}
        fontSize={`lg:${fontSize} text-lg`}
        textColor="text-white"
        className={`lg:my-2 my-1 lg:mx-8 mx-4 ${className}`}
      />
    </div>
  );
}

NormalButton.propTypes = {
  caption: PropTypes.string,
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
  fontSize: PropTypes.string,
  className: PropTypes.string,
  containerClass: PropTypes.string
};
NormalButton.defaultProps = {
  caption: "Button",
  fontSize: 'text-3xl',

};
