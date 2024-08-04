import React from "react";
import LabelText from "../typography/labelText";
import "../../styles/component/buttons.scss";
import Heart from "../../assets/svg/heart";
import PropTypes from "prop-types";
import { COLORS } from "../../constant/enum";
import { stringTruncate } from "../../constant/helper";

export default function ChannelButton({
  data,
  num,
  onClick,
  bgColor,
  onHeartClicked,
  favouriteClickedStreamId,
}) {
  return (
    <div
      className={`flex flex-row justify-between cursor-pointer items-center rounded-[1.178px] border border-rgbaColor-100 ${bgColor}`}
      onClick={onClick}
    >
      <div className="flex flex-row lg:gap-2 gap-1 lg:p-3 p-2">
        <LabelText
          fontSize="lg:text-3xl text-base"
          text={num}
          fontWeight="font-light"
          textColor="text-white"
        />
        <img
          src={data?.tvg_logo || data?.stream_icon}
          className="lg:w-[79px] w-[40px] lg:h-[58px] h-[24px] object-contain"
          alt="channel-logo"
        />
        <LabelText
          text={stringTruncate(data?.tvg_name || data?.name, 16)}
          textColor="text-white"
          fontSize="lg:text-2xl text-base"
        />
      </div>
      <div
        className="lg:w-[51px] w-[32px] lg:h-[51px] h-[24px] flex self-center lg:mr-4 mr-1 cursor-pointer"
        onClick={(event) => onHeartClicked(event)}
      >
        <Heart
          fill={
            data?.isFavourite ||
            favouriteClickedStreamId.includes(data?.stream_id)
              ? COLORS.RED
              : COLORS.WHITE
          }
        />
      </div>
    </div>
  );
}

ChannelButton.propTypes = {
  data: PropTypes.any,
  onClick: PropTypes.func,
  bgColor: PropTypes.bool,
};
