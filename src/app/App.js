import React, { Component } from 'react';
import Navigation from './components/Navigation';
import DictionariesList from './components/DictionariesList';
import DictionaryCreator from './components/DictionaryCreator';
import DictionaryView from './components/DictionaryView';
import About from './components/About';
import '../css/style.css';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={About}></Route>
          <Route path="/dictionaries" component={DictionariesList}></Route>
          <Route path="/dictionary/:id" component={DictionaryView}></Route>
          <Route path="/addDictionary" component={DictionaryCreator}></Route>
        </Switch>
      </div>
    );
  }
}
export default App;
