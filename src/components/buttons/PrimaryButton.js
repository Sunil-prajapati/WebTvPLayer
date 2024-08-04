import React from "react";
import PropTypes from "prop-types";
import LabelText from "../typography/labelText";
import "../../styles/component/buttons.scss";

export default function PrimaryButton({
  caption,
  children,
  bgColor,
  onClick,
  iconClassName,
}) {
  return (
    <button
      className={` ${bgColor} cursor-pointer add-user-btn-container`}
      onClick={() => onClick()}
    >
      <div className="flex flex-row items-center md:px-3 px-1 ">
        <LabelText
          text={caption}
          textAlign="text-center"
          fontSize={"lg:text-2xl text-base"}
          fontWeight="font-bold"
          textColor="text-white"
        />
        <div type="button" className={`ml-2 md:block hidden ${iconClassName}`}>
          {children}
        </div>
      </div>
    </button>
  );
}

PrimaryButton.propTypes = {
  caption: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

PrimaryButton.defaultProps = {
  caption: "primary button",
  bgColor: "bg-pink-200",
};
