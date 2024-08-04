import React from "react";
import LabelText from "../typography/labelText";
import { addDefaultSrc } from "../../constant/helper";
import PropTypes from "prop-types";
import noPoster from "../../assets/images/noPoster.png";

const LiveTvChannelBox = ({ title, logo, onClick }) => {
  return (
    <div
      className="w-[144px] h-[130px] bg-grey-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col lg:gap-2 gap-1 items-center py-2">
        <img
          onError={addDefaultSrc}
          src={logo ? logo : noPoster}
          alt="live tv channel logo"
          className="w-[111px] h-[81.49px] object-contain"
        />
        <LabelText
          text={title}
          textColor="text-white"
          fontSize="lg:text-lg text-base"
          className="w-[120px] uppercase overflow-ellipsis whitespace-nowrap break-all"
        />
      </div>
    </div>
  );
};

export default LiveTvChannelBox;

LiveTvChannelBox.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  onClick: PropTypes.func,
};

LiveTvChannelBox.defaultProps = {
  title: "title",
};
