import * as actionTypes from "../actionTypes/series";

const initialState = {
  seriesChannels: null,
  seriesInfo: null,
  allFavouriteSeries: [],
  seriesRecentPlayed:[],
  loading: false,
  error: null,
};

const SeriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SERIES_CHANNELS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_SERIES_CHANNELS_SUCCESS:
      return {
        ...state,
        seriesChannels: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_SERIES_CHANNELS_FAILURE:
      return {
        ...state,
        seriesChannels: null,
        loading: false,
        error: action.payload,
      };

    case actionTypes.GET_SERIES_INFO:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_SERIES_INFO_SUCCESS:
      return {
        ...state,
        seriesInfo: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_SERIES_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SET_SERIES_FAVOURITES:
      return {
        ...state,
        allFavouriteSeries: [
          ...state.allFavouriteSeries,
          action.favouriteSeries,
        ],
      };
    case actionTypes.REMOVE_SERIES_FAVOURITES:
      return {
        ...state,
        allFavouriteSeries: action.unFavouriteSeries,
      };
      case actionTypes.ADD_RECENT_PLAYED:
      return {
        ...state,
        seriesRecentPlayed: [...state?.seriesRecentPlayed, action?.playedSeries],
      };
    default:
      return state;
  }
};

export default SeriesReducer;
