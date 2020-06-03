import { SUCCESS, FAILURE, REQUEST } from '../utils/create-action-type';
import { ACTION_TYPES } from '../actions/restaurant-action';

const initialState = {
  restaurants: [],
  restaurant: {},
  updating: false,
  errorMessage: null,
  updateSuccess: false,
  loading: false,
};

export const restaurantReducer = (state = initialState, action) => {
  console.log('RESTAURANT REDUCER', action.type);
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_RESTAURANTS):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_RESTAURANTS):
      return {
        ...state,
        errorMessage: action.response,
      };
    case SUCCESS(ACTION_TYPES.GET_RESTAURANTS):
      return {
        ...state,
        restaurants: action.response.data,
      };
    case ACTION_TYPES.CREATE_RESTAURANT:
    case ACTION_TYPES.UPDATE_RESTAURANT:
      return {
        ...state,
        updateSuccess: true,
        restaurant: action.type.data,
      };
    case ACTION_TYPES.DELETE_RESTAURANT:
      return {
        ...state,
        updateSuccess: true,
        restaurant: {},
      };
    default:
      return state;
  }
};
