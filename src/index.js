import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';

import DictionariesList from './app/components/DictionariesList';
import DictionaryCreator from './app/components/DictionaryCreator';
import About from './app/components/About';
import Navigation from './app/components/Navigation';

ReactDOM.render(
  <BrowserRouter>
    <div className="app">
      <Navigation />
      <Route path="/about" component={About}></Route>
      <Route exact path="/dictionaries" component={App}></Route>
      <Route path="/addDictionary" component={DictionaryCreator}></Route>
    </div>
  </BrowserRouter>,
document.getElementById('app')
);
