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
      dictionaries: [
        {
                  id: 0,
                  name: 'Dict1',
                  pairs: [
                    {
                      domain: 'aa',
                      range: 'sd',
                      errors: []
                    },
                    {
                      domain: 'aa',
                      range: 'sd',
                      errors: []
                    },
                    {
                      domain: 'azzza',
                      range: 'sd',
                      errors: []
                    }
                  ]
                },
                {
                  id: 1,
                  name: 'Dict2',
                  pairs: [
                    {
                      domain: 'azxzxza',
                      range: 'sdzxzx',
                      errors: []
                    }
                  ]
                },
                {
                  id: 2,
                  name: 'Dict3',
                  pairs: [
                    {
                      domain: 'aa',
                      range: 'sd',
                      errors: []
                    },
                    {
                      domain: 'aa',
                      range: 'sd',
                      errors: []
                    },
                    {
                      domain: 'azzza',
                      range: 'sd',
                      errors: []
                    }
                  ]
                },
                {
                  id: 3,
                  name: 'Dict4',
                  pairs: [
                    {
                      domain: 'aza',
                      range: 'sd',
                      errors: []
                    },
                    {
                      domain: 'aa',
                      range: 'sdxzcz',
                      errors: []
                    }
                  ]
                },
                {
                  id: 4,
                  name: 'Dict5',
                  pairs: [
                    {
                      domain: 'aa',
                      range: 'sd',
                      errors: []
                    },
                    {
                      domain: 'aa',
                      range: 'sd',
                      errors: []
                    },
                    {
                      domain: 'azzza',
                      range: 'sd',
                      errors: []
                    }
                  ]
                },
      ]
    }
  };

  // componentWillMount() {
  //   let dictionaries = dictionaryService.getAll();
  //   this.setState({
  //     dictionaries: dictionaries
  //   });
  //   console.log(this.state.dictionaries)
  // };

  addDictionary = (dictionary) => {
    let dictionaries = [...this.state.dictionaries, dictionary];
    this.setState({
      dictionaries: dictionaries
    })
  }

  // removeDictionary() {
  //   this.service.removeById(this.dictionary.id);
  //   this.$router.push('/dictionaries');
  // }

  removeDictionary = (id) => {
    let dictionaries = [...this.state.dictionaries];
    dictionaries.splice(id, 1);
    this.setState({
      dictionaries: dictionaries
    })
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={About}></Route>
          <Route path="/dictionaries" render={ props => <DictionariesList dictionaries={this.state.dictionaries} />}></Route>
          <Route path="/dictionary/:id" render={ props => <DictionaryView {...props} dictionaries={this.state.dictionaries} removeDictionary={this.removeDictionary} />}></Route>
          <Route path="/addDictionary" render={ props => <DictionaryCreator addDictionary={this.addDictionary} />}></Route>
        </Switch>
      </div>


    );
  }
}
 export default App;
