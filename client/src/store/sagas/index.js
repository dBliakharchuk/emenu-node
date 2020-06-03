import { fork } from 'redux-saga/effects';
import watchUserAuthentication from './watchers/auth-watch';
import watchUsers from './watchers/user-watch';
import watchRestaurants from './watchers/restaurant-watch';

export default function* startForman() {
  yield fork(watchUserAuthentication);
  yield fork(watchUsers);
  yield fork(watchRestaurants);
}
