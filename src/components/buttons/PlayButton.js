import React from "react";
import LabelText from "../typography/labelText";
import PropTypes from "prop-types";

export const PlayButton = ({ onClick, bgColor, icon, caption }) => {
  return (
    <div className={`${bgColor} cursor-pointer w-fit`} onClick={onClick}>
      <div className="lg:p-[17.86px] p-[8px] flex flex-row lg:gap-4 gap-3 items-center justify-center">
        {icon && (
          <img
            src={icon}
            alt="button icon"
            className="lg:w-[37px] w-[24] lg:h-[43px] h-[24px]"
          />
        )}

        <LabelText
          text={caption}
          textColor="text-white"
          fontWeight="text-light"
          fontSize="lg:text-[37.212px] text-[18px]"
        />
      </div>
    </div>
  );
};

PlayButton.propTypes = {
  onClick: PropTypes.func,
  logout: PropTypes.any,
};

PlayButton.defaultProps = {
  bgColor: "bg-rgbaColor-300",
  caption: "Watch now",
};
