import { loginUser, getSession, logoutUser } from '../auth-saga';
import { takeLatest, put, takeEvery } from 'redux-saga/effects';

import { ACTION_TYPES } from '../../actions/auth-action';
import { REQUEST } from '../../utils/create-action-type';

export default function* watchUserAuthentication() {
  yield takeLatest(REQUEST(ACTION_TYPES.LOGIN), loginUser);
  yield takeLatest(REQUEST(ACTION_TYPES.GET_SESSION), getSession);
  yield takeLatest(REQUEST(ACTION_TYPES.LOGOUT), logoutUser);
}
