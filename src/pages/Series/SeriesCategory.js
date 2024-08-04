import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as seriesAction from "../../action/seriesAction";
import { connect } from "react-redux";
import { getUnlockedCategories, withHttp } from "../../constant/helper";
import NoResultFound from "../../components/common/NoResultFound";
import { CATEGORY_ID } from "../../constant/enum";
import FullPageLoader from "../../components/common/FullPageLoader";
import CategorySearchbar from "../../components/common/CategorySearchbar";
import CategoriesList from "../../components/common/CategoriesList";
import NewMoviesSeriesCard from "../../components/Cards/NewMoviesSeriesCard";

function SeriesCategory({ series, seriesInfo, callPlayedSeries }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allChannels, setAllChannels] = useState();
  const [search, setSearch] = useState("");
  const seriesCategories = useSelector(
    (state) => state.dashboardReducer?.allSeriesCategories
  );
  const { username, password } = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );
  const { url, port } = useSelector(
    (state) => state.loginReducer?.userDetails?.server_info
  );
  const allLockCategories = useSelector(
    (state) => state?.livetvReducer?.lockedCategories
  );
  const favouriteSeries = useSelector(
    (state) => state?.seriesReducer?.allFavouriteSeries
  );

  const recentPlayedSeries = useSelector(
    (state) => state.seriesReducer?.seriesRecentPlayed
  );

  const [dataToShow, setDataToShow] = useState(seriesCategories);
  const [loading, setLoading] = useState(false);

  const onSelectCategory = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    if (categoryId === CATEGORY_ID.FAVOURITES) {
      setAllChannels(favouriteSeries);
    } else {
      const moviesListUrl = `${withHttp(
        url
      )}:${port}/player_api.php?username=${username}&password=${password}&action=get_series&category_id=${categoryId}`;
      const moviesListResponse = await series(moviesListUrl);
      if (moviesListResponse?.status === 200) {
        setAllChannels(moviesListResponse?.data);
      }
    }

    setLoading(false);
  };

  const searchCategory = useCallback((value) => {
    if (value) {
      const filteredData = dataToShow?.filter((channel) =>
        (channel?.category_name).toLowerCase().includes(value.toLowerCase())
      );
      setDataToShow(filteredData);
    } else {
      setDataToShow(seriesCategories);
    }
  }, []);

  const redirectToSeriesInfo = async (streamId, series) => {
    const seriesInfoUrl = `${withHttp(
      url
    )}:${port}/player_api.php?username=${username}&password=${password}&action=get_series_info&series_id=${streamId}`;

    const seriesInfoResponse = await seriesInfo(seriesInfoUrl);
    if (seriesInfoResponse?.status === 200) {
      const isSeriesAlreadyPlayed = recentPlayedSeries?.find(
        (item) => item?.series_id === series?.series_id
      );
      if (!isSeriesAlreadyPlayed) {
        await callPlayedSeries(series);
      }
      navigate("/series-info", {
        state: {
          series: series,
        },
      });
    }
  };

  const searchQuery = (query) => {
    setSearch(query);
  };

  useEffect(() => {
    const newCategories = [
      {
        category_id: CATEGORY_ID.ALL,
        category_name: "ALL",
        parent_id: 0,
      },
      {
        category_id: CATEGORY_ID.FAVOURITES,
        category_name: "Favourites",
        parent_id: 0,
      },
      // {
      //   category_id: CATEGORY_ID.RECENT_PLAYED,
      //   category_name: "Recent Played",
      //   parent_id: 3,
      // },
      ...dataToShow,
    ];
    setDataToShow(newCategories);
    onSelectCategory(seriesCategories?.[0]?.category_id);
  }, []);

  return (
    <div>
      <Navbar heading="Series" searchedString={searchQuery} />
      <div className="flex flex-row gap-5 md:mx-5 mx-auto">
        <div className="lg:w-[400px] w-[250px]">
          <CategorySearchbar
            placeholder="Search in categories"
            onChange={(value) => searchCategory(value)}
          />
          {getUnlockedCategories(dataToShow, allLockCategories)?.length !==
          0 ? (
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
                      onClick={() => onSelectCategory(category?.category_id)}
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
              ?.map((series, index) => {
                return (
                  <NewMoviesSeriesCard
                    data={series}
                    key={index}
                    onClick={() =>
                      redirectToSeriesInfo(series?.series_id, series)
                    }
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    series: (testLine) => dispatch(seriesAction.getSeries(testLine)),
    seriesInfo: (testLine) => dispatch(seriesAction.getSeriesinfo(testLine)),
    callPlayedSeries: (playedSeries) =>
      dispatch(seriesAction.setSeriesPlayed(playedSeries)),
  };
};

export default connect(null, mapDispatchToProps)(SeriesCategory);
