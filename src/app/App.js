import React, { Component } from 'react';

import {dictionaryService} from '../services/dictionaryService.js';
import Navigation from './components/Navigation';
import DictionariesList from './components/DictionariesList';
import '../css/style.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      dictionaries: [
        {
          name: 'Dict1',
          pairs: [
            {
              id: 0,
              domain: 'aa',
              range: 'sd'
            },
            {
              id: 1,
              domain: 'aa',
              range: 'sd'
            },
            {
              id: 2,
              domain: 'azzza',
              range: 'sd'
            }
          ]
        },
        {
          name: 'Dict2',
          pairs: [
            {
              id: 0,
              domain: 'azxzxza',
              range: 'sdzxzx'
            }
          ]
        },{
          name: 'Dict3',
          pairs: [
            {
              id: 0,
              domain: 'aa',
              range: 'sd'
            },
            {
              id: 1,
              domain: 'aa',
              range: 'sd'
            },
            {
              id: 2,
              domain: 'azzza',
              range: 'sd'
            }
          ]
        },
        {
          name: 'Dict4',
          pairs: [
            {
              id: 0,
              domain: 'aza',
              range: 'sd'
            },
            {
              id: 1,
              domain: 'aa',
              range: 'sdxzcz'
            }
          ]
        },
        {
          name: 'Dict5',
          pairs: [
            {
              id: 0,
              domain: 'aa',
              range: 'sd'
            },
            {
              id: 1,
              domain: 'aa',
              range: 'sd'
            },
            {
              id: 2,
              domain: 'azzza',
              range: 'sd'
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
  render() {
    return (
      <DictionariesList dictionaries={this.state.dictionaries} />
    );
  }
}
 export default App;
