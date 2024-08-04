import React from "react";
import ProfileIcon from "../../assets/images/profile.png";
import LabelText from "../typography/labelText";
import PropTypes from "prop-types";
import LogoutIcon from "../../assets/svg/LogoutIcon";

const ProfileDetails = ({ data, onClick, onClickLogoutBtn }) => {
  return (
    <div
      className="global-border profile-details-container cursor-pointer"
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
            text={`PROFILE NAME: ${data?.name}`}
            textColor="text-white"
            fontSize="lg:text-base text-xs"
          />
          <LabelText
            text={`URL: ${data?.m3uLink}`}
            textColor="text-white"
            fontSize="lg:text-base text-xs"
            className="w-40"
          />
        </div>
      </div>
      <div className="logout-container w-full flex self-end ml-6 mb-2 cursor-pointer">
        <div
          className="flex flex-row justify-between px-1 py-1 gap-1"
          onClick={(event) => onClickLogoutBtn(event, data?.id)}
        >
          <LogoutIcon />
          <p className="font-bold text-[10px] text-white leading-[10px]">
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
ProfileDetails.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  onClickLogoutBtn: PropTypes.func,
};
