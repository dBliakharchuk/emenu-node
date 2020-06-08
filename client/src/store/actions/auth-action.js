import { REQUEST } from '../utils/create-action-type';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  LOGOUT: 'authentication/LOGOUT',
  GET_SESSION: 'authentication/GET_SESSION',
};

// Actions
export const getSession = () => async (dispatch) => {
  console.log('getSession REQUEST!!!!!!!!');
  await dispatch({
    type: REQUEST(ACTION_TYPES.GET_SESSION),
  });
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({
    type: REQUEST(ACTION_TYPES.LOGIN),
    email,
    password,
  });

  dispatch(getSession());
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: REQUEST(ACTION_TYPES.LOGOUT),
  });
};
