import { SUCCESS, FAILURE, REQUEST } from '../utils/create-action-type';
import { ACTION_TYPES } from '../actions/auth-action';

const initialState = {
  showModalLogin: true,
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, //From server
  account: {},
  errorMessage: null, //From server
};

// Reducer
export const authReducer = (state = initialState, action) => {
  console.log('AUTH REDUCER:', action.type);
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_SESSION): {
      return {
        loading: true,
        showModalLogin: true,
      };
    }
    case REQUEST(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        showModalLogin: true,
      };
    case REQUEST(ACTION_TYPES.LOGOUT):
      return {
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...initialState,
        loginError: true,
        errorMessage: action.response,
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        loginError: true,
        errorMessage: action.response,
      };
    case SUCCESS(ACTION_TYPES.GET_SESSION):
      const isAuthenticated =
        action.response &&
        action.response.data &&
        action.response.data.authUser;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        account: isAuthenticated && action.response.data.authUser,
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
        showModalLogin: false,
      };
    case SUCCESS(ACTION_TYPES.LOGOUT):
      return {
        ...initialState,
        showModalLogin: true,
      };
    default:
      return state;
  }
};
