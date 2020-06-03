import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { rootReducer } from './store/reducers-store';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//Saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './store/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));
sagaMiddleware.run(rootSaga);

const rootEl = document.getElementById('root');

const render = (Component) =>
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <Component />
      </React.StrictMode>
    </Provider>,
    rootEl
  );

render(App);
