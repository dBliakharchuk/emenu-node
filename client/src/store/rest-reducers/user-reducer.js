import { SUCCESS, FAILURE, REQUEST } from '../utils/create-action-type';
import { ACTION_TYPES } from '../actions/user-action';

const initialState = {
  loading: false,
  errorMessage: null,
  users: [],
  user: {},
  updateSuccess: false,
};

// Reducer
export const userReducer = (state = initialState, action) => {
  console.log('USER REDUCER: ', action.type);
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_USERS):
      return {
        ...state,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.GET_USER):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_USERS):
      return {
        ...state,
        errorMessage: action.response,
      };
    case FAILURE(ACTION_TYPES.GET_USER):
      return {
        ...state,
        errorMessage: action.response,
      };
    case SUCCESS(ACTION_TYPES.GET_USERS):
      return {
        ...state,
        users: action.response.data,
      };
    case SUCCESS(ACTION_TYPES.GET_USER):
      return {
        ...state,
        user: action.response.data,
      };
    case ACTION_TYPES.CREATE_USER:
    case ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        updateSuccess: true,
        user: action.payload.data,
      };
    case ACTION_TYPES.DELETE_USER:
      return {
        ...state,
        updateSuccess: true,
        user: {},
      };
    default:
      return state;
  }
};
