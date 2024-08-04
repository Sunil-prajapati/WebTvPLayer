import * as actionTypes from "../actionTypes/movies";
import axios from "axios";

export const getMoviesChannelsRequest = (testline) => ({
  type: actionTypes.GET_MOVIES_CHANNELS,
  payload: testline,
});

export const getMoviesChannelsSuccess = (data) => ({
  type: actionTypes.GET_MOVIES_CHANNELS_SUCCESS,
  payload: data,
});

export const getMoviesChannelsFailure = (error) => ({
  type: actionTypes.GET_MOVIES_CHANNELS_FAILURE,
  payload: error,
});

export const getMovies = (testlineUrl) => {
  return async (dispatch) => {
    try {
      dispatch(getMoviesChannelsRequest(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response.data) {
        await dispatch(getMoviesChannelsSuccess(response.data));
        return response;
      }
    } catch (error) {
      dispatch(getMoviesChannelsFailure(error));
    }
  };
};


export const getMovieInfoRequest = (testline) => ({
  type: actionTypes.GET_MOVIE_INFO,
  payload: testline,
});

export const getMovieInfoSuccess = (data) => ({
  type: actionTypes.GET_MOVIE_INFO_SUCCESS,
  payload: data,
});

export const getMovieInfoFailure = (error) => ({
  type: actionTypes.GET_MOVIE_INFO_FAILURE,
  payload: error,
});

export const getMovieinfo = (testlineUrl) => {
  return async (dispatch) => {
    try {
      dispatch(getMovieInfoRequest(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response.data) {
        await dispatch(getMovieInfoSuccess(response.data));
        return response;
      }
    } catch (error) {
      dispatch(getMovieInfoFailure(error));
    }
  };
};


export const addMovieFavourites = (favourites) => ({
  type: actionTypes.SET_MOVIE_FAVOURITES,
  favouriteMovies: favourites
});

export const setMovieTvFavourites = (favourites) => {
  return async dispatch => {
      dispatch(addMovieFavourites(favourites));
  };
};

export const removeMovieFavourites = (unFavourite) => ({
  type: actionTypes.REMOVE_MOVIE_FAVOURITES,
  unFavouriteMovies: unFavourite
});

export const setMovieUnFavourites = (unFavourite) => {
  return async dispatch => {
      dispatch(removeMovieFavourites(unFavourite));
  };
};


export const addRecentlyPlayed = (playedMovie) => ({
  type: actionTypes.ADD_RECENT_PLAYED,
  playedMovie: playedMovie,
});

export const setMoviePlayed = (movie) => {
  return async (dispatch) => {
    dispatch(addRecentlyPlayed(movie));
  };
};
