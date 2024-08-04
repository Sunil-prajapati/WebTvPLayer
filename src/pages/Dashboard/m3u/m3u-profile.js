import React from "react";
import Logo from "../../../assets/logo/logo.svg";
import AddCircle from "../../../assets/svg/AddCircle";
import Heading from "../../../components/common/Heading";
import LabelText from "../../../components/typography/labelText";
import DateTime from "../../../components/ui/DateTime";
import { useNavigate } from "react-router-dom";
import HorizontalAdd from "../../../components/adds/HorizontalAdd";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
import ProfileDetails from "../../../components/ui/ProfileDetails";
import { storeDataInLocalStorage } from "../../../constant/helper";
import { constant, pathName } from "../../../constant/enum";

const { m3uUsers } = db;
const M3uProfile = () => {
  const allUsers = useLiveQuery(() => m3uUsers.toArray(), []);
  const navigate = useNavigate();
  const logout = async (e, id) => {
    e.stopPropagation();
    m3uUsers.delete(id);
  };
  const toLogin = (details) => {
    storeDataInLocalStorage(constant.M3U_USERNAME, details?.name);
    navigate("/m3uDashboard");
  };
  return (
    <div className="md:px-8 px-2">
      <div className="flex flex-row justify-between items-center lg:py-8 py-4">
        <div className="flex flex-row">
          <img src={Logo} alt="logo" className="lg:w-36 w-20" />
          <DateTime />
        </div>
        <Heading heading="PLAYLIST" className="lg:w-52 w-36" />
        <div
          className="global-border cursor-pointer"
          onClick={() =>
            navigate("/m3u-login", { state: { from: pathName?.M3U_PLAYLIST } })
          }
        >
          <div className="flex flex-row gap-2 py-2 px-3 items-center">
            <div className="lg:w-[42px] lg:h-[39px] w-[23px] h-[23px]">
              <AddCircle />
            </div>
            <LabelText text="ADD M3U USER" textColor="text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap gap gap-4">
          {allUsers?.map((details, index) => {
            return (
              <ProfileDetails
                data={details}
                key={index}
                onClick={() => toLogin(details)}
                onClickLogoutBtn={logout}
              />
            );
          })}
        </div>
        <div className="flex absolute bottom-0 playlist-add-container">
          <HorizontalAdd />
        </div>
      </div>
    </div>
  );
};

export default M3uProfile;
