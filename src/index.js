import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { Header } from './app';
import TodoApp, { TodoReducers } from './todos';
import RedditApp, { RedditReducers } from './reddit';

const loggerMiddleware = createLogger();

let store = createStore(combineReducers({
  ...TodoReducers,
  ...RedditReducers
}),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
