import * as actionTypes from "../actionTypes/dashboard";
import axios from "axios";

export const getLiveCategories = (testline) => ({
  type: actionTypes.GET_LIVE_CATEGORIES,
  payload: testline,
});

export const getLiveCategoriesSuccess = (data) => ({
  type: actionTypes.GET_LIVE_CATEGORIES_SUCCESS,
  payload: data,
});

export const getLiveCategoriesFailure = (error) => ({
  type: actionTypes.GET_LIVE_CATEGORIES_FAILURE,
  payload: error,
});

export const getLiveTvCategories = (testlineUrl) => {
  return async (dispatch) => {
    try {
      dispatch(getLiveCategories(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response.data) {
        await dispatch(getLiveCategoriesSuccess(response.data));
        return response;
      }
    } catch (error) {
      dispatch(getLiveCategoriesFailure(error));
    }
  };
};

export const getMoviesCategoriesrRequest = (testline) => ({
  type: actionTypes.GET_MOVIES_CATEGORIES,
  payload: testline,
});

export const getMoviesCategoriesSuccess = (data) => ({
  type: actionTypes.GET_MOVIES_CATEGORIES_SUCCESS,
  payload: data,
});

export const getMoviesCategoriesFailure = (error) => ({
  type: actionTypes.GET_MOVIES_CATEGORIES_FAILURE,
  payload: error,
});

export const getMoviesCategories = (testlineUrl) => {
  return async (dispatch) => {
    try {
      dispatch(getMoviesCategoriesrRequest(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response.data) {
        await dispatch(getMoviesCategoriesSuccess(response.data));
        return response;
      }
    } catch (error) {
      dispatch(getMoviesCategoriesFailure(error));
    }
  };
};

export const getSeriesCategoriesrRequest = (testline) => ({
  type: actionTypes.GET_SERIES_CATEGORIES,
  payload: testline,
});

export const getSeriesCategoriesSuccess = (data) => ({
  type: actionTypes.GET_SERIES_CATEGORIES_SUCCESS,
  payload: data,
});

export const getSeriesCategoriesFailure = (error) => ({
  type: actionTypes.GET_SERIES_CATEGORIES_FAILURE,
  payload: error,
});

export const getSeriesCategories = (testlineUrl) => {
  return async (dispatch) => {
    try {
      dispatch(getSeriesCategoriesrRequest(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response.data) {
        await dispatch(getSeriesCategoriesSuccess(response.data));
        return response;
      }
    } catch (error) {
      dispatch(getSeriesCategoriesFailure(error));
    }
  };
};

export const logoutRequest = () => ({
  type: actionTypes.LOG_OUT,
});

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutRequest());
  };
};

// ===Parental lock ======
export const parentalPasswordRequest = (password) => ({
  type: actionTypes.ADD_PARENTAL_LOCK,
  password:password
});

export const addLock = (password) => {
  return async (dispatch) => {
    dispatch(parentalPasswordRequest(password));
  };
};

// ===== EPG ======
export const addEpgShiftRequest = (epgShiftValue) => ({
  type: actionTypes.EPG_TIME_SHIFT,
  epgShiftValue:epgShiftValue
});

export const addEpgShift = (epgShiftValue) => {
  return async (dispatch) => {
    dispatch(addEpgShiftRequest(epgShiftValue));
  };
};



