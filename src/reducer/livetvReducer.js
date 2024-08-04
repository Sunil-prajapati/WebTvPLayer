import * as actionTypes from "../actionTypes/liveTv";

const initialState = {
  livetvChannels: null,
  liveChannelsEpg: null,
  liveRecentPlayed: [],
  liveFavouriteChannels: [],
  lockedCategories: [],
  loading: false,
  error: null,
};
const livetvReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIVE_CHANNELS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_LIVE_CHANNELS_SUCCESS:
      return {
        ...state,
        livetvChannels: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_LIVE_CHANNELS_FAILURE:
      return {
        ...state,
        livetvChannels: null,
        loading: false,
        error: action.payload,
      };

    case actionTypes.GET_LIVE_EPG:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_LIVE_EPG_SUCCESS:
      return {
        ...state,
        liveChannelsEpg: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_LIVE_EPG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SET_LIVE_FAVOURITES:
      return {
        ...state,
        liveFavouriteChannels: [
          ...state.liveFavouriteChannels,
          action.favouriteChannelsList,
        ],
      };

    case actionTypes.REMOVE_LIVE_FAVOURITES:
      return {
        ...state,
        liveFavouriteChannels: action.unFavouriteChannel,
      };
    case actionTypes.ADD_LOCK_CATEGORY:
      return {
        ...state,
        lockedCategories: [...state.lockedCategories, action.categories],
      };

    case actionTypes.ADD_RECENT_PLAYED:
      return {
        ...state,
        liveRecentPlayed: [...state.liveRecentPlayed, action.playedChannel],
      };

    default:
      return state;
  }
};

export default livetvReducer;
