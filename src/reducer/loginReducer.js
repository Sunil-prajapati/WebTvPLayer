import {VALIDATE_TESTLINE,VALIDATE_TESTLINE_SUCCESS,VALIDATE_TESTLINE_FAILURE, VALIDATE_M3U_TESTLINE, VALIDATE_M3U_TESTLINE_SUCCESS, VALIDATE_M3U_TESTLINE_FAILURE } from "../actionTypes/login";

const initialState = {
  userDetails: null,
  loading:false,
  loginError:null,
  m3uUserDetails:null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_TESTLINE:
      return{
        ...state,
        loading:true,
      }
      case VALIDATE_TESTLINE_SUCCESS:
      return{
        ...state,
        userDetails:action.payload,
        loading:false,
        loginError:null
      }
      case VALIDATE_TESTLINE_FAILURE:
      return{
        ...state,
        userDetails:null,
        loading:false,
        loginError:action.payload

      }
      case VALIDATE_M3U_TESTLINE:
      return{
        ...state,
        loading:true,
      }
      case VALIDATE_M3U_TESTLINE_SUCCESS:
      return{
        ...state,
        m3uUserDetails:action.payload,
        loading:false,
        loginError:null
      }
      case VALIDATE_M3U_TESTLINE_FAILURE:
      return{
        ...state,
        m3uUserDetails:null,
        loading:false,
        loginError:action.payload

      }
    default:
      return state;
  }
};

export default loginReducer
