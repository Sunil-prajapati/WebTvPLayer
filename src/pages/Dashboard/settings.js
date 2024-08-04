import React, { useState } from "react";
import Logo from "../../assets/logo/logo.svg";
import Epg from "../../assets/svg/Epg";
import GeneralSettings from "../../assets/svg/GeneralSettings";
import Lock from "../../assets/svg/Lock";
import TimeFormat from "../../assets/svg/TimeFormat";
import SecondayButton from "../../components/buttons/SecondayButton";
import SimpleInput from "../../components/inputs/SimpleInput";
import LabelText from "../../components/typography/labelText";
import DateTime from "../../components/ui/DateTime";
import CustomModal from "../../components/ui/Modal";
import "../../styles/pages/settings.scss";
import * as dashboardActions from "../../action/dashboardAction";
import { connect, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { withHttp } from "../../constant/helper";

let initialState = {
  password: "",
  confirmPassword: "",
};
function Settings({
  addParentalLock,
  liveTvCategories,
  moviesCategories,
  seriesCategories,
}) {
  const [passwordModal, setPasswordModal] = useState(false);
  const [singlePasswordModal, setSinglePasswordModal] = useState(false);
  const [singlePassword, setSinglePassword] = useState("");
  const [passwords, setPasswords] = useState(initialState);
  const isParentalPasswordExist = useSelector(
    (state) => state.dashboardReducer?.parentalPassword
  );
  const { username, password } = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );
  const { url, port } = useSelector(
    (state) => state.loginReducer?.userDetails?.server_info
  );
  const liveCategories = useSelector(
    (state) => state.dashboardReducer?.allLiveCategories
  );
  const allMoviesCategories = useSelector(
    (state) => state.dashboardReducer?.allMoviesCategories
  );
  const allSeriesCategories = useSelector(
    (state) => state.dashboardReducer?.allSeriesCategories
  );

  const navigate = useNavigate();
  const openPasswordModal = () => {
    if (isParentalPasswordExist) {
      setSinglePasswordModal(true);
    } else {
      setPasswordModal(true);
    }
  };
  const closeModal = () => {
    setPasswordModal(false);
  };
  const closeSinglePasswordModal = () => {
    setSinglePasswordModal(false);
  };
  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const singlePasswordHandler = (e) => {
    setSinglePassword(e.target.value);
  };

  const saveParentalPassword = async () => {
    if (passwords?.password === passwords?.confirmPassword) {
      await addParentalLock(passwords?.password);
      if (!liveCategories) {
        const liveUrl = `${withHttp(
          url
        )}:${port}/player_api.php?username=${username}&password=${password}&action=get_live_categories`;
        await liveTvCategories(liveUrl);
      }
      if (!allMoviesCategories) {
        const movieUrl = `${withHttp(
          url
        )}:${port}/player_api.php?username=${username}&password=${password}&action=get_vod_categories`;
        await moviesCategories(movieUrl);
      }
      if (!allSeriesCategories) {
        const seriesUrl = `${withHttp(
          url
        )}:${port}/player_api.php?username=${username}&password=${password}&action=get_series_categories`;
        await seriesCategories(seriesUrl);
      }

      setPasswordModal(false);
      setPasswords(initialState);
      navigate("/child-lock");
    } else {
      toast("Both Passwords must be same");
    }
  };
  const saveSinglePassword = async () => {
    if (isParentalPasswordExist === singlePassword) {
      navigate("/child-lock");
    } else {
      toast("Password is not valid");
    }
  };
  return (
    <>
      <div className="flex flex-row lg:py-8 py-1 md:px-8 px-2">
        <img
          src={Logo}
          alt="logo"
          className="lg:w-32 w-28 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <DateTime />
      </div>
      <div className="flex flex-row justify-around lg:mt-20 mt-10">
        <div className="setting-container py-10">
          <div className="flex flex-col gap lg:gap-36 gap-16 lg:px-8 px-6">
            <SecondayButton
              caption="General Settings"
              textContainerClass="settings-btn-text"
            >
              <div className="secondary-btn-icon">
                <GeneralSettings />
              </div>
            </SecondayButton>
            <SecondayButton
              caption="EPG"
              textContainerClass="settings-btn-text"
              bgColor="bg-blue-100"
              onClick={() => navigate('/epg')}
            >
              <div className="secondary-btn-icon">
                <Epg />
              </div>
            </SecondayButton>
          </div>
        </div>

        <div className="setting-container py-10">
          <div className="flex flex-col gap lg:gap-36 gap-16 lg:px-8 px-6">
            <SecondayButton
              caption="Time Format"
              textContainerClass="settings-btn-text"
            >
              <div className="secondary-btn-icon">
                <TimeFormat />
              </div>
            </SecondayButton>
            <SecondayButton
              caption="Parental control"
              textContainerClass="settings-btn-text"
              bgColor="bg-green-100"
              onClick={openPasswordModal}
            >
              <div className="secondary-btn-icon">
                <Lock />
              </div>
            </SecondayButton>
          </div>
        </div>
      </div>
      <CustomModal modalIsOpen={passwordModal}>
        <div className="lg:my-14 my-6 flex justify-center">
          <div className="flex flex-col gap lg:gap-14 gap-6">
            <SimpleInput
              type="password"
              value={passwords?.password}
              placeholder="Enter Your Password"
              name="password"
              onChange={handleChange}
            />
            <SimpleInput
              type="password"
              value={passwords?.confirmPassword}
              placeholder="Enter Your Password"
              name="confirmPassword"
              onChange={handleChange}
            />
            <div className="flex flex-row justify-between">
              <div
                className="save-btn bg-pink-200 rounded-lg cursor-pointer"
                onClick={saveParentalPassword}
              >
                <LabelText
                  text="SAVE"
                  fontSize="text-3xl"
                  lineheight="leading-9"
                  fontWeight="font-bold"
                  className="lg:py-3 py-2 lg:px-16 px-8"
                />
              </div>
              <div
                className="save-btn bg-pink-500 rounded-lg cursor-pointer"
                onClick={closeModal}
              >
                <LabelText
                  text="CLOSE"
                  fontSize="text-3xl"
                  lineheight="leading-9"
                  fontWeight="font-bold"
                  className="lg:py-3 py-2 lg:px-16 px-8"
                />
              </div>
            </div>
          </div>
        </div>
      </CustomModal>

      <CustomModal modalIsOpen={singlePasswordModal}>
        <div className="lg:my-14 my-6 flex flex-col items-center ">
          <SimpleInput
            type="password"
            value={singlePassword}
            placeholder="Enter Your Password"
            name="password"
            onChange={singlePasswordHandler}
          />
          <div className="flex flex-row justify-between mt-20 single-password-container">
            <div
              className="save-btn bg-pink-200 rounded-lg cursor-pointer"
              onClick={saveSinglePassword}
            >
              <LabelText
                text="SAVE"
                fontSize="text-3xl"
                lineheight="leading-9"
                fontWeight="font-bold"
                className="lg:py-3 py-2 lg:px-16 px-8"
              />
            </div>
            <div
              className="save-btn bg-pink-500 rounded-lg cursor-pointer"
              onClick={closeSinglePasswordModal}
            >
              <LabelText
                text="CLOSE"
                fontSize="text-3xl"
                lineheight="leading-9"
                fontWeight="font-bold"
                className="lg:py-3 py-2 lg:px-16 px-8"
              />
            </div>
          </div>
        </div>
      </CustomModal>
      <ToastContainer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addParentalLock: (password) => dispatch(dashboardActions.addLock(password)),
    liveTvCategories: (testLine) =>
      dispatch(dashboardActions.getLiveTvCategories(testLine)),
    moviesCategories: (testLine) =>
      dispatch(dashboardActions.getMoviesCategories(testLine)),
    seriesCategories: (testLine) =>
      dispatch(dashboardActions.getSeriesCategories(testLine)),
  };
};

export default connect(null, mapDispatchToProps)(Settings);
