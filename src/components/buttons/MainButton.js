import React from "react";
import PropTypes from "prop-types";
import LabelText from "../typography/labelText";
import '../../styles/component/main-btn.scss';

export default function MainButton({ children,caption,captionColor,captionBgColor,iconBgBackground ,onClick }) {
  return (
    <div className="flex flex-col cursor-pointer main-button" onClick={onClick}>
      <div className={`button-icon-container flex justify-center items-center ${iconBgBackground}` }><div className="lg:pt-2 pt-1 pb-1 main-btn-icon">{children}</div></div>
      <div className={`button-text-container flex  justify-center items-center mx-1 ${captionBgColor}`}>
        <LabelText text={caption} fontSize='lg:text-4xl text-lg' fontWeight='font-bold' className={'lg:py-3 py-1'} textColor={captionColor}/>
      </div>
    </div>
  );
}

MainButton.propTypes = {
  children: PropTypes.any,
  iconBgBackground:PropTypes.string,
  onClick: PropTypes.any,
};
