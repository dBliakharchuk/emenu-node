import { delay, put } from 'redux-saga/effects';

import { ACTION_TYPES } from '../actions/restaurant-action';
import { SUCCESS, FAILURE } from '../utils/create-action-type';

import { getRestaurantsService } from '../services/restaurant-service';

export function* getRestaurants() {
  try {
    const response = yield getRestaurantsService();
    console.log('SAGA getRestaurants: ', response);
    yield put({ type: SUCCESS(ACTION_TYPES.GET_RESTAURANTS), response });
  } catch (error) {
    yield put({ type: FAILURE(ACTION_TYPES.GET_RESTAURANTS), error });
  }
}
