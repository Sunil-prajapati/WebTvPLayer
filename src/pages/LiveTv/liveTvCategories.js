import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUnlockedCategories } from "../../constant/helper";
import NoResultFound from "../../components/common/NoResultFound";
import { CATEGORY_ID } from "../../constant/enum";
import FullPageLoader from "../../components/common/FullPageLoader";
import CategorySearchbar from "../../components/common/CategorySearchbar";
import CategoriesList from "../../components/common/CategoriesList";
import LiveTvChannelBox from "../../components/LiveTv/LiveTvChannelBox";
import useLiveCategoryChannels from "./hooks/useLiveCategoryChannels";

function LiveTvCategories() {
  const {
    loading,
    allChannels,
    setAllChannels,
    selectedCategory,
    setSelectedCategory,
    getChannelsOfCategories,
  } = useLiveCategoryChannels();
  const [categoryIndex, setCategoryIndex] = useState();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const liveCategories = useSelector(
    (state) => state.dashboardReducer?.allLiveCategories
  );
  const liveFavouriteChannels = useSelector(
    (state) => state.livetvReducer?.liveFavouriteChannels
  );

  const allLockCategories = useSelector(
    (state) => state?.livetvReducer?.lockedCategories
  );
  const [dataToShow, setDataToShow] = useState(liveCategories);

  useEffect(() => {
    const newItems = [
      {
        category_id: CATEGORY_ID.ALL,
        category_name: "ALL",
        parent_id: 1,
      },
      {
        category_id: CATEGORY_ID.FAVOURITES,
        category_name: "Favorites",
        parent_id: 0,
      },
      // {
      //   category_id: CATEGORY_ID.RECENT_PLAYED,
      //   category_name: "Recent Played",
      //   parent_id: 3,
      // },
      ...dataToShow,
    ];
    setDataToShow(newItems);
  }, []);

  useEffect(() => {
    getChannelsOfCategories(liveCategories?.[0]?.category_id);
  }, []);

  const onSelectCategory = (category, index) => {
    if (category?.category_id === CATEGORY_ID?.FAVOURITES) {
      setAllChannels(liveFavouriteChannels);
      setSelectedCategory(category?.category_id);
    } else {
      getChannelsOfCategories(category?.category_id);
    }
    setCategoryIndex(index);
  };

  const searchCategory = useCallback((value) => {
    if (value) {
      const filteredData = dataToShow?.filter((channel) =>
        (channel?.category_name).toLowerCase().includes(value.toLowerCase())
      );
      setDataToShow(filteredData);
    } else {
      setDataToShow(liveCategories);
    }
  }, []);

  const selectedChannel = (allChannels, channels) => {
    navigate("/livetv", {
      state: {
        allChannels: allChannels,
        liveTvChannels: dataToShow,
        selectedCategoryChannels: channels,
        categoryIndex: categoryIndex,
      },
    });
  };

  const searchQuery = (query) => {
    setSearch(query);
  };

  return (
    <div>
      <Navbar
        heading="LIVE TV"
        searchedString={searchQuery}
        notCategories={true}
      />
      <div className="flex flex-row gap-5 md:mx-5 mx-auto">
        <div className="lg:w-[400px] w-[250px]">
          <CategorySearchbar
            placeholder="Search in categories"
            onChange={(value) => searchCategory(value)}
          />
          {getUnlockedCategories(dataToShow, allLockCategories) !== 0 ? (
            <div className="flex flex-col h-[670px] overflow-scroll sticky top-0">
              {getUnlockedCategories(dataToShow, allLockCategories)?.map(
                (category, index) => {
                  return (
                    <CategoriesList
                      data={category}
                      bgColor={
                        selectedCategory === category?.category_id &&
                        "bg-rgbaColor-300"
                      }
                      key={index}
                      onClick={() => onSelectCategory(category, index)}
                    />
                  );
                }
              )}
            </div>
          ) : (
            <NoResultFound />
          )}
        </div>
        {loading ? (
          <FullPageLoader />
        ) : (
          <div className="flex flex-wrap lg:gap-2 gap-2 w-full h-full">
            {allChannels
              ?.filter((item) => {
                return search.toLocaleLowerCase() === ""
                  ? item
                  : item?.name.toLowerCase().includes(search);
              })
              ?.map((channels, index) => {
                return (
                  <LiveTvChannelBox
                    key={index}
                    title={channels?.name}
                    logo={channels?.stream_icon}
                    onClick={() => selectedChannel(allChannels, channels)}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveTvCategories;
