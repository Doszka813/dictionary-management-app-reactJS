import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';

import DictionariesList from './app/components/DictionariesList';
import DictionaryCreator from './app/components/DictionaryCreator';
import Dictionary from './app/components/Dictionary';
import About from './app/components/About';
import Navigation from './app/components/Navigation';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
document.getElementById('app')
);
