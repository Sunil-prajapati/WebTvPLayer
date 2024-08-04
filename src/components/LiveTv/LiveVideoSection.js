import React, { useRef, useState, useEffect } from "react";
import VideoJS from "../../components/common/VideoJs";
import { withHttp } from "../../constant/helper";
import LabelText from "../typography/labelText";
import { useSelector } from "react-redux";

export default function LiveVideoSection({
  setVideoUrl,
  videoURL,
  selectedChannel,
}) {
  const playerRef = useRef(null);
  const [liveError, setLiveError] = useState();
  const { username, password } = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );
  const { url, port } = useSelector(
    (state) => state.loginReducer?.userDetails?.server_info
  );
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    enableLowInitialPlaylist: true,
    fill: true,
    sources: [
      {
        src: videoURL,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("error", () => {
      setVideoUrl(
        `${withHttp(
          url
        )}:${port}/live/${username}/${password}/${selectedChannel}.m3u8`
      );
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
  }, [videoURL]);

  return (
    <div className="flex flex-row lg:gap-6 gap-3 w-full">
      <div className="w-[65%] border">
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
          text={selectedChannel?.name}
          textColor="text-white"
          fontSize="lg:text-2xl text-base"
          className="mt-2 px-2"
        />
      </div>
    </div>
  );
}
