import { combineReducers } from "redux";
import dashboardReducer from "./dashboardReducer";
import loginReducer from "./loginReducer";
import livetvReducer from "./livetvReducer";
import MoviesReducer from "./moviesReducer";
import SeriesReducer from "./seriesReducer";


const appReducer = combineReducers({
  loginReducer: loginReducer,
  dashboardReducer: dashboardReducer,
  livetvReducer: livetvReducer,
  movieReducer: MoviesReducer,
  seriesReducer:SeriesReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOG_OUT" || action.type === "RESET_REDUX_DATA") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
