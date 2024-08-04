import React from "react";
import PropTypes from "prop-types";
import LabelText from "../typography/labelText";
import "../../styles/component/buttons.scss";

export default function TertiaryButton({
  caption,
  children,
  bgColor,
  onClick,
}) {
  return (
    <div
      className="flex flex-row items-center relative cursor-pointer tertiary-btn-container"
      onClick={onClick}
    >
      <div
        className={`tertiary-btn-icon-container border border-black flex items-center justify-center ${bgColor} z-10`}
      >
        <div className="lg:px-7 px-2 lg:py-2 py-1 tertiary-icon">{children}</div>
      </div>
      <div className="tertiary-btn-text-container flex items-center absolute">
        <LabelText
          text={caption}
          textColor="text-white"
          fontSize="lg:text-3xl test-xs"
          fontWeight="font-bold"
          className="lg:pl-9 pl-4"
        />
      </div>
    </div>
  );
}

TertiaryButton.propTypes = {
  children: PropTypes.any,
  iconBgBackground: PropTypes.string,
  caption: PropTypes.string,
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
};
TertiaryButton.defaultProps = {
  bgColor: "bg-antique-100",
};
