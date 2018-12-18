import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {dictionaryService} from '../../services/dictionaryService.js';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class DictionaryCreator extends Component {
  constructor(){
    super();
    this.state = {
      newDictionary: {
        id: undefined,
        name: '',
        pairs: []
      },
      pair: {
        domain: '',
        range: '',
        errors: []
      },
      isNameAdded: true,
    };

    this.updateName = this.updateName.bind(this);
    this.updateDomain = this.updateDomain.bind(this);
    this.updateRange = this.updateRange.bind(this);
  };

  updateName(e) {
    var newDictionary = {...this.state.newDictionary};
    newDictionary.name = e.target.value;
    this.setState({newDictionary});
  };
  updateDomain(e) {
    let pair = {...this.state.pair};
    pair.domain = e.target.value;
    this.setState({pair});
  };
  updateRange(e) {
    let pair = {...this.state.pair};
    pair.range = e.target.value;
    this.setState({pair});
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
    this.dictionary.pairs.push(this.pair);
    this.pair = {
      errors: []
    };
  };

  submit() {
    this.dictionaryService.add(JSON.stringify(this.state.newDictionary));
  };

  render() {
    let form;
      if(!this.state.isNameAdded){
        form =
          <Form ref="form">
            <FormGroup>
              <Label for="name">Dictionary Name</Label>
              <Input type="text" value={this.state.newDictionary.name} onChange={this.updateName} name="name" id="exampleEmail" />
            </FormGroup>
            <br />
            <Button color="primary" onClick={this.submitName}>Create</Button>
            <Button color="error" onClick={this.clearInput}>Clear</Button>
            <Link to="/"><Button color="warning">Back</Button></Link>
          </Form>
      } else {
        form=
          <Form ref="form">
            <FormGroup>
              <Label for="domain">Domain</Label>
              <Input type="text" value={this.state.pair.domain} onChange={this.updateDomain} name="domain" id="domain" />
            </FormGroup>
            <br />
            <FormGroup>
              <Label for="range">Range</Label>
              <Input type="text" value={this.state.pair.range} onChange={this.updateRange} name="range" id="range" />
            </FormGroup>
            <Button color="primary" onClick={this.addPair}>Add</Button>
            <br />
            <br />
            <Button color="primary" onClick={this.submit}>Submit</Button>
            <Button color="warning">Back</Button>
          </Form>
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
