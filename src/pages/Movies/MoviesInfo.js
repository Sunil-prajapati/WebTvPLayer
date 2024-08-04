import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import LabelText from "../../components/typography/labelText";
import "../../styles/pages/movie-info.scss";
import Heart from "../../assets/svg/heart";
import { COLORS, youtubeOpts } from "../../constant/enum";
import { onReady, withHttp } from "../../constant/helper";
import YouTube from "react-youtube";
import { useLocation } from "react-router-dom";
import * as moviesAction from "../../action/moviesAction";
import { connect } from "react-redux";
import { PlayButton } from "../../components/buttons/PlayButton";
import ClockSvg from "../../assets/svg/clock.svg";
import StarSvg from "../../assets/svg/star.svg";
import calenderSvg from "../../assets/svg/calender.svg";
import PlayButtonImg from "../../assets/svg/PlayButton.svg";

function MoviesInfo({
  callRecentPlayed,
  removeFavouriteMovie,
  addFavouriteMovies,
}) {
  const location = useLocation();
  const [videoURL, setVideoUrl] = useState(false);
  const videoRef = useRef(null);
  const [youtubeVideo, setYoutubeVideo] = useState();
  const [videoError, setVideoError] = useState(false);
  const [currentFavouriteClicked, setCurrentFavouriteClicked] = useState([]);
  const movieInfo = useSelector((state) => state.movieReducer?.movieInfo);
  const recentPlayedList = useSelector(
    (state) => state.movieReducer?.movieRecentPlayed
  );

  const selectedMovie = location?.state?.movie;

  const { username, password } = useSelector(
    (state) => state.loginReducer?.userDetails?.user_info
  );
  const { url, port } = useSelector(
    (state) => state.loginReducer?.userDetails?.server_info
  );
  const { info, movie_data } = movieInfo;

  const favouriteMovies = useSelector(
    (state) => state?.movieReducer?.allFavouriteMovies
  );

  let video = `${withHttp(url)}:${port}/movie/${username}/${password}/${
    movie_data?.stream_id
  }.${movie_data?.container_extension}`;

  const watchNow = async () => {
    setVideoUrl(true);
    const isMovieAlreadyPlayed = recentPlayedList?.find(
      (item) => item?.stream_id === movie_data?.stream_id
    );
    if (!isMovieAlreadyPlayed) {
      await callRecentPlayed(selectedMovie);
    }
  };

  const watchTrailor = () => {
    setYoutubeVideo(`https://www.youtube.com/watch?v=${info?.youtube_trailer}`);
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
    setYoutubeVideo(`https://www.youtube.com/watch?v=${info?.youtube_trailer}`);
  }, [videoURL]);

  const onVideoError = () => {
    setVideoError(true);
  };

  const addToFavourite = async (movieData) => {
    if (movieData?.isFavourite) {
      const indexFavouriteIcon = currentFavouriteClicked?.findIndex(
        (item) => item.stream_id === movieData.stream_id
      );
      const afterRemovingFavourite = currentFavouriteClicked?.splice(
        indexFavouriteIcon,
        1
      );
      setCurrentFavouriteClicked(afterRemovingFavourite);
      // actual one
      const indexofFavouriteMovie = favouriteMovies?.findIndex(
        (item) => item.stream_id === movieData.stream_id
      );

      favouriteMovies?.splice(indexofFavouriteMovie, 1);
      await removeFavouriteMovie(favouriteMovies);
    } else {
      setCurrentFavouriteClicked([
        ...currentFavouriteClicked,
        movieData?.stream_id,
      ]);
      movie_data.isFavourite = true;
      movie_data.movie_image = info?.movie_image;
      await addFavouriteMovies(movie_data);
    }
  };
  return (
    <div className="flex flex-col lg:mx-10 mx-auto my-8">
      <div className="flex flex-row justify-between lg:gap-11 gap-6 w-full">
        <div className="flex flex-col">
          <div className="flex flex-row gap-3">
            <div className="flex flex-row gap-1">
              <img src={ClockSvg} alt="duration" width="30" height="30" />
              <LabelText
                text={info?.duration ? info?.duration : "N/A"}
                fontSize="lg:text-[18px] text-[12px]"
                textColor="text-white"
              />
            </div>
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
                text={info?.releasedate ? info?.releasedate : "N/A"}
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
          <div className="bg-green-400 mt-5 w-fit">
            <LabelText
              text={info?.genre ? info?.genre : "N/A"}
              textColor="text-white"
              fontWeight="text-normal"
              fontSize="lg:text-[30px] text-[15px]"
              className="py-[14px] px-[30px] max-w-[500px]"
            />
          </div>
          <LabelText
            text={info?.plot ? info?.plot : "N/A"}
            textColor="text-white"
            fontWeight="text-normal"
            fontSize="lg:text-[30px] text-[15px]"
            className="py-[70px]"
          />
          <div className="flex flex-row gap-4">
            <PlayButton icon={PlayButtonImg} onClick={watchNow} />
            <PlayButton
              onClick={watchTrailor}
              bgColor="bg-grey-200"
              caption="Watch trailer"
            />
            <div
              className="bg-grey-200 flex items-center justify-center cursor-pointer"
              onClick={() => addToFavourite(movieInfo)}
            >
              <div className="lg:p-[17.86px] p-[8px] lg:w-[90px] w-[25px] lg:h-[90px] h-[25px]">
                <Heart
                  fill={movie_data?.isFavourite ? COLORS.RED : COLORS.WHITE}
                />
              </div>
            </div>
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
                poster={info?.movie_image ? info?.movie_image : info?.cover_big}
                width="620px"
                height="335px"
                src={video}
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
        <div className="border border-rgbaColor-100 flex justify-center items-center w-[640px] h-[230px] mt-20">
          {youtubeVideo && (
            <div className="youtube-video-container lg:mt-4 mt-2">
              <YouTube
                videoId={info?.youtube_trailer}
                opts={youtubeOpts}
                onReady={onReady}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    callRecentPlayed: (movie) => dispatch(moviesAction.setMoviePlayed(movie)),
    removeFavouriteMovie: (favouriteMovieList) =>
      dispatch(moviesAction.setMovieUnFavourites(favouriteMovieList)),
    addFavouriteMovies: (movie) =>
      dispatch(moviesAction.setMovieTvFavourites(movie)),
  };
};
export default connect(null, mapDispatchToProps)(MoviesInfo);
