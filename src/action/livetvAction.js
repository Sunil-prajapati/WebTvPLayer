import * as actionTypes from "../actionTypes/liveTv";
import axios from "axios";

export const getLiveChannels = (testline) => ({
  type: actionTypes.GET_LIVE_CHANNELS,
  payload: testline,
});

export const getLiveChannelsSuccess = (data) => ({
  type: actionTypes.GET_LIVE_CHANNELS_SUCCESS,
  payload: data,
});

export const getLiveChannelsFailure = (error) => ({
  type: actionTypes.GET_LIVE_CHANNELS_FAILURE,
  payload: error,
});

export const getLiveTvChannels = (testlineUrl) => {
  return async (dispatch) => {
    try {
      dispatch(getLiveChannels(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response.data) {
        await dispatch(getLiveChannelsSuccess(response.data));
        return response;
      }
    } catch (error) {
      dispatch(getLiveChannelsFailure(error));
    }
  };
};

export const getLiveEpg = (testline) => ({
  type: actionTypes.GET_LIVE_EPG,
  payload: testline,
});

export const getLiveEpgSuccess = (data) => ({
  type: actionTypes.GET_LIVE_EPG_SUCCESS,
  payload: data,
});

export const getLiveEpgFailure = (error) => ({
  type: actionTypes.GET_LIVE_EPG_FAILURE,
  payload: error,
});

export const getLiveEpgRequest = (testlineUrl) => {
  return async (dispatch) => {
    try {
      dispatch(getLiveEpg(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response.data) {
        await dispatch(getLiveEpgSuccess(response.data));
        return response;
      }
    } catch (error) {
      dispatch(getLiveEpgFailure(error));
      console.log(error);
    }
  };
};

export const addLiveFavourites = (favouritesChannels) => ({
  type: actionTypes.SET_LIVE_FAVOURITES,
  favouriteChannelsList: favouritesChannels,
});

export const setLiveTvFavourites = (favouritesChannels) => {
  return async (dispatch) => {
    dispatch(addLiveFavourites(favouritesChannels));
  };
};

export const removeLiveFavourites = (unFavouritesChannel) => ({
  type: actionTypes.REMOVE_LIVE_FAVOURITES,
  unFavouriteChannel: unFavouritesChannel,
});

export const setLiveTvUnFavourites = (unFavouritesChannel) => {
  return async (dispatch) => {
    dispatch(removeLiveFavourites(unFavouritesChannel));
  };
};

export const lockCategoryRequest = (category) => ({
  type: actionTypes.ADD_LOCK_CATEGORY,
  categories: category,
});

export const lockCategory = (category) => {
  return async (dispatch) => {
    dispatch(lockCategoryRequest(category));
  };
};

export const addRecentlyPlayed = (playedChannel) => ({
  type: actionTypes.ADD_RECENT_PLAYED,
  playedChannel: playedChannel,
});

export const setLiveTvPlayed = (channel) => {
  return async (dispatch) => {
    dispatch(addRecentlyPlayed(channel));
  };
};
