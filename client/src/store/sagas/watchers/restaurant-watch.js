import { getRestaurants } from '../restaurant-saga';
import { takeLatest } from 'redux-saga/effects';

import { ACTION_TYPES } from '../../actions/restaurant-action';
import { REQUEST } from '../../utils/create-action-type';

export default function* watchRestaurants() {
  yield takeLatest(REQUEST(ACTION_TYPES.GET_RESTAURANTS), getRestaurants);
}
