import axios from 'axios';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { logoutUser, loginUser, getAccount } from './queries/auth-queries';
import { graphql } from 'react-apollo';

// import { REQUEST, SUCCESS, FAILURE } from '../action-type';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  LOGOUT: 'authentication/LOGOUT',
  GET_SESSION: 'authentication/GET_SESSION',
};

const AUTH_TOKEN_KEY = 'accessToken';
const SERVER_URL = 'http://localhost:4002/graphql';

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, //From server
  account: {},
  errorMessage: null, //From server
};

// Reducer

export const authReducerQl = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_SESSION: {
      const authUser =
        action.payload &&
        action.payload.data &&
        action.payload.data.data &&
        action.payload.data.data.getAccount;
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        account: authUser && authUser,
      };
    }
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
      };

    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Action
export const getSessionQl = () => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: await axios.post(
      SERVER_URL,
      {
        query: getAccount,
        variables: {
          accessToken: localStorage.getItem(AUTH_TOKEN_KEY),
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
  });
  //const authAccount = getState().account;
  console.log(getState());
};

export const loginUserQl = (email, password) => async (dispatch, getState) => {
  const result = await axios.post(
    SERVER_URL,
    {
      query: loginUser,
      variables: {
        email,
        password,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: result.data.data.loginUser,
  });

  const accessToken = result.data.data.loginUser.accessToken;
  accessToken && localStorage.setItem(AUTH_TOKEN_KEY, accessToken);

  dispatch(getSessionQl());
};

export const logoutUserQl = () => async (dispatch) => {
  clearAuthToken();
  await axios.post(
    SERVER_URL,
    { query: logoutUser },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  });
};

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
