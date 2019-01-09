import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';

import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';


class DictionaryCreator extends Component {
  constructor() {
    super();
    this.state = {
      dictionary: {
        id: new Date().getTime(),
        name: '',
        pairs: []
      },
      pair: {
        domain: '',
        range: ''
      },
      isNameAdded: false
    }
  };

  updateName = (e) => {
    const dictionary = this.state.dictionary;
    dictionary.name = e.target.value;

    this.setState({ dictionary });
  }

  updateDomain = (e) => {
    const pair = this.state.pair;
    pair.domain = e.target.value;

    this.setState({ pair });
  }

  updateRange = (e) => {
    const pair = this.state.pair;
    pair.range = e.target.value;

    this.setState({ pair });
  }

  toggleFlag = () => {
    this.setState({ isNameAdded: !this.state.isNameAdded })
  }

  addPair = () => {
    const dictionary = { ...this.state.dictionary };
    dictionary.pairs.push(this.state.pair);

    this.setState({
      dictionary,
      pair: {
        domain: '',
        range: ''
      }
    });
  }

  submit = (e) => {
    e.preventDefault();
    const dictionary = { ...this.state.dictionary };
    this.props.dispatch({
      type: 'ADD_DICTIONARY',
      dictionary
    })
    this.props.history.push('/dictionaries');
  }

  render() {
    let form;
    let preview;
    if (!this.state.isNameAdded) {
      form =
        <Form ref="form">
          <FormGroup>
            <Label htmlFor="name">Dictionary Name</Label>
            <Input type="text" value={this.state.dictionary.name} onChange={this.updateName} name="name" id="name" />
          </FormGroup>
          <br />
          <Button id="btn" color="primary" onClick={this.toggleFlag}>Create</Button>
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
          <Button id="btn" color="primary" onClick={this.addPair}><FaPlus /> Add</Button>
          <br />
          <br />
          <Button id="btn" color="primary" onClick={this.submit}>Submit</Button>
          <Button id="btn" color="warning" onClick={this.toggleFlag}><FaArrowLeft /> Back</Button>
        </Form>
    }

    if (this.state.dictionary.pairs.length > 0) {
      preview =
        <Dictionary {...this.state.dictionary} />
    }

    return (
      <div className="container">
        <h3>{this.state.dictionary.name}</h3>
        {form}
        {preview}
      </div>
    );
  }
}

const Dictionary = (dictionary) => {
  return (
    <div className="dictionary">
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Domain</th>
            <th>Range</th>
          </tr>
        </thead>
        <tbody>
          {dictionary && dictionary.pairs.map((pair, index) => {
            return (
              <Pair {...pair} key={index}/>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const Pair = (pair) => {
  return (
    <tr>
      <td>{}</td>
      <td>{pair.domain}</td>
      <td>{pair.range}</td>
    </tr>
  )
}

export default withRouter(connect()(DictionaryCreator));
