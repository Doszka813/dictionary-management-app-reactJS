import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {dictionaryService} from '../../services/dictionaryService.js';
import { Button } from 'reactstrap';

class DictionaryCreator extends Component {
  constructor(){
    super();
    this.state = {
      newDictionary: {
        id: undefined,
        name: '',
        pairs: [
          {
            domain: '',
            range: '',
            errors: []
          }
        ]
      },
      isNameAdded: false,
    };

    this.updateState = this.updateState.bind(this);
  };

  updateState(e) {
    this.setState({
      newDictionary: e.target.value
    });
  };

  //Functions
  clearInput() {
    this.setState({
      newDictionary: ''
    });
    ReactDOM.findDOMNode(this.refs.form).focus();
  };

  submitName() {
    this.setState({
      isNameAdded: !isNameAdded
    });
  };

  addPair() {
    this.$validator.validateAll().then((result) => {
      if(result) {
        this.dictionary.pairs.push(this.pair);
        this.pair = {
          errors: []
        };
      } else {}
    });
  };

  submit() {
    this.dictionaryService.add(JSON.stringify(this.state.newDictionary));
  };

  render() {
    let form;
      if(!this.state.isNameAdded){
        form =
          <form ref="form">
            <input type="text" value={this.state.newDictionary.name} onChange={this.updateState} label="Name" name="name"></input>
            <br />
            <Button color="primary" onClick={this.submitName}>Create</Button>
            <Button color="error" onClick={this.clearInput}>Clear</Button>
            <Link to="/"><Button color="warning">Back</Button></Link>
          </form>
      }else {
        form=<p>lalal</p>
      }


    return (
      <div className="container">
        <h3>{this.state.newDictionary.name}</h3>
        {form}
      </div>
    );
  }
}

export default DictionaryCreator;
