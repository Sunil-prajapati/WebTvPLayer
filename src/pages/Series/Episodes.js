import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withHttp } from "../../constant/helper";
import LabelText from "../../components/typography/labelText";
import "../../styles/pages/episode.scss";
import StarSvg from "../../assets/svg/star.svg";
import calenderSvg from "../../assets/svg/calender.svg";
import gridSvg from "../../assets/svg/grid.svg";
import listSvg from "../../assets/svg/list.svg";
import Tabs from "../../components/Series/Tabs";
import SingleEpisode from "../../components/Series/SingleEpisode";

function Episodes() {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [videoURL, setVideoUrl] = useState("");
  const [videoError, setVideoError] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const seriesInfo = useSelector((state) => state.seriesReducer?.seriesInfo);

  const { username, password } = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );
  const { url, port } = useSelector(
    (state) => state.loginReducer?.userDetails?.server_info
  );
  const { episodes, seasons, info } = seriesInfo;

  const onSelectSeason = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  const watchNow = async (streamId, extension) => {
    setVideoUrl(
      `${withHttp(
        url
      )}:${port}/series/${username}/${password}/${streamId}.${extension}`
    );
  };

  const toggleFullScreen = () => {
    var videoPlayerElement = document.getElementById("mySeriesVideo");
    if (videoPlayerElement && videoPlayerElement.requestFullscreen) {
      videoPlayerElement.requestFullscreen();
    } else if (
      videoPlayerElement &&
      videoPlayerElement.webkitRequestFullscreen
    ) {
      /* Safari */
      videoPlayerElement.webkitRequestFullscreen();
    } else if (videoPlayerElement && videoPlayerElement.msRequestFullscreen) {
      /* IE11 */
      videoPlayerElement.msRequestFullscreen();
    }
  };
  const onVideoError = () => {
    setVideoError(true);
  };

  useEffect(() => {
    toggleFullScreen();
  }, [videoURL]);

  const forNoSeason = {
    season_number: 1,
  };

  return (
    <div className="flex flex-col lg:m-6 m-4">
      <div className="flex flex-row lg:gap-6 gap-2">
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
            text={info?.releaseDate ? info?.releaseDate : "N/A"}
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
      <LabelText
        text="For missing Seasons and episodes contact  your service provider now."
        textColor="text-white"
        fontWeight="text-bold"
        fontSize="lg:text-[15px] text-[8px] mt-3"
      />
      <div className="lg:my-6 my-3 flex flex-wrap gap-2">
        {seasons.length === 0 && episodes?.[1].length > 1 ? (
          <Tabs
            data={forNoSeason}
            onClick={() => onSelectSeason(forNoSeason?.season_number)}
            activeSeason={selectedSeason}
          />
        ) : (
          <>
            {seasons?.map((season, index) => {
              return (
                <Tabs
                  data={season}
                  key={index}
                  onClick={() => onSelectSeason(season?.season_number)}
                  activeSeason={selectedSeason}
                />
              );
            })}
          </>
        )}
      </div>

      {videoURL && !videoError ? (
        <div className="border series-video-container lg:mt-4 mt-2">
          <video
            id="mySeriesVideo"
            controls
            loop
            preload="metadata"
            onError={onVideoError}
            autoPlay={true}
            poster={
              info?.backdrop_path?.[0] ? info?.backdrop_path?.[0] : info?.cover
            }
            width="620px"
            height="335px"
            src={videoURL}
          ></video>
        </div>
      ) : videoError ? (
        <div className="border-2 border-white series-video-container rounded-lg lg:mt-4 mt-2">
          <LabelText
            text="Playback error!"
            textColor="text-white"
            textAlign="text-center"
          />
        </div>
      ) : null}
      <div className="flex flex-row justify-end border-b-2 border-gray-600">
        <div className="flex flex-row gap-2 pb-1">
          <img
            src={gridSvg}
            alt="grid"
            width="25"
            height="25"
            className="cursor-pointer"
            onClick={() => setIsGrid(true)}
          />
          <img
            src={listSvg}
            alt="list"
            width="25"
            height="25"
            className="cursor-pointer"
            onClick={() => setIsGrid(false)}
          />
        </div>
      </div>
      <div
        className={`lg:my-8 my-4 flex ${
          isGrid ? "flex-wrap gap-4" : "flex-col"
        }`}
      >
        {episodes?.[selectedSeason]?.map((episode, index) => {
          return (
            <SingleEpisode
              data={episode}
              isGrid={isGrid}
              key={index}
              seasonName={seasons?.[selectedSeason - 1]?.name}
              onClick={() =>
                watchNow(episode?.id, episode?.container_extension)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default Episodes;
