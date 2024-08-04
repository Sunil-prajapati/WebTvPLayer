import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import LabelText from "../../components/typography/labelText";
import "../../styles/pages/livetv.scss";
import { useSelector } from "react-redux";
import * as livetvAction from "../../action/livetvAction";
import { connect } from "react-redux";
import Backward from "../../assets/svg/arrow.svg";
import { isBrowser, withHttp } from "../../constant/helper";
import EpgSection from "../../components/LiveTv/EpgSection";
import LiveVideoSection from "../../components/LiveTv/LiveVideoSection";
import ChannelButton from "../../components/buttons/ChannelButton";
import useLiveCategoryChannels from "./hooks/useLiveCategoryChannels";
import FullPageLoader from "../../components/common/FullPageLoader";

function LiveTv({ setLiveFavourites, removeLiveFavourite, callRecentPlayed }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [videoURL, setVideoUrl] = useState();
  const [currentFavouriteClicked, setCurrentFavouriteCliked] = useState([]);
  const [search, setSearch] = useState("");
  const liveFavouriteChannels = useSelector(
    (state) => state.livetvReducer?.liveFavouriteChannels
  );
  const { loading, allChannels, setAllChannels, getChannelsOfCategories } =
    useLiveCategoryChannels();
  const { username, password } = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );
  const { url, port } = useSelector(
    (state) => state.loginReducer?.userDetails?.server_info
  );
  const [selectedLiveChannel, setSelectedLiveChannel] = useState(
    window.history?.state?.usr?.allChannels?.[currentPage]
  );
  const [selectedLiveCategory, setSelectedLiveCategory] = useState(
    window.history?.state?.usr?.selectedCategoryChannels
  );

  // function filterOutFavouriteChannels() {
  //   const commonChannels = allChannels?.filter((list) =>
  //     liveFavouriteChannels?.some(
  //       (favChannels) => favChannels.stream_id === list.stream_id
  //     )
  //   );
  //   commonChannels?.forEach((obj) => {
  //     const index = allChannels?.findIndex(
  //       (obj1) => obj1.stream_id === obj.stream_id
  //     );
  //     allChannels[index] = { ...allChannels[index], isFavourite: true };
  //   });
  // }

  useEffect(() => {
    const path = isBrowser && window.history;
    if (path?.state?.usr?.categoryIndex === 1) {
      setAllChannels(liveFavouriteChannels);
    } else {
      getChannelsOfCategories(
        path?.state?.usr?.selectedCategoryChannels?.category_id
      );
    }
    setCurrentPage(path?.state?.usr?.categoryIndex);
    setSelectedLiveCategory(
      path?.state?.usr?.liveTvChannels?.[path?.state?.usr?.categoryIndex]
    );
    // filterOutFavouriteChannels();
  }, []);

  const selectedChannel = (channel) => {
    setSelectedLiveChannel(channel);
    setVideoUrl(
      `${withHttp(url)}:${port}/live/${username}/${password}/${
        channel?.stream_id
      }.m3u8`
    );
  };

  const moveForward = () => {
    setCurrentPage(currentPage + 1);
    setSelectedLiveCategory(
      window.history?.state?.usr?.liveTvChannels?.[currentPage]
    );
    getChannelsOfCategories(
      window.history?.state?.usr?.liveTvChannels?.[currentPage]?.category_id
    );
  };

  const backWard = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedLiveCategory(
        window.history?.state?.usr?.liveTvChannels?.[currentPage]
      );
      getChannelsOfCategories(
        window.history?.state?.usr?.liveTvChannels?.[currentPage]?.category_id
      );
    }
  };

  const heartClicked = async (event, data) => {
    event.stopPropagation();
    if (data?.isFavourite) {
      // REMOVING FAVOURITE CHANNEL ICON
      const indexFavouriteIcon = currentFavouriteClicked.findIndex(
        (item) => item.stream_id === data.stream_id
      );
      const afterRemovingFavourite = currentFavouriteClicked.splice(
        indexFavouriteIcon,
        1
      );
      setCurrentFavouriteCliked(afterRemovingFavourite);
      // REMOVING FAVOURITE CHANNEL FROM REDUCER
      const indexofFavouriteChannel = liveFavouriteChannels.findIndex(
        (item) => item.stream_id === data.stream_id
      );
      liveFavouriteChannels.splice(indexofFavouriteChannel, 1);
      await removeLiveFavourite(liveFavouriteChannels);
    } else {
      setCurrentFavouriteCliked([...currentFavouriteClicked, data?.stream_id]);
      const favouriteChannelObject = allChannels?.find(
        (element) => element?.stream_id === data?.stream_id
      );
      await setLiveFavourites(favouriteChannelObject);
    }
  };

  const searchQuery = (query) => {
    setSearch(query);
  };

  return (
    <div>
      <Navbar
        searchedString={searchQuery}
        notCategories={true}
        searchByNum={true}
      />
      <div className="flex flex-row w-full lg:gap-8 gap-4 lg-px-10 px-4">
        <div className="flex flex-col w-[35%] h-[670px] overflow-scroll sticky top-0">
          <div className="rounded-[1.178px] border border-rgbaColor-100">
            <div className="flex flex-row justify-between lg:p-4 p-3">
              <img
                src={Backward}
                alt="backward arrow"
                className="lg:w-4 max-3 cursor-pointer lg:h-[38px] h-[24px]"
                onClick={backWard}
              />
              <LabelText
                text={selectedLiveCategory?.category_name}
                textColor="text-white"
                fontSize="lg:text-2xl text-base"
              />
              <img
                src={Backward}
                alt="forward arrow"
                className="transform rotate-180 cursor-pointer lg:w-4 max-3 lg:h-[38px] h-[24px]"
                onClick={moveForward}
              />
            </div>
          </div>
          {loading ? (
            <FullPageLoader />
          ) : (
            <>
              {allChannels
                ?.filter((item) => {
                  return search.toLocaleLowerCase() === ""
                    ? item
                    : item?.name.toLowerCase().includes(search);
                })
                ?.map((channel, index) => {
                  return (
                    <ChannelButton
                      key={index}
                      data={channel}
                      num={index + 1}
                      favouriteClickedStreamId={currentFavouriteClicked}
                      bgColor={
                        channel?.num === selectedLiveChannel?.num &&
                        "bg-rgbaColor-300"
                      }
                      onClick={() => selectedChannel(channel)}
                      onHeartClicked={(event) => heartClicked(event, channel)}
                    />
                  );
                })}
            </>
          )}
        </div>
        <div className="w-[65%]">
          <LiveVideoSection
            setVideoUrl={setVideoUrl}
            videoURL={videoURL}
            selectedChannel={selectedLiveChannel}
          />
          <EpgSection
            streamId={selectedLiveChannel?.stream_id}
            categoryName={selectedLiveCategory?.category_name}
          />
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLiveFavourites: (channelList) =>
      dispatch(livetvAction.setLiveTvFavourites(channelList)),
    removeLiveFavourite: (channelList) =>
      dispatch(livetvAction.setLiveTvUnFavourites(channelList)),
    callRecentPlayed: (channel) =>
      dispatch(livetvAction.setLiveTvPlayed(channel)),
  };
};

export default connect(null, mapDispatchToProps)(LiveTv);
