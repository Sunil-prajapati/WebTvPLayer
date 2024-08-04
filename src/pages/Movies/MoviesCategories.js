import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as moviesAction from "../../action/moviesAction";
import { connect } from "react-redux";
import { getUnlockedCategories, withHttp } from "../../constant/helper";
import NoResultFound from "../../components/common/NoResultFound";
import { CATEGORY_ID } from "../../constant/enum";
import FullPageLoader from "../../components/common/FullPageLoader";
import CategorySearchbar from "../../components/common/CategorySearchbar";
import CategoriesList from "../../components/common/CategoriesList";
import NewMoviesSeriesCard from "../../components/Cards/NewMoviesSeriesCard";

function MoviesCategories({ movies, movieInfo }) {
  const navigate = useNavigate();
  const moviesCategories = useSelector(
    (state) => state.dashboardReducer?.allMoviesCategories
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

  const [dataToShow, setDataToShow] = useState(moviesCategories);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allChannels, setAllChannels] = useState();
  const [search, setSearch] = useState("");
  const favouriteMovies = useSelector(
    (state) => state?.movieReducer?.allFavouriteMovies
  );

  const onSelectCategory = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    if (categoryId === CATEGORY_ID.FAVOURITES) {
      setAllChannels(favouriteMovies);
    } else {
      const moviesListUrl = `${withHttp(
        url
      )}:${port}/player_api.php?username=${username}&password=${password}&action=get_vod_streams&category_id=${categoryId}`;
      const moviesListResponse = await movies(moviesListUrl);
      if (moviesListResponse?.status === 200) {
        setAllChannels(moviesListResponse?.data);
      }
    }

    setLoading(false);
  };

  const redirectToMovieInfo = async (streamId, movie) => {
    const movieInfoUrl = `${withHttp(
      url
    )}:${port}/player_api.php?username=${username}&password=${password}&action=get_vod_info&vod_id=${streamId}`;
    const movieInfoResponse = await movieInfo(movieInfoUrl);
    if (movieInfoResponse?.status === 200) {
      navigate("/dashboard/moviesCategories/movies/movie-info", {
        state: { movie: movie },
      });
    }
  };

  useEffect(() => {
    const newItems = [
      {
        category_id: CATEGORY_ID.ALL,
        category_name: "ALL",
        parent_id: 0,
      },
      {
        category_id: CATEGORY_ID.FAVOURITES,
        category_name: "Favourites",
        parent_id: 1,
      },
      // {
      //   category_id: CATEGORY_ID.RECENT_PLAYED,
      //   category_name: "Recent Played",
      //   parent_id: 3,
      // },
      ...dataToShow,
    ];
    setDataToShow(newItems);
    onSelectCategory(moviesCategories?.[0]?.category_id);
  }, []);

  const searchCategory = useCallback((value) => {
    if (value) {
      const filteredData = dataToShow?.filter((channel) =>
        (channel?.category_name).toLowerCase().includes(value.toLowerCase())
      );
      setDataToShow(filteredData);
    } else {
      setDataToShow(moviesCategories);
    }
  }, []);

  const searchQuery = (query) => {
    setSearch(query);
  };

  return (
    <div>
      <Navbar heading="Movies" searchedString={searchQuery} />
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
              ?.map((movie, index) => {
                return (
                  <NewMoviesSeriesCard
                    data={movie}
                    key={index}
                    onClick={() => redirectToMovieInfo(movie?.stream_id, movie)}
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
    movies: (testLine) => dispatch(moviesAction.getMovies(testLine)),
    movieInfo: (testLine) => dispatch(moviesAction.getMovieinfo(testLine)),
  };
};

export default connect(null, mapDispatchToProps)(MoviesCategories);
