/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// REDUX
import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { Provider } from 'react-redux';

// UTILS
import { setBookHead, setBookBody } from './Utils/storageBook';

import App from './App';

// CSS
import './assets/vendor/nucleo/css/nucleo.css';
import './assets/vendor/font-awesome/css/font-awesome.min.css';
import './assets/css/argon-design-system-react.css';


// REDUCERS
import headReducer from './Reducers/headReducer';
import bodyReducer from './Reducers/bodyReducer';
import viewReducer from './Reducers/ViewReducer';
import bookBodyReducer from './Reducers/bookBodyReducer';

// LOCAL STORAGE

function logger({ getState }) {
  return next => (action) => {
    const returnValue = next(action);
    setBookBody(getState().body);
    setBookHead(getState().head);
    return returnValue;
  };
}

const allReducers = combineReducers({
  head: headReducer,
  body: bodyReducer,
  view: viewReducer,
  index: bookBodyReducer,
});

//attention à remettre compose(applyMiddleware(logger)) et enlever window.__Redux...:
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancer(applyMiddleware(logger)),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
