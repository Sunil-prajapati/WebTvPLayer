import React from "react";
import MainButton from "../../components/buttons/MainButton";
import NormalButton from "../../components/buttons/NormalButton";
import LiveTv from "../../assets/svg/liveTv";
import Movies from "../../assets/svg/Movies";
import Series from "../../assets/svg/series";
import "../../styles/pages/favourite.scss";
import { useNavigate } from "react-router-dom";
import { CATEGORY_TYPE } from "../../constant/enum";
import PrimaryNavbar from "../../components/common/PrimaryNavbar";

export default function Favourites() {
  const navigate = useNavigate();
  const toLiveFav = () => {
    navigate("/livetv", {
      state: {
        categoryName: "Favourites",
        categoryType: CATEGORY_TYPE?.FAVOURITES,
      },
    });
  };
  const toMovieFav = () => {
    navigate("/dashboard/moviesCategories/movies", {
      state: {
        categoryName: "Favourites",
        categoryType: CATEGORY_TYPE?.FAVOURITES,
      },
    });
  };
  const toSeriesFav = () => {
    navigate("/series", {
      state: {
        categoryName: "Favourites",
        categoryType: CATEGORY_TYPE?.FAVOURITES,
      },
    });
  };
  return (
    <>
      <PrimaryNavbar/>
      <div className="mt-10">
        <div className="w-full flex justify-center items-center">
          <NormalButton
            caption="Favourites"
            fontSize="text-4xl"
            containerClass="fav-btn"
          />
        </div>
        <div className="flex flex-row justify-around lg:mt-28 mt-12">
          <MainButton
            caption="Live Tv"
            captionColor="text-grey-100"
            captionBgColor="bg-blue-100"
            iconBgBackground="bg-blue-200"
            onClick={toLiveFav}
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
            onClick={toMovieFav}
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
            onClick={toSeriesFav}
          >
            <div className="main-btn-icon">
              <Series />
            </div>
          </MainButton>
        </div>
      </div>
    </>
  );
}
