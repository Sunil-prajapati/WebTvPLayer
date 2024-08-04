import React, { useState, useRef, useEffect } from "react";
import VideoJS from "../../common/VideoJs";
import LabelText from "../../typography/labelText";

const M3uVideoSection = ({ channel }) => {
  const [liveError, setLiveError] = useState(false);
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    enableLowInitialPlaylist: true,
    fill: true,
    sources: [
      {
        src: channel?.link,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("error", () => {
      setLiveError(true);
    });

    player.on("play", () => {
      setLiveError(false);
    });

    player.on("waiting", () => {
      console.log("player is waiting");
      setLiveError(false);
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  useEffect(() => {
    setLiveError(false);
  }, [channel]);

  return (
    <div className="flex flex-row lg:gap-6 gap-3 w-full">
      <div className="w-[65%] h-auto border">
        {liveError ? (
          <div className="h-72 flex justify-center items-center">
            <LabelText
              text="Playback error!"
              fontSize="lg:text-3xl text-lg"
              textColor="text-white"
            />
          </div>
        ) : (
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        )}
      </div>
      <div className="w-[35%] h-auto flex flex-col items-center justify-center border border-rgbaColor-100">
        <div className="bg-rgbaColor-300 flex justify-center">
          <LabelText
            text="LIVE TV"
            textColor="text-white"
            fontSize="lg:text-2xl text-base"
            className="px-4"
          />
        </div>
        <LabelText
          text={channel?.tvg_name}
          textColor="text-white"
          fontSize="lg:text-2xl text-base"
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default M3uVideoSection;
