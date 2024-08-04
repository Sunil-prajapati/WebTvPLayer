import React, { useState, useEffect } from "react";
import "../../styles/pages/login.scss";
import Logo from "../../assets/logo/logo.svg";
import Input from "../../components/inputs/Input";
import LoginAdd from "../../components/adds/LoginAdd";
import AllLinks from "../../components/ui/AllLinks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/pages/m3uLogin.scss";
import LabelText from "../../components/typography/labelText";
import { API_STATUS, M3U_TYPE, constant, pathName } from "../../constant/enum";
import { connect } from "react-redux";
import * as userActions from "../../action/loginAction";
import CustomFileInput from "../../components/inputs/CustomFileInput";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../../components/common/FullPageLoader";
import { checkUser, addUser, m3uUsers } from "../../db";
import { isBrowser, storeDataInLocalStorage } from "../../constant/helper";
import { useLiveQuery } from "dexie-react-hooks";

const M3uLogin = ({ checkM3uTestLine, checkingM3uTestFile }) => {
  // const allUsers = useLiveQuery(() => m3uUsers.toArray(), []);
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    playlistName: "",
    m3uType: M3U_TYPE.FILE,
    m3uUrl: "",
    selectedFile: null,
    loading: false,
  });

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    setLoginDetails({ ...loginDetails, selectedFile: event.target.files[0] });
  };
  // useEffect(() => {
  //   const path = isBrowser && window.history;
  //   if (path.state?.usr?.from !== pathName?.M3U_PLAYLIST) {
  //     allUsers?.length > 0 && navigate("/m3u-profile");
  //   }
  // }, [allUsers]);

  const addPlaylist = async () => {
    if (loginDetails.playlistName !== "") {
      const isUserExist = await checkUser(loginDetails?.playlistName);
      if (!isUserExist) {
        if (loginDetails?.m3uType === M3U_TYPE?.URL) {
          setLoginDetails({ ...loginDetails, loading: true });
          const m3uResponse = await checkM3uTestLine(loginDetails?.m3uUrl);
          if (m3uResponse?.response?.status === API_STATUS?.STATUS_200) {
            await addUser({
              name: loginDetails.playlistName,
              m3uLink: loginDetails?.m3uUrl,
              allM3uData: m3uResponse?.allM3uData,
            });
            storeDataInLocalStorage(
              constant?.M3U_USERNAME,
              loginDetails.playlistName
            );
            setLoginDetails({ ...loginDetails, loading: false });
            return navigate("/m3uDashboard");
          } else {
            toast("invalid URL or expired");
            setLoginDetails({ ...loginDetails, loading: false });
          }
        } else if (loginDetails?.m3uType === M3U_TYPE?.FILE) {
          setLoginDetails({ ...loginDetails, loading: true });
          const reader = new FileReader();
          reader.onload = async function (event) {
            const m3uContent = event.target.result;
            const m3uFileResponse = await checkingM3uTestFile(m3uContent);
            if (m3uFileResponse?.status === API_STATUS?.STATUS_200) {
              await addUser({
                name: loginDetails.playlistName,
                m3uLink: "file",
                allM3uData: m3uFileResponse?.data,
              });
              storeDataInLocalStorage(
                constant?.M3U_USERNAME,
                loginDetails.playlistName
              );
              return navigate("/m3uDashboard");
            } else {
              toast("invalid URL or expired");
              setLoginDetails({ ...loginDetails, loading: false });
            }
          };
          reader.readAsText(loginDetails?.selectedFile);
          setLoginDetails({ ...loginDetails, loading: false });
        }
      } else {
        toast(`${loginDetails?.playlistName} already exist!`);
        setLoginDetails({ ...loginDetails, loading: false });
      }
    } else {
      toast("Please fill playlist name");
    }
  };

  return (
    <>
      {loginDetails?.loading ? (
        <FullPageLoader />
      ) : (
        <div className="login-page-main-container flex flex-col justify-between">
          <div
            className={`lg:py-10 py-4 lg:px-10 px-4 flex flex-row w-full items-start justify-between `}
          >
            <div className="flex flex-col">
              <img
                src={Logo}
                alt="blink player logo"
                className="lg:w-48 w-28"
              />
              <div className="lg:mt-8 mt-4">
                <LoginAdd />
              </div>
            </div>
            <div
              className={`m3u-login-container flex flex-col items-center justify-center pt-3 `}
            >
              <h1 className="heading-text text-white">LOGIN WITH M3U PORTAL</h1>
              <Input
                type="text"
                value={loginDetails?.profileName}
                label="Playlist name"
                name="playlistName"
                onChange={handleChange}
                className="lg:mt-5 mt-3"
                labelContainerCustomClass="label-container"
              />
              <div className="w-full lg:mt-12 mt-6 lg:pr-20 pr-auto">
                <div className="lg:pl-10 flex flex-row gap-2  w-full">
                  <div
                    className={`lg:w-2/6 w-1/5 bg-silver-100 label-container flex items-center justify-center`}
                  >
                    <LabelText text="Playlist Type" textAlign="text-center" />
                  </div>
                  <div className="m3u-radio-btn-container lg:w-4/6 w-full ">
                    <div className="py-1 px-2 flex flex-col gap-3">
                      <div className="flex flex-row gap-6">
                        <input
                          type="radio"
                          id="file"
                          name="m3uType"
                          value={M3U_TYPE?.FILE}
                          checked={loginDetails?.m3uType === M3U_TYPE?.FILE}
                          onChange={handleChange}
                        />
                        <label
                          for="file"
                          style={{ color: "white", fontWeight: "bold" }}
                          className="lg:text-lg text-sm"
                        >
                          M3U File
                        </label>
                      </div>
                      <div className="flex flex-row gap-6">
                        <input
                          type="radio"
                          id="fileUrl"
                          name="m3uType"
                          value={M3U_TYPE?.URL}
                          checked={loginDetails?.m3uType === M3U_TYPE?.URL}
                          onChange={handleChange}
                        />
                        <label
                          for="fileUrl"
                          style={{ color: "white", fontWeight: "bold" }}
                          className="lg:text-lg text-sm"
                        >
                          M3U File URL
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {loginDetails?.m3uType === M3U_TYPE?.FILE ? (
                  <CustomFileInput
                    selectedFile={loginDetails?.selectedFile}
                    handleFileChange={handleFileChange}
                    className="lg:mt-12 mt-3 m3u-file-input"
                  />
                ) : (
                  <Input
                    type="link"
                    placeholder="EnterM3U File URL"
                    name="m3uUrl"
                    value={loginDetails?.m3uUrl}
                    onChange={handleChange}
                    className="lg:mt-12 mt-3"
                    isLabelRequired={false}
                    inputContainerCustomClass="w-full m3u-url-input"
                    paddingRight="pr-0"
                  />
                )}
              </div>
              <div
                className="add-playlist-btn w-full flex justify-center items-center cursor-pointer"
                onClick={addPlaylist}
              >
                <LabelText text="ADD PLAYLIST" textColor="text-white" />
              </div>
              <ToastContainer />
            </div>
          </div>
          <AllLinks />
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkM3uTestLine: (testLine) =>
      dispatch(userActions.checkingM3uTestLine(testLine)),
    checkingM3uTestFile: (file) =>
      dispatch(userActions.checkingM3uTestFile(file)),
  };
};

export default connect(null, mapDispatchToProps)(M3uLogin);
