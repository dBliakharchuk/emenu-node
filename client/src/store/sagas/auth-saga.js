import { put, call } from 'redux-saga/effects';

import { ACTION_TYPES } from '../actions/auth-action';
import { SUCCESS, FAILURE } from '../utils/create-action-type';

import {
  loginUserService,
  getSessionService,
  logoutUserService,
} from '../services/auth-service';

export function* loginUser(payload) {
  try {
    const response = yield call(loginUserService, payload);
    console.log('Saga loginUser: ', response);
    yield put({ type: SUCCESS(ACTION_TYPES.LOGIN), response });
  } catch (error) {
    yield put({ type: FAILURE(ACTION_TYPES.LOGIN), error });
  }
}

export function* getSession() {
  //   yield delay(1000);
  try {
    const response = yield getSessionService();
    console.log('Saga getSession: ', response);
    yield put({ type: SUCCESS(ACTION_TYPES.GET_SESSION), response });
  } catch (error) {
    yield put({ type: FAILURE(ACTION_TYPES.GET_SESSION), error });
  }
}

export function* logoutUser() {
  logoutUserService();
  yield put({ type: SUCCESS(ACTION_TYPES.LOGOUT) });
}
