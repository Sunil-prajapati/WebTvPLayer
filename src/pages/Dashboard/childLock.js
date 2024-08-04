import React, { useState } from "react";
import LabelText from "../../components/typography/labelText";
import "../../styles/pages/childLock.scss";
import Logo from "../../assets/logo/logo.svg";
import UnLock from "../../assets/svg/WhiteUnLock";
import Lock from "../../assets/svg/WhiteLock";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as liveTvActions from "../../action/livetvAction";
import { connect } from "react-redux";
import UpdatePassword from "../../components/childLock/UpdatePassword";

let menus = [
  {
    name: "LIVE CATEGORIES",
    bgColor: "bg-lightColor-100",
  },
  {
    name: "MOVIES CATEGORIES",
    bgColor: "bg-lightColor-200",
  },
  {
    name: "SERIES CATEGORIES",
    bgColor: "bg-lightColor-300",
  },
  {
    name: "UPDATE PASSWORD",
    bgColor: "bg-lightColor-400",
  },
];
function ChildLock({ lockCategories }) {
  const navigate = useNavigate();
  const liveCategories = useSelector(
    (state) => state.dashboardReducer?.allLiveCategories
  );
  const moviesCategories = useSelector(
    (state) => state.dashboardReducer?.allMoviesCategories
  );
  const seriesCategories = useSelector(
    (state) => state.dashboardReducer?.allSeriesCategories
  );

  const allLockCategories = useSelector(
    (state) => state?.livetvReducer?.lockedCategories
  );

  const [category, setCategory] = useState(liveCategories);

  function selectCategory(categoryType) {
    if (categoryType === "MOVIES CATEGORIES") {
      setCategory(moviesCategories);
    } else if (categoryType === "SERIES CATEGORIES") {
      setCategory(seriesCategories);
    } else if (categoryType === "LIVE CATEGORIES") {
      setCategory(liveCategories);
    } else {
      setCategory(null);
    }
  }

  const lockTheCategory = async (categoryDetails) => {
    await lockCategories(categoryDetails);
  };

  function lockOrNot(category) {
    return allLockCategories?.some(
      (lockCategories) => lockCategories?.category_id === category?.category_id
    );
  }

  async function unLockTheCategory(category) {
    const indexofLockCategory = allLockCategories?.findIndex(
      (item) => item?.category_id === category?.category_id
    );
    allLockCategories.splice(indexofLockCategory, 1);
    await lockCategories(allLockCategories);
  }

  return (
    <>
      <div className="flex flex-row items-center lg:py-8 py-1 md:px-8 px-2">
        <img
          src={Logo}
          alt="logo"
          className="lg:w-32 w-28 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <LabelText
          text="Child Lock"
          className="pl-4 border-l border-white ml-4"
          textColor="text-white"
          fontSize="text-lg"
        />
      </div>
      <div className="child-lock-container mx-4">
        <div className="flex flex-row justify-center gap gap-2">
          {menus?.map((menu, index) => {
            return (
              <div
                className={`category-btn flex justify-center items-center cursor-pointer ${menu?.bgColor}`}
                key={index}
                onClick={() => selectCategory(menu?.name)}
              >
                <LabelText
                  text={menu?.name}
                  textColor="text-white"
                  fontWeight="font-medium"
                />
              </div>
            );
          })}
        </div>
        {category !== null ? (
          <div className="flex flex-col w-full px-4">
            {category?.map((category, index) => {
              return (
                <div
                  className="categories-list items-center flex flex-row justify-between px-5 w-full"
                  key={index}
                >
                  <LabelText
                    text={category?.category_name}
                    textColor="text-white"
                    fontWeight="text-medium"
                  />
                  {!lockOrNot(category) ? (
                    <div
                      className="lock-icon cursor-pointer"
                      onClick={() => lockTheCategory(category)}
                    >
                      <UnLock />
                    </div>
                  ) : (
                    <div
                      className="lock-icon cursor-pointer"
                      onClick={() => unLockTheCategory(category)}
                    >
                      <Lock />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <UpdatePassword />
        )}
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    lockCategories: (category) =>
      dispatch(liveTvActions.lockCategory(category)),
  };
};

export default connect(null, mapDispatchToProps)(ChildLock);
