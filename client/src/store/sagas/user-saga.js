import { put, call } from 'redux-saga/effects';

import { ACTION_TYPES } from '../actions/user-action';
import { SUCCESS, FAILURE } from '../utils/create-action-type';

import {
  getUsersService,
  getUserService,
  createUserService,
} from '../services/user-service';

export function* getUsers() {
  try {
    const response = yield getUsersService();
    console.log('SAGA getUsers: ', response);
    yield put({ type: SUCCESS(ACTION_TYPES.GET_USERS), response });
  } catch (error) {
    yield put({ type: FAILURE(ACTION_TYPES.GET_USERS), error });
  }
}

export function* getUser(payload) {
  try {
    const response = yield call(getUserService, payload);
    console.log('SAGA GETUSER: ', response);
    yield put({ type: SUCCESS(ACTION_TYPES.GET_USER), response });
  } catch (error) {
    yield put({ type: FAILURE(ACTION_TYPES.GET_USER), error });
  }
}

export function* createUser(payload) {
  try {
    const response = yield call(createUserService, payload);
    yield put({ type: SUCCESS(ACTION_TYPES.CREATE_USER), response });
  } catch (error) {
    yield put({ type: FAILURE(ACTION_TYPES.CREATE_USER), error });
  }
}
