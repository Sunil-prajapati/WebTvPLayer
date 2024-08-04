import * as actionTypes from "../actionTypes/series";
import axios from "axios";

export const getSeriesChannelsRequest = (testline) => ({
  type: actionTypes.GET_SERIES_CHANNELS,
  payload: testline,
});

export const getSeriesChannelsSuccess = (data) => ({
  type: actionTypes.GET_SERIES_CHANNELS_SUCCESS,
  payload: data,
});

export const getSeriesChannelsFailure = (error) => ({
  type: actionTypes.GET_SERIES_CHANNELS_FAILURE,
  payload: error,
});

export const getSeries = (testlineUrl) => {
  return async (dispatch) => {
    try {
      dispatch(getSeriesChannelsRequest(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response.data) {
        await dispatch(getSeriesChannelsSuccess(response.data));
        return response;
      }
    } catch (error) {
      dispatch(getSeriesChannelsFailure(error));
    }
  };
};

export const getSeriesInfoRequest = (testline) => ({
  type: actionTypes.GET_SERIES_INFO,
  payload: testline,
});

export const getSeriesInfoSuccess = (data) => ({
  type: actionTypes.GET_SERIES_INFO_SUCCESS,
  payload: data,
});

export const getSeriesInfoFailure = (error) => ({
  type: actionTypes.GET_SERIES_CHANNELS_FAILURE,
  payload: error,
});

export const getSeriesinfo = (testlineUrl) => {
  return async (dispatch) => {
    try {
      dispatch(getSeriesInfoRequest(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response.data) {
        await dispatch(getSeriesInfoSuccess(response.data));
        return response;
      }
    } catch (error) {
      dispatch(getSeriesInfoFailure(error));
    }
  };
};


export const addSeriesFavourites = (favourites) => ({
  type: actionTypes.SET_SERIES_FAVOURITES,
  favouriteSeries: favourites
});

export const setSeriesTvFavourites = (favourites) => {
  return async dispatch => {
      dispatch(addSeriesFavourites(favourites));
  };
};

export const removeSeriesFavourites = (unFavourite) => ({
  type: actionTypes.REMOVE_SERIES_FAVOURITES,
  unFavouriteSeries: unFavourite
});

export const setSeriesUnFavourites = (unFavourite) => {
  return async dispatch => {
      dispatch(removeSeriesFavourites(unFavourite));
  };
};


export const addRecentlyPlayed = (playedSeries) => ({
  type: actionTypes.ADD_RECENT_PLAYED,
  playedSeries: playedSeries,
});

export const setSeriesPlayed = (series) => {
  return async (dispatch) => {
    dispatch(addRecentlyPlayed(series));
  };
};
