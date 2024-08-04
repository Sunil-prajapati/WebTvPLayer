import React, { useState, useRef, useEffect } from "react";
import LabelText from "../../../components/typography/labelText";
import { isBrowser } from "../../../constant/helper";
import { PlayButton } from "../../../components/buttons/PlayButton";
import "../../../styles/pages/movie-info.scss";

const MoviesInfo = () => {
  const [videoURL, setVideoUrl] = useState();
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const path = isBrowser && window.history;

  const playMovie = () => {
    setVideoUrl(path?.state?.usr.info.link);
    setVideoError(false);
  };

  const toggleFullScreen = () => {
    var videoPlayerElement = document.getElementById("myvideo");
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

  useEffect(() => {
    toggleFullScreen();
  }, [videoURL, videoError]);

  const onVideoError = () => {
    setVideoError(true);
  };
  return (
    <div className="flex flex-col lg:mx-10 mx-auto my-8">
      <div className="flex flex-row lg:gap-11 gap-6">
        <div className="flex flex-col">
          <LabelText
            text={path?.state?.usr?.info?.tvg_name}
            textColor="text-white"
            fontWeight="text-bold"
            fontSize="lg:text-[40px] text-[25px]"
          />
          <div className="bg-green-400 mt-5 w-fit">
            <LabelText
              text={path?.state?.usr?.info?.group_title}
              textColor="text-white"
              fontWeight="text-normal"
              fontSize="lg:text-[30px] text-[15px]"
              className="py-[14px] px-[30px] max-w-[500px]"
            />
          </div>
          <LabelText
            text="N/A"
            textColor="text-white"
            fontWeight="text-normal"
            fontSize="lg:text-[30px] text-[15px]"
            className="py-[70px] px-[30px]"
          />
          <PlayButton onClick={playMovie} />
        </div>
        {videoURL && !videoError ? (
          <div
            className="movies-video-container lg:mt-4 mt-2"
            id="player_container"
          >
            <video
              ref={videoRef}
              id="myvideo"
              controls
              loop
              preload="metadata"
              onError={onVideoError}
              autoPlay={true}
              poster={path?.state?.usr.info.tvg_logo}
              width="620px"
              height="335px"
              src={videoURL}
            ></video>
          </div>
        ) : videoError ? (
          <div className="movies-video-container flex justify-center items-center h-full border-2 border-white rounded-lg lg:mt-4 mt-2">
            <LabelText
              text="Playback error!"
              textColor="text-white"
              textAlign="text-center"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MoviesInfo;
