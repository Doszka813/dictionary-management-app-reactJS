import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';

import {dictionaryService} from '../../services/dictionaryService.js';
import { withRouter } from "react-router-dom";

class DictionaryCreator extends Component {
  constructor(){
    super();
    this.state = {
      dictionaryService: dictionaryService,
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
    let pair = {...this.pair};
    pair.domain = '';
    pair.range = '';
    this.setState({
      newDictionary: dictionary,
      pair: pair
    });
  };

  submit = () => {
    let dictionary = {...this.state.newDictionary};
    this.props.saveDictionary(dictionary);
    this.props.history.push("/dictionaries")
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
              return (
                <tr key = {index}>
                  <td>{index +1}</td>
                  <td>{pair.domain}</td>
                  <td>{pair.range}</td>
                </tr>
              )
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

export default withRouter(DictionaryCreator);
