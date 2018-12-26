import React, { Component } from 'react';
import { Button } from 'reactstrap';

import {dictionaryService} from '../services/dictionaryService.js';
import Navigation from './components/Navigation';
import DictionariesList from './components/DictionariesList';
import DictionaryCreator from './components/DictionaryCreator';
import DictionaryView from './components/DictionaryView';
import About from './components/About';
import '../css/style.css';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
    this.state = {
      dictionaryService: dictionaryService,
      dictionaries: []
    }
  };

  componentDidMount() {
    let dictionaries = dictionaryService.getAll();
    this.setState({
      dictionaries: dictionaries
    });
  };

  saveDictionary = (dictionary) => {
    dictionaryService.add(JSON.stringify(dictionary));
  };

  updateDictionary = (dictionary) => {
    dictionaryService.update(JSON.stringify(this.dictionary));
  }

  removeDictionary = (id) => {
    dictionaryService.removeById(id);
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={About}></Route>
          <Route path="/dictionaries" render={ props => <DictionariesList dictionaries={this.state.dictionaries} />}></Route>
          <Route path="/dictionary/:id" render={ props => <DictionaryView {...props} dictionaries={this.state.dictionaries} updateDictionary={this.updateDictionary} removeDictionary={this.removeDictionary} />}></Route>
          <Route path="/addDictionary" render={ props => <DictionaryCreator saveDictionary={this.saveDictionary} />}></Route>
        </Switch>
      </div>
    );
  }
}
export default App;
