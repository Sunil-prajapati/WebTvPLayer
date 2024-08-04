import React, { useState, useEffect } from "react";
import Navbar from "../../../components/common/Navbar";
import LiveTvChannelBox from "../../../components/LiveTv/LiveTvChannelBox";
import { arrangeByGroupTitle, isBrowser } from "../../../constant/helper";
import CategorySearchbar from "../../../components/common/CategorySearchbar";
import CategoriesList from "../../../components/common/CategoriesList";
import { useNavigate } from "react-router-dom";
import NoResultFound from "../../../components/common/NoResultFound";

const M3uLive = () => {
  const navigate = useNavigate();
  const path = isBrowser && window.history;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allChannels, setAllChannels] = useState([]);
  const liveTvChannels = path.state?.usr?.liveTvCategories;
  const arrangedCategory = arrangeByGroupTitle(liveTvChannels);
  const [channelsByGroupTitle, setChannelsByGroupTitle] =
    useState(arrangedCategory);
  const [dataToShow, setDataToShow] = useState(liveTvChannels);

  const handleDataReceived = (data) => {
    setDataToShow(data);
  };

  const searchQuery = (query) => {
    if (query === "") {
      setDataToShow(liveTvChannels);
    }
  };

  const selectedChannel = (allChannels) => {
    navigate("/m3u-live-main", {
      state: { allChannels: allChannels, liveTvChannels: liveTvChannels },
    });
  };

  useEffect(() => {
    setSelectedCategory(channelsByGroupTitle?.[0]?.[0]?.group_title);
    setAllChannels(channelsByGroupTitle?.[0]);
  }, []);

  const onSelectCategory = (category) => {
    setSelectedCategory(category?.[0]?.group_title);
    setAllChannels(category);
  };

  const searchCategory = (value) => {
    if (value) {
      const filteredData = channelsByGroupTitle?.filter((channel) =>
        (channel?.[0]?.group_title).toLowerCase().includes(value.toLowerCase())
      );
      setChannelsByGroupTitle(filteredData);
    } else {
      setChannelsByGroupTitle(arrangedCategory);
    }
  };

  return (
    <div>
      <Navbar
        data={dataToShow}
        searchResult={handleDataReceived}
        searchedString={searchQuery}
        notCategories={true}
      />
      {liveTvChannels.length > 0 ? (
        <div className="flex flex-row gap-5 md:mx-5 mx-auto">
          <div className="lg:w-[400px] w-[250px]">
            <CategorySearchbar
              placeholder="Search in categories"
              onChange={(value) => searchCategory(value)}
            />
            <div className="flex flex-col h-[670px] overflow-scroll sticky top-0">
              {channelsByGroupTitle?.map((category, index) => {
                return (
                  <CategoriesList
                    data={category}
                    bgColor={
                      selectedCategory === category?.[0]?.group_title &&
                      "bg-rgbaColor-300"
                    }
                    key={index}
                    onClick={() => onSelectCategory(category)}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap lg:gap-2 gap-2 w-full h-full">
            {allChannels?.map((channels, index) => {
              return (
                <LiveTvChannelBox
                  key={index}
                  title={channels?.tvg_name}
                  logo={channels?.tvg_logo}
                  onClick={() => selectedChannel(allChannels)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <NoResultFound />
      )}
    </div>
  );
};

export default M3uLive;
