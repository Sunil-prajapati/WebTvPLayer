import React, { useState } from "react";
import Logo from "../../assets/logo/logo.svg";
import AddCircle from "../../assets/svg/AddCircle";
import LabelText from "../../components/typography/labelText";
import DateTime from "../../components/ui/DateTime";
import ProfileDetailsContainer from "../../components/ui/ProfileDetailsContainer";
import "../../styles/pages/playlist.scss";
import * as userActions from "../../action/loginAction";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  storeDataInLocalStorage,
  getLocalStorageValue,
  withHttp,
} from "../../constant/helper";
import { STATUS, pathName } from "../../constant/enum";
import HorizontalAdd from "../../components/adds/HorizontalAdd";
import Line from "../../components/ui/Line";

function Playlist({ checkTestline }) {
  const [toRenderAgain, setToRenderAgain] = useState(false);
  const navigate = useNavigate();
  let allUserAndServerDetails =
    getLocalStorageValue("allUserAndServerDetails") || [];

  const toLogin = async (details) => {
    const testLine = `${withHttp(
      details?.loginDetails?.url
    )}/player_api.php?username=${details?.loginDetails?.username}&password=${
      details?.loginDetails?.password
    }&type=m3u_plus&output=ts`;

    const testLineResponse = await checkTestline(testLine);
    if (
      testLineResponse?.user_info?.auth &&
      testLineResponse?.user_info?.status !== STATUS?.EXPIRED
    ) {
      navigate("/dashboard");
    } else {
      toast("invalid URL or expired");
    }
  };

  const toLogout = async (e, details) => {
    e.stopPropagation();
    const index = allUserAndServerDetails.findIndex(
      (obj) =>
        obj.loginDetails?.profileName === details?.loginDetails?.profileName
    );

    if (index !== -1) {
      allUserAndServerDetails.splice(index, 1);
      setToRenderAgain(!toRenderAgain);
    }
    storeDataInLocalStorage("allUserAndServerDetails", allUserAndServerDetails);
  };

  return (
    <div className="md:px-8 px-2">
      <div className="flex flex-row justify-between items-center lg:py-8 py-4">
        <div className="flex flex-row">
          <img src={Logo} alt="logo" className="lg:w-36 w-20" />
          <DateTime />
        </div>

        <div
          className="bg-grey-200 cursor-pointer"
          onClick={() =>
            navigate("/xtream-code", { state: { from: pathName?.PLAYLIST } })
          }
        >
          <div className="flex flex-row gap-2 py-2 px-3 items-center">
            <div className="add-circle-icon">
              <AddCircle />
            </div>
            <LabelText text="ADD NEW USER" textColor="text-white" />
          </div>
        </div>
        <div
          className="bg-grey-200 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="flex flex-row gap-2 py-2 px-3 items-center">
            <div className="add-circle-icon">
              <AddCircle />
            </div>
            <LabelText text="ADD M3U USER" textColor="text-white" />
          </div>
        </div>
      </div>
      <LabelText
        text="ADDED USERS - "
        fontSize="text-xl"
        textColor="text-white"
        fontWeight="text-bold"
      />
      <Line className="mt-[10px]" />
      <div className="flex flex-col mt-[23px]">
        <div className="flex flex-wrap gap gap-4">
          {allUserAndServerDetails?.map((details, index) => {
            return (
              <ProfileDetailsContainer
                data={details}
                key={index}
                onClick={() => toLogin(details)}
                onClickLogoutBtn={(e) => toLogout(e, details)}
              />
            );
          })}
        </div>
        <div className="flex absolute bottom-0 playlist-add-container">
          <HorizontalAdd />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkTestline: (testLine) =>
      dispatch(userActions.checkingTestline(testLine)),
  };
};

export default connect(null, mapDispatchToProps)(Playlist);
