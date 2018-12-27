import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import dictionaryReducer from './reducers/dictionaryReducer';

const persistedState = localStorage.getItem('dictionaries') ? JSON.parse(localStorage.getItem('dictionaries')) : [];

const store = createStore(dictionaryReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem('dictionaries', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>, document.getElementById('root')
);
