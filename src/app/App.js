import React, { Component } from 'react';
import { Button } from 'reactstrap';

import {dictionaryService} from '../services/dictionaryService.js';
import Navigation from './components/Navigation';
import DictionariesList from './components/DictionariesList';
import DictionaryCreator from './components/DictionaryCreator';
import '../css/style.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isCreateMode: false,
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
  //   })
  // }
  toggleView = () => {
    this.setState({
      isCreateMode: !this.state.isCreateMode
    })
  }
  addDictionary = (dictionary) => {
    let dictionaries = [...this.state.dictionaries, dictionary];
    this.setState({
      dictionaries: dictionaries
    })
  }

  render() {
    return (
      <div className="wrapper">
      <br />
      <Button color="info" onClick={this.toggleView}>{this.state.isCreateMode ? 'End' : 'Add new'}</Button>

      { this.state.isCreateMode
        ? <DictionaryCreator addDictionary={this.addDictionary} />
        : <DictionariesList dictionaries={this.state.dictionaries} />
      }
      </div>
    );
  }
}
 export default App;
