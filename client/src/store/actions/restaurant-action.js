import { REQUEST } from '../utils/create-action-type';

export const ACTION_TYPES = {
  GET_RESTAURANTS: 'restaurants/GET_RESTAURANTS',
  GET_RESTAURANT: 'restaurant/GET_RESTAURANT',
  CREATE_RESTAURANT: 'restaurant/CREATE_RESTAURANT',
  UPDATE_RESTAURANT: 'restaurant/UPDATE_RESTAURANT',
  DELETE_RESTAURANT: 'restaurant/DELETE_RESTAURANT',
};

// Actions
export const getRestaurants = () => async (dispatch) => {
  dispatch({
    type: REQUEST(ACTION_TYPES.GET_RESTAURANTS),
  });
};
