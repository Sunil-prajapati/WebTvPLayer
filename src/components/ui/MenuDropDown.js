import React from "react";
import "../../styles/component/menuDropDown.scss";
import LabelText from "../typography/labelText";
import LiveTv from "../../assets/svg/liveTv";
import Movies from "../../assets/svg/Movies";
import Series from "../../assets/svg/series";
import Logout from "../../assets/svg/logout";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as dashboardActions from "../../action/dashboardAction";
import { connect } from "react-redux";
import Home from "../../assets/svg/Home";

const dropDownItem = [
  {
    title: "Home",
    icon: <Home />,
    link: "/dashboard",
  },
  {
    title: "Live TV",
    icon: <LiveTv />,
    link: "/livetvCategories",
  },
  {
    title: "Movies",
    icon: <Movies />,
    link: "/dashboard/moviesCategories",
  },
  {
    title: "Series",
    icon: <Series />,
    link: "/seriesCategories",
  },
  {
    title: "Logout",
    icon: <Logout />,
  },
];


function MenuDropDown({ className, logout }) {
  const navigate = useNavigate();

  const navigateTo = (link) => {
    navigate(link);
  };

  const logoutClick = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className={`menu-drop-down-container ${className}`} >
      <div className="py-2">
        {dropDownItem?.map((items, index) => {
          return (
            <div key={index}>
              {index !== 0 && <hr />}
              <div
                className="flex flex-row items-center pt-1 gap gap-2 pb-2 px-2"
                onClick={() =>
                  index === dropDownItem.length - 1
                    ? logoutClick()
                    : navigateTo(items?.link)
                }
              >
                <div className="drop-down-icon">{items?.icon}</div>
                <LabelText
                  text={items?.title}
                  textColor="text-white"
                  fontSize="text-lg"
                  fontWeight="text-regular"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(dashboardActions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(MenuDropDown);

MenuDropDown.propTypes = {
  className: PropTypes.string,
  logout: PropTypes.any,
};
