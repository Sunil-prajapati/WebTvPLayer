import * as actionTypes from "../actionTypes/login";
import axios from "axios";
import { decodeM3uResponse } from "../constant/helper";

export const validateTestline = (testline) => ({
  type: actionTypes.VALIDATE_TESTLINE,
  payload: testline,
});

export const validateTestlineSuccess = (data) => ({
  type: actionTypes.VALIDATE_TESTLINE_SUCCESS,
  payload: data,
});

export const validateTestlineFailure = (error) => ({
  type: actionTypes.VALIDATE_TESTLINE_FAILURE,
  payload: error,
});

export const checkingTestline = (testlineUrl, loginDetails) => {
  return async (dispatch) => {
    try {
      dispatch(validateTestline(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response.data) {
        const finalResponse = { ...response?.data, loginDetails };
        await dispatch(validateTestlineSuccess(finalResponse));
        return response.data;
      }
    } catch (error) {
      dispatch(validateTestlineFailure(error));
    }
  };
};

// ========== M3U LOGIN URL ==============

export const validateM3uTestline = (testline) => ({
  type: actionTypes.VALIDATE_M3U_TESTLINE,
  payload: testline,
});

export const validateM3uTestlineSuccess = (data) => ({
  type: actionTypes.VALIDATE_M3U_TESTLINE_SUCCESS,
  payload: data,
});

export const validateM3uTestlineFailure = (error) => ({
  type: actionTypes.VALIDATE_M3U_TESTLINE_FAILURE,
  payload: error,
});

export const checkingM3uTestLine = (testlineUrl) => {
  return async (dispatch) => {
    try {
      dispatch(validateM3uTestline(testlineUrl));
      let response = await axios.get(testlineUrl);
      if (response?.data) {
        const finalResponse = decodeM3uResponse(response?.data);
        const liveLinks = [];
        const movieLinks = [];
        const seriesLinks = [];
        finalResponse.forEach((item) => {
          if (item.link.includes("live")) {
            liveLinks.push(item);
          } else if (item.link.includes("movies")) {
            movieLinks.push(item);
          } else if (item.link.includes("movie")) {
            movieLinks.push(item);
          } else if (item.link.includes("series")) {
            seriesLinks.push(item);
          } else {
            liveLinks.push(item);
          }
        });
        const allM3uData = [
          { liveTv: liveLinks },
          { movies: movieLinks },
          { series: seriesLinks },
        ];
        await dispatch(validateM3uTestlineSuccess("m3uLink successfully"));
        return { response, allM3uData };
      }
    } catch (error) {
      dispatch(validateM3uTestlineFailure(error));
    }
  };
};

// ========== M3U LOGIN FILE ==============

export const checkingM3uTestFile = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(validateM3uTestline(payload));
      const finalResponse = decodeM3uResponse(payload);
      const liveLinks = [];
      const movieLinks = [];
      const seriesLinks = [];
      finalResponse.forEach((item) => {
        if (item.link.includes("live")) {
          liveLinks.push(item);
        } else if (item.link.includes("movies")) {
          movieLinks.push(item);
        } else if (item.link.includes("movie")) {
          movieLinks.push(item);
        } else if (item.link.includes("series")) {
          seriesLinks.push(item);
        } else {
          liveLinks.push(item);
        }
      });
      const allM3uData = [
        { liveTv: liveLinks },
        { movies: movieLinks },
        { series: seriesLinks },
      ];
      await dispatch(validateM3uTestlineSuccess("m3uTestFile success"));
      if (liveLinks.length > 0 || movieLinks.length > 0 || seriesLinks > 0) {
        return {
          status: 200,
          data: allM3uData,
        };
      } else {
        return {
          status: 401,
          data: liveLinks.length + movieLinks.length + seriesLinks.length,
        };
      }
    } catch (error) {
      dispatch(validateM3uTestlineFailure(error));
    }
  };
};
