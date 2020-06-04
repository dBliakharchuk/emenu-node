import { getUser, getUsers, createUser } from '../user-saga';
import { takeLatest } from 'redux-saga/effects';

import { ACTION_TYPES } from '../../actions/user-action';
import { REQUEST } from '../../utils/create-action-type';

export default function* watchUsers() {
  yield takeLatest(REQUEST(ACTION_TYPES.GET_USERS), getUsers);
  yield takeLatest(REQUEST(ACTION_TYPES.GET_USER), getUser);
  yield takeLatest(REQUEST(ACTION_TYPES.CREATE_USER), createUser);
}
