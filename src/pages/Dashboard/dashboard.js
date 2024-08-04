import React from "react";
import "../../styles/pages/dashboard.scss";
import MainButton from "../../components/buttons/MainButton";
import LiveTv from "../../assets/svg/liveTv";
import Movies from "../../assets/svg/Movies";
import Series from "../../assets/svg/series";
import Logout from "../../assets/svg/logout";
import SecondayButton from "../../components/buttons/SecondayButton";
import Settings from "../../assets/svg/settings";
import SwitchUser from "../../assets/svg/switchUser";
import TertiaryButton from "../../components/buttons/TertiaryButton";
import Profile from "../../assets/svg/profile";
import Favourites from "../../assets/svg/favourites";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as dashboardActions from "../../action/dashboardAction";
import { connect } from "react-redux";
import { withHttp } from "../../constant/helper";
import PrimaryNavbar from "../../components/common/PrimaryNavbar";

function Dashboard({
  liveTvCategories,
  logout,
  moviesCategories,
  seriesCategories,
}) {
  const navigate = useNavigate();
  const { username, password } = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );
  const { url, port } = useSelector(
    (state) => state.loginReducer?.userDetails?.server_info
  );

  const redirectToLiveTv = async () => {
    const liveUrl = `${withHttp(
      url
    )}:${port}/player_api.php?username=${username}&password=${password}&action=get_live_categories`;
    const liveTvCategoriesResponse = await liveTvCategories(liveUrl);
    if (liveTvCategoriesResponse?.status === 200) {
      navigate("/livetvCategories");
    }
  };

  const redirectToMovies = async () => {
    const movieUrl = `${withHttp(
      url
    )}:${port}/player_api.php?username=${username}&password=${password}&action=get_vod_categories`;
    const moviesCategoriesResponse = await moviesCategories(movieUrl);
    if (moviesCategoriesResponse?.status === 200) {
      navigate("/dashboard/moviesCategories");
    }
  };

  const redirectToSeries = async () => {
    const seriesUrl = `${withHttp(
      url
    )}:${port}/player_api.php?username=${username}&password=${password}&action=get_series_categories`;
    const seriesCategoriesResponse = await seriesCategories(seriesUrl);
    if (seriesCategoriesResponse?.status === 200) {
      navigate("/SeriesCategories");
    }
  };

  const onLogout = async () => {
    await logout();
    navigate("/");
  };

  const redirectToFavourites = () => {
    navigate("/favourites");
  };
  return (
    <>
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
                onClick={redirectToLiveTv}
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
                onClick={redirectToMovies}
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
                onClick={redirectToSeries}
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
                onClick={() => navigate("/settings")}
              >
                <div className="secondary-btn-icon">
                  <Settings />
                </div>
              </SecondayButton>
              <SecondayButton caption="Switch user" bgColor="bg-green-100">
                <div
                  className="secondary-btn-icon"
                  onClick={() => navigate("/xtream-code/playlist")}
                >
                  <SwitchUser />
                </div>
              </SecondayButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:gap-4 gap-2 ml-4 lg:mt-0 mt-4 justify-center">
          <TertiaryButton
            caption="Profile"
            onClick={() => navigate("/profile")}
          >
            <div className="tertiary-btn-icon">
              <Profile />
            </div>
          </TertiaryButton>
          <TertiaryButton
            caption="Favourites"
            bgColor="bg-green-100"
            onClick={redirectToFavourites}
          >
            <div className="tertiary-btn-icon">
              <Favourites />
            </div>
          </TertiaryButton>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    liveTvCategories: (testLine) =>
      dispatch(dashboardActions.getLiveTvCategories(testLine)),
    moviesCategories: (testLine) =>
      dispatch(dashboardActions.getMoviesCategories(testLine)),
    seriesCategories: (testLine) =>
      dispatch(dashboardActions.getSeriesCategories(testLine)),
    logout: () => dispatch(dashboardActions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
