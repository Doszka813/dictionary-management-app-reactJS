import React, { Component } from 'react';

import DictionariesList from './components/DictionariesList';
import DictionaryCreator from './components/DictionaryCreator';
import Welcome from './components/Welcome';
import Header from './components/Header';

import '../css/style.css';

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
      </div>
    );
  }
}
 export default App;
