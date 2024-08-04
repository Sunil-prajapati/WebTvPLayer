import React, { useState, useEffect } from "react";
import "../../styles/pages/login.scss";
import Logo from "../../assets/logo/logo.svg";
import Input from "../../components/inputs/Input";
import Eye from "../../assets/svg/eye";
import EyeClose from "../../assets/svg/eyeClose";
import Adduser from "../../assets/svg/addUser";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import * as userActions from "../../action/loginAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import {
  getLocalStorageValue,
  isBrowser,
  storeDataInLocalStorage,
  withHttp,
} from "../../constant/helper";
import LoginAdd from "../../components/adds/LoginAdd";
import List from "../../assets/svg/List";
import { pathName, STATUS } from "../../constant/enum";
import AllLinks from "../../components/ui/AllLinks";

function Login({ checkTestline }) {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    profileName: "",
    url: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const path = isBrowser && window.history;
    if (path.state?.usr?.from !== pathName?.PLAYLIST) {
      checkingUserStored();
    }
  }, []);

  function checkingUserStored() {
    let allUserAndServerDetails =
      getLocalStorageValue("allUserAndServerDetails") || [];
    if (allUserAndServerDetails.length > 0) {
      navigate("./playlist");
    }
  }

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  function checkIsNameExist(name) {
    let allUserAndServerDetails =
      getLocalStorageValue("allUserAndServerDetails") || [];
    return allUserAndServerDetails.some(
      ({ loginDetails }) => loginDetails?.profileName === name
    );
  }

  const clickAddUser = async () => {
    const hasEmptyValue = Object.values(loginDetails).some(
      (value) => value === ""
    );
    if (!hasEmptyValue) {
      if (!checkIsNameExist(loginDetails?.profileName)) {
        const testLine = `${withHttp(
          loginDetails?.url
        )}/player_api.php?username=${loginDetails?.username}&password=${
          loginDetails?.password
        }&type=m3u_plus&output=ts`;
        const testLineResponse = await checkTestline(testLine, loginDetails);
        if (
          testLineResponse?.user_info?.auth &&
          testLineResponse?.user_info?.status !== STATUS?.EXPIRED
        ) {
          let allUserAndServerDetails =
            getLocalStorageValue("allUserAndServerDetails") || [];
          const finalData = { ...testLineResponse, loginDetails };
          allUserAndServerDetails.push(finalData);
          storeDataInLocalStorage(
            "allUserAndServerDetails",
            allUserAndServerDetails
          );
          navigate("/dashboard");
        } else {
          toast("invalid URL or expired");
        }
      } else toast("Profile name has been already taken:)");
    } else {
      toast("Please fill all the fields");
    }
  };

  return (
    <div className="login-page-main-container flex flex-col justify-between">
      <div
        className={`lg:py-10 py-4 lg:px-10 px-4 justify-between flex flex-row w-full items-start`}
      >
        <div className="flex flex-col">
          <img src={Logo} alt="blink player logo" className="lg:w-48 w-28" />
          <div className="lg:mt-8 mt-4">
            <LoginAdd />
          </div>
        </div>
        <div
          className={`login-container flex flex-col items-center justify-center py-3 `}
        >
          <h1 className="heading-text text-white">
            LOGIN WITH XTREAM CODES API
          </h1>
          <Input
            type="text"
            value={loginDetails?.profileName}
            label="Profile name"
            name="profileName"
            onChange={handleChange}
            className="lg:mt-5 mt-3"
            labelContainerCustomClass="label-container"
          />
          <Input
            type="url"
            value={loginDetails?.url}
            label="Enter URL"
            name="url"
            onChange={handleChange}
            className="lg:mt-5 mt-3"
            labelBgColor="bg-green-100"
            labelContainerCustomClass="label-container"
          />
          <Input
            type="text"
            value={loginDetails?.username}
            label="Username"
            name="username"
            onChange={handleChange}
            className="lg:mt-5 mt-3"
            labelBgColor="bg-blue-100"
            labelContainerCustomClass="label-container"
          />
          <div className="flex flex-row w-full items-center">
            <Input
              type={isPasswordVisible ? "text" : "password"}
              value={loginDetails?.password}
              label="Password"
              name="password"
              onChange={handleChange}
              className="lg:mt-5 mt-3"
              labelBgColor="bg-silver-100"
              labelContainerCustomClass="label-container"
              paddingRight={"lg:pr-5 pr-auto"}
            />
            <div
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="password-eye-container cursor-pointer mt-5 flex justify-center items-center"
            >
              {isPasswordVisible ? (
                <div className="eye-icon">
                  {" "}
                  <Eye />
                </div>
              ) : (
                <div className="eye-icon">
                  <EyeClose />
                </div>
              )}
            </div>
          </div>
          <div className="lg:mt-12 mt-3 flex flex-row justify-between w-full login-btn-container">
            <PrimaryButton
              caption="USER LIST"
              onClick={() => navigate("/xtream-code/playlist")}
              iconClassName="add-user-btn-icon"
              bgColor="bg-grey-200"
            >
              <List />
            </PrimaryButton>
            <PrimaryButton
              caption="ADD USER"
              bgColor="bg-grey-200"
              onClick={() => clickAddUser()}
              iconClassName="add-user-btn-icon"
            >
              <Adduser />
            </PrimaryButton>
          </div>
          <ToastContainer />
        </div>
      </div>
      <AllLinks />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkTestline: (loginDetails, testLine) =>
      dispatch(userActions.checkingTestline(loginDetails, testLine)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
