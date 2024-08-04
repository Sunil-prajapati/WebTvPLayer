import React from "react";
import PropTypes from "prop-types";
import LabelText from "../typography/labelText";
import "../../styles/component/buttons.scss";

export default function SecondayButton({
  caption,
  children,
  bgColor,
  onClick,
  textContainerClass,
}) {
  return (
    <div
      className="flex flex-row items-center relative cursor-pointer secondary-btn-container"
      onClick={onClick}
    >
      <div
        className={`secondary-btn-icon-container border border-black flex items-center justify-center ${bgColor}`}
      >
        <div className="lg:px-8 px-2 lg:py-5 py-1">{children}</div>
      </div>
      <div
        className={`secondary-btn-text-container ${textContainerClass} flex items-center absolute`}
      >
        <LabelText
          text={caption}
          textColor="text-white"
          fontSize="lg:text-3xl text-base"
          fontWeight="font-bold"
          className="lg:pl-9 pl-8"
        />
      </div>
    </div>
  );
}

SecondayButton.propTypes = {
  children: PropTypes.any,
  iconBgBackground: PropTypes.string,
  caption: PropTypes.string,
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
  textContainerClass: PropTypes.string,
};
SecondayButton.defaultProps = {
  bgColor: "bg-antique-100",
};
