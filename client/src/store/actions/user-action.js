import { REQUEST } from '../utils/create-action-type';

export const ACTION_TYPES = {
  GET_USERS: 'userManagement/GET_USERS',
  GET_USER: 'userManagement/GET_USER',
  CREATE_USER: 'userManagement/CREATE_USER',
  UPDATE_USER: 'userManagement/UPDATE_USER',
  DELETE_USER: 'userManagement/DELETE_USER',
};

// Actions
export const getUsers = () => async (dispatch) => {
  dispatch({
    type: REQUEST(ACTION_TYPES.GET_USERS),
  });
};

export const getUser = (userId) => async (dispatch) => {
  dispatch({
    type: REQUEST(ACTION_TYPES.GET_USER),
    userId,
  });
};
