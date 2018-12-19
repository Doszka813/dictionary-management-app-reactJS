import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import {dictionaryService} from '../../services/dictionaryService.js';
import Pair from './Pair';

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
        id: undefined,
        domain: '',
        range: '',
        errors: []
      },
      isNameAdded: false,
    }

    this.updateName = this.updateName.bind(this);
    this.toggleFlag = this.toggleFlag.bind(this);
    this.updateDomain = this.updateDomain.bind(this);
    this.updateRange = this.updateRange.bind(this);
    this.addPair = this.addPair.bind(this);
    this.submit = this.submit.bind(this);
  };

  updateName(e) {
    let dictionary = {...this.state.newDictionary};
    dictionary.name = e.target.value;
    this.setState({
      newDictionary: dictionary});
  };

  updateDomain(e) {
    let pair = {...this.state.pair};
    pair.domain = e.target.value;
    this.setState({
      pair: pair});
  };

  updateRange(e) {
    let pair = {...this.state.pair};
    pair.range = e.target.value;
    this.setState({
      pair: pair});
  };

  toggleFlag() {
    this.setState({
      isNameAdded: !this.state.isNameAdded
    })
  };

  addPair() {
    let dictionary = {...this.state.newDictionary};
    let newPair = this.state.pair;
    dictionary.pairs.push(newPair);
    this.setState({
      newDictionary: dictionary,
    });
  };

  submit = () => {
    let dictionary = {...this.state.newDictionary};
    this.props.addDictionary(dictionary);
    this.props.toggleView();
  };

  render() {
    let form;
    let preview;
    if(!this.state.isNameAdded){
      form =
        <Form ref="form">
          <FormGroup>
            <Label htmlFor="name">Dictionary Name</Label>
            <Input type="text" value={this.state.newDictionary.name} onChange={this.updateName} name="name" id="name" />
          </FormGroup>
          <br />
          <Button color="primary" onClick={this.toggleFlag}>Create</Button>
        </Form>
    } else {
      form =
        <Form ref="form">
          <FormGroup>
            <Label htmlFor="domain">Domain</Label>
            <Input type="text" value={this.state.pair.domain} onChange={this.updateDomain} name="domain" id="domain" />
          </FormGroup>
          <br />
          <FormGroup>
            <Label htmlFor="range">Range</Label>
            <Input type="text" value={this.state.pair.range} onChange={this.updateRange} name="range" id="range" />
          </FormGroup>
          <Button color="primary" onClick={this.addPair}>Add</Button>
          <br />
          <br />
          <Button color="primary" onClick={this.submit}>Submit</Button>
          <Button color="warning" onClick={this.toggleFlag}>Back</Button>
        </Form>
    }

    if(this.state.newDictionary.pairs.length > 0 ) {
      preview =
        <div className="preview">
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Domain</th>
              <th>Range</th>
            </tr>
          </thead>
          <tbody>
            {this.state.newDictionary.pairs.map((pair, index) => {
            return <Pair key = {index} pair={pair}/>
            })}
          </tbody>
        </Table>
    </div>
    }

    return (
      <div className="container">
        <h3>{this.state.newDictionary.name}</h3>
        {form}
        {preview}
      </div>
    );
  }
}

export default DictionaryCreator;
