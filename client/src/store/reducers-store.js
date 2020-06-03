import { combineReducers } from 'redux';
// import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import { authReducer } from './rest-reducers/auth-reducer';
import { userReducer } from './rest-reducers/user-reducer';
import { restaurantReducer } from './rest-reducers/restaurant-reducer';

import { authReducerQl } from './graphql-reducer/auth-reducer';

export const rootReducer = combineReducers({
  restAuthReducer: authReducer,
  qlAuthReducer: authReducerQl,
  userReducer,
  restaurantReducer,
});
