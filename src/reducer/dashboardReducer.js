import * as actionTypes from "../actionTypes/dashboard";

const initialState = {
  allLiveCategories: null,
  allMoviesCategories: null,
  allSeriesCategories: null,
  parentalPassword: null,
  epgShift: null,
  loading: false,
  error: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIVE_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_LIVE_CATEGORIES_SUCCESS:
      return {
        ...state,
        allLiveCategories: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_LIVE_CATEGORIES_FAILURE:
      return {
        ...state,
        allLiveCategories: null,
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_MOVIES_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_MOVIES_CATEGORIES_SUCCESS:
      return {
        ...state,
        allMoviesCategories: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_MOVIES_CATEGORIES_FAILURE:
      return {
        ...state,
        allMoviesCategories: null,
        loading: false,
        error: action.payload,
      };

    case actionTypes.GET_SERIES_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_SERIES_CATEGORIES_SUCCESS:
      return {
        ...state,
        allSeriesCategories: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_SERIES_CATEGORIES_FAILURE:
      return {
        ...state,
        allSeriesCategories: null,
        loading: false,
        error: action.payload,
      };

    case actionTypes.LOG_OUT:
      return {
        state: initialState,
      };
    case actionTypes.ADD_PARENTAL_LOCK:
      return {
        ...state,
        parentalPassword: action.password,
      };
    case actionTypes.EPG_TIME_SHIFT:
      return {
        ...state,
        epgShift: action.epgShiftValue,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
