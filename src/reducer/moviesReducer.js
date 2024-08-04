import * as actionTypes from "../actionTypes/movies";

const initialState = {
  moviesChannels: null,
  movieInfo: null,
  allFavouriteMovies: [],
  movieRecentPlayed:[],
  loading: false,
  error: null,
};

const MoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MOVIES_CHANNELS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_MOVIES_CHANNELS_SUCCESS:
      return {
        ...state,
        moviesChannels: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_MOVIES_CHANNELS_FAILURE:
      return {
        ...state,
        moviesChannels: null,
        loading: false,
        error: action.payload,
      };

    case actionTypes.GET_MOVIE_INFO:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_MOVIE_INFO_SUCCESS:
      return {
        ...state,
        movieInfo: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_MOVIE_INFO_FAILURE:
      return {
        ...state,
        movieInfo: null,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SET_MOVIE_FAVOURITES:
      return {
        ...state,
        allFavouriteMovies: [
          ...state.allFavouriteMovies,
          action.favouriteMovies,
        ],
      };

    case actionTypes.REMOVE_MOVIE_FAVOURITES:
      return {
        ...state,
        allFavouriteMovies: action.unFavouriteMovies,
      };
      case actionTypes.ADD_RECENT_PLAYED:
      return {
        ...state,
        movieRecentPlayed: [...state?.movieRecentPlayed, action.playedMovie],
      };
    default:
      return state;
  }
};

export default MoviesReducer;
