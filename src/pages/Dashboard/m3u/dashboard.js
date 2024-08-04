import React from "react";
import PrimaryNavbar from "../../../components/common/PrimaryNavbar";
import MainButton from "../../../components/buttons/MainButton";
import LiveTv from "../../../assets/svg/liveTv";
import Movies from "../../../assets/svg/Movies";
import Series from "../../../assets/svg/series";
import Logout from "../../../assets/svg/logout";
import SecondayButton from "../../../components/buttons/SecondayButton";
import Settings from "../../../assets/svg/settings";
import SwitchUser from "../../../assets/svg/switchUser";
import { useNavigate } from "react-router-dom";
import * as dashboardActions from "../../../action/dashboardAction";
import { connect } from "react-redux";
import "../../../styles/pages/dashboard.scss";
import { constant } from "../../../constant/enum";
import { getLocalStorageValue } from "../../../constant/helper";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";
const { m3uUsers } = db;
const M3uDashboard = ({ logout }) => {
  const getAllM3uData = useLiveQuery(
    () =>
      m3uUsers
        .where("name")
        .equals(getLocalStorageValue(constant?.M3U_USERNAME))
        .toArray(),
    []
  );
  const navigate = useNavigate();
  const onLogout = async () => {
    await logout();
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <PrimaryNavbar />
      <div className="flex flex-row items-center">
        <div className="main-container lg:ml-16 lg:mx-8 mx-4">
          <div className="lg:py-8 py-4 lg:px-9 px-4">
            <div className="flex flex-wrap gap gap-2">
              <MainButton
                caption="Live Tv"
                captionColor="text-grey-100"
                captionBgColor="bg-blue-100"
                iconBgBackground="bg-blue-200"
                onClick={() =>
                  navigate("/m3u-live-tv", {
                    state: {
                      liveTvCategories:
                        getAllM3uData?.[0]?.allM3uData?.[0]?.liveTv,
                    },
                  })
                }
              >
                <div className="main-btn-icon">
                  <LiveTv />
                </div>
              </MainButton>
              <MainButton
                caption="Movies"
                captionColor="text-grey-100"
                captionBgColor="bg-antique-100"
                iconBgBackground="bg-yellow-100"
                onClick={() =>
                  navigate("/dashboard/m3u/moviesCategories", {
                    state: {
                      moviesCategories:
                        getAllM3uData?.[0]?.allM3uData?.[1]?.movies,
                    },
                  })
                }
              >
                <div className="main-btn-icon">
                  <Movies />
                </div>
              </MainButton>
              <MainButton
                caption="Series"
                captionColor="text-grey-100"
                captionBgColor="bg-green-100"
                iconBgBackground="bg-green-200"
                onClick={() =>
                  navigate("/m3u-series", {
                    state: {
                      seriesCategories:
                        getAllM3uData?.[0]?.allM3uData?.[2]?.series,
                    },
                  })
                }
              >
                <div className="main-btn-icon">
                  <Series />
                </div>
              </MainButton>
              <MainButton
                caption="Logout"
                captionColor="text-grey-100"
                captionBgColor="bg-pink-300"
                iconBgBackground="bg-pink-100"
                onClick={onLogout}
              >
                <div className="main-btn-icon">
                  <Logout />
                </div>
              </MainButton>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center lg:-mt-4">
          <div className="settings-switch-container lg:pl-4 pl-2 lg:pr-9 pr-2 flex items-center">
            <div className="lg:py-16 py-8 flex flex-col lg:gap-20 gap-16">
              <SecondayButton
                caption="Settings"
                onClick={() => alert("coming soon")}
              >
                <div className="secondary-btn-icon">
                  <Settings />
                </div>
              </SecondayButton>
              <SecondayButton caption="Switch user" bgColor="bg-green-100">
                <div
                  className="secondary-btn-icon"
                  onClick={() => navigate("/m3u-profile")}
                >
                  <SwitchUser />
                </div>
              </SecondayButton>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col lg:gap-4 gap-2 ml-4 lg:mt-0 mt-4 justify-center">
          <TertiaryButton
            caption="Profile"
            onClick={() => alert("coming soon")}
          >
            <div className="tertiary-btn-icon">
              <Profile />
            </div>
          </TertiaryButton>
          <TertiaryButton
            caption="Favourites"
            bgColor="bg-green-100"
            // onClick={redirectToFavourites}
          >
            <div className="tertiary-btn-icon">
              <Favourites />
            </div>
          </TertiaryButton>
        </div> */}
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(dashboardActions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(M3uDashboard);
