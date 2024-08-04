import React from "react";
import LabelText from "../typography/labelText";
import ProfileIcon from "../../assets/images/profile.png";
import PropTypes from "prop-types";
import LogoutIcon from "../../assets/svg/LogoutIcon";
import Line from "./Line";

export default function ProfileDetailsContainer({
  data,
  onClick,
  onClickLogoutBtn,
}) {
  const { loginDetails, server_info } = data;
  return (
    <div
      className="profile-details-container bg-grey-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row lg:gap-4 gap-2 lg:py-4 py-2 lg:px-6 px-3 items-center">
        <img
          src={ProfileIcon}
          alt="profile icon"
          className="profile-icon"
          width="104"
          height="104"
          loading="eager"
        />
        <div className="flex flex-col gap-4">
          <LabelText
            text={`PROFILE NAME: ${loginDetails?.profileName}`}
            textColor="text-white"
            fontSize="lg:text-base text-xs"
          />
          <Line />
          <LabelText
            text={`URL: ${server_info?.url}`}
            textColor="text-white"
            fontSize="lg:text-base text-xs"
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="logout-container h-[17px] flex justify-center items-center mr-6 mb-2 cursor-pointer">
          <div
            className="flex flex-row items-center justify-between px-1 py-1 gap-1"
            onClick={onClickLogoutBtn}
          >
            <LogoutIcon />
            <p className="logout-text">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
ProfileDetailsContainer.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  onClickLogoutBtn: PropTypes.func,
};
