import React, { useEffect, useState } from "react";
import Navbar from "../../../components/common/Navbar";
import { arrangeByGroupTitle, isBrowser } from "../../../constant/helper";
import ChannelButton from "../../../components/buttons/ChannelButton";
import Backward from "../../../assets/svg/arrow.svg";
import LabelText from "../../../components/typography/labelText";
import M3uVideoSection from "../../../components/LiveTv/m3u/M3uVideoSection";
import M3uEpgSection from "../../../components/LiveTv/m3u/M3uEpgSection";

const M3uLiveMain = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLiveChannel, setSelectedLiveChannel] = useState(
    window.history?.state?.usr?.allChannels?.[currentPage]
  );
  const liveTvChannels = window.history?.state?.usr?.liveTvChannels;
  const arrangedCategory = arrangeByGroupTitle(liveTvChannels);
  useEffect(() => {
    const path = isBrowser && window.history;
    setSelectedCategory(path?.state?.usr?.allChannels);
  }, []);

  const selectedChannel = (channel) => {
    setSelectedLiveChannel(channel);
  };

  const moveForward = () => {
    if (currentPage < arrangedCategory?.length) {
      setCurrentPage(currentPage + 1);
      setSelectedCategory(arrangedCategory[currentPage]);
      setSelectedLiveChannel(arrangedCategory[currentPage]?.[0]);
    }
  };

  const backWard = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedCategory(arrangedCategory[currentPage]);
      setSelectedLiveChannel(arrangedCategory[currentPage]?.[0]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-row w-full lg:gap-8 gap-4 lg-px-10 px-4">
        <div className="flex flex-col w-[35%] h-[670px] overflow-scroll sticky top-0">
          <div className="rounded-[1.178px] border border-rgbaColor-100">
            <div className="flex flex-row justify-between lg:p-4 p-3">
              <img
                src={Backward}
                alt="backward arrow"
                className="lg:w-4 max-3 lg:h-[38px] h-[24px]"
                onClick={backWard}
              />
              <LabelText
                text={selectedLiveChannel?.group_title}
                textColor="text-white"
                fontSize="lg:text-2xl text-base"
              />
              <img
                src={Backward}
                alt="backward arrow"
                className="transform rotate-180 lg:w-4 max-3 lg:h-[38px] h-[24px]"
                onClick={moveForward}
              />
            </div>
          </div>
          {selectedCategory?.map((channel, index) => {
            return (
              <ChannelButton
                key={index}
                data={channel}
                num={index + 1}
                bgColor={
                  channel?.tvg_name === selectedLiveChannel?.tvg_name &&
                  "bg-rgbaColor-300"
                }
                onClick={() => selectedChannel(channel)}
              />
            );
          })}
        </div>
        <div className="w-[65%]">
          <M3uVideoSection channel={selectedLiveChannel} />
          <M3uEpgSection epgUrl={selectedCategory?.[0]?.tvg_link} />
        </div>
      </div>
    </div>
  );
};

export default M3uLiveMain;
