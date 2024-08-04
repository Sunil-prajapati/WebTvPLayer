import React, { useState } from "react";
import { useSelector } from "react-redux";
import LabelText from "../../components/typography/labelText";
import "../../styles/pages/movie-info.scss";
import Heart from "../../assets/svg/heart";
import { COLORS, youtubeOpts } from "../../constant/enum";
import { onReady } from "../../constant/helper";
import YouTube from "react-youtube";
import { useLocation, useNavigate } from "react-router-dom";
import ClockSvg from "../../assets/svg/clock.svg";
import StarSvg from "../../assets/svg/star.svg";
import calenderSvg from "../../assets/svg/calender.svg";
import { PlayButton } from "../../components/buttons/PlayButton";
import { connect } from "react-redux";
import * as seriesAction from "../../action/seriesAction";

function SeriesInfo({ removeFavouriteSeries, addFavouriteSeries }) {
  const location = useLocation();
  const [currentFavouriteClicked, setCurrentFavouriteCliked] = useState([]);
  const seriesInfo = useSelector((state) => state.seriesReducer?.seriesInfo);
  const { info } = seriesInfo;
  const navigate = useNavigate();

  const selectedSeries = location?.state?.series;
  const favouriteSeries = useSelector(
    (state) => state?.seriesReducer?.allFavouriteSeries
  );

  const goToEpisodes = () => {
    navigate("/episodes", { state: { series: selectedSeries } });
  };

  const addToFavourites = async (seriesData) => {
    if (seriesData?.isFavourite) {
      const indexFavouriteIcon = currentFavouriteClicked?.findIndex(
        (item) => item?.series_id === seriesData?.series_id
      );
      const afterRemovingFavourite = currentFavouriteClicked?.splice(
        indexFavouriteIcon,
        1
      );
      setCurrentFavouriteCliked(afterRemovingFavourite);

      // actual one
      const indexofFavouriteMovie = favouriteSeries?.findIndex(
        (item) => item?.series_id === seriesData?.series_id
      );

      favouriteSeries?.splice(indexofFavouriteMovie, 1);
      await removeFavouriteSeries(favouriteSeries);
    } else {
      setCurrentFavouriteCliked([
        ...currentFavouriteClicked,
        seriesData?.series_id,
      ]);
      info.isFavourite = true;
      await addFavouriteSeries(info);
    }
  };

  return (
    <div className="flex flex-col lg:mx-10 mx-auto my-8">
      <div className="flex flex-row justify-between lg:gap-11 gap-6 w-full">
        <div className="flex flex-col">
          <div className="flex flex-row gap-3">
            <div className="flex flex-row gap-1">
              <img src={ClockSvg} alt="duration" width="30" height="30" />
              <LabelText
                text={info?.duration ? info?.duration : "N/A"}
                fontSize="lg:text-[18px] text-[12px]"
                textColor="text-white"
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <img src={StarSvg} alt="rating" width="25" height="25" />
              <LabelText
                text={info?.rating ? info?.rating : "N/A"}
                fontSize="lg:text-[18px] text-[12px]"
                textColor="text-white"
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <img src={calenderSvg} alt="calender" width="25" height="25" />
              <LabelText
                text={info?.releasedate ? info?.releasedate : "N/A"}
                fontSize="lg:text-[18px] text-[12px]"
                textColor="text-white"
              />
            </div>
          </div>
          <LabelText
            text={info?.name ? info?.name : "N/A"}
            textColor="text-white"
            fontWeight="text-bold"
            fontSize="lg:text-[40px] text-[25px] mt-3"
          />
          <div className="bg-green-400 mt-5 w-fit">
            <LabelText
              text={info?.genre ? info?.genre : "N/A"}
              textColor="text-white"
              fontWeight="text-normal"
              fontSize="lg:text-[30px] text-[15px]"
              className="py-[14px] px-[30px] max-w-[500px]"
            />
          </div>
          <LabelText
            text={info?.plot ? info?.plot : "N/A"}
            textColor="text-white"
            fontWeight="text-normal"
            fontSize="lg:text-[30px] text-[15px]"
            className="py-[70px]"
          />
        </div>
        <div className="border border-rgbaColor-100 flex justify-center items-center md:w-[640px] w-full h-[230px] mt-20">
          <div className="youtube-video-container lg:mt-4 mt-2">
            <YouTube
              videoId={info?.youtube_trailer}
              opts={youtubeOpts}
              onReady={onReady}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div
          className="bg-grey-200 flex items-center justify-center cursor-pointer"
          onClick={() => addToFavourites(info)}
        >
          <div className="lg:p-[17.86px] p-[8px] lg:w-[90px] w-[25px] lg:h-[90px] h-[25px]">
            <Heart fill={info?.isFavourite ? COLORS.RED : COLORS.WHITE} />
          </div>
        </div>
        <PlayButton bgColor="bg-grey-200" caption="Watch trailer" />
        <PlayButton
          bgColor="bg-grey-200"
          caption="All Episodes"
          onClick={goToEpisodes}
        />
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeFavouriteSeries: (favouriteSeriesList) =>
      dispatch(seriesAction.setSeriesUnFavourites(favouriteSeriesList)),
    addFavouriteSeries: (series) =>
      dispatch(seriesAction.setSeriesTvFavourites(series)),
  };
};
export default connect(null, mapDispatchToProps)(SeriesInfo);
