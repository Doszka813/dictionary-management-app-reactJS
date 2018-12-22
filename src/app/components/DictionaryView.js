import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, NavItem, NavLink, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../css/style.css';
import { FaTrashAlt, FaEdit, FaSave, FaCheck } from 'react-icons/fa';

class DictionaryView extends Component {
  constructor(){
    super();
    this.state = {
      dictionary: null,
      addNewPair: false,
      editName: false,
      editPairs: false,
      pair: {
        domain: '',
        range: '',
        errors: [],
      },
    }
    this.updateName = this.updateName.bind(this);
    this.updateDomain = this.updateDomain.bind(this);
    this.updateRange = this.updateRange.bind(this);
    this.toggleEditName = this.toggleEditName.bind(this);
    this.toggleEditPairs = this.toggleEditPairs.bind(this);
    this.removeDictionary = this.removeDictionary.bind(this);

  };

  componentWillMount() {
    const ind = this.props.match.params.id;
    let dictionary = this.props.dictionaries[ind];
    this.setState({
      dictionary: dictionary
    })
  };

  removeDictionary() {
    const ind = this.props.match.params.id;
    this.props.removeDictionary(ind);
    this.props.history.push("/dictionaries")
  }

  updateName(e) {
    let dictionary = {...this.state.dictionary};
    dictionary.name = e.target.value;
    this.setState({
      dictionary: dictionary
    });
  };

  updateDomain(e) {
    let dictionary = {...this.state.dictionary};
    dictionary.pair.domain = e.target.value;
    this.setState({
      pair: pair});
  };

  updateRange(e) {
    let pair = {...this.state.pair};
    pair.range = e.target.value;
    this.setState({
      pair: pair});
  };

  toggleEditName() {
    this.setState({
      editName: !this.state.editName
    });
  };

  toggleEditPairs() {
    this.setState({
      editPairs: !this.state.editPairs
    });
  };

  render() {
    let nameForm;
    let domainForm;
    let rangeForm;
    let pairs;
    if(this.state.editName){
      nameForm =
        <Form ref="form">
          <FormGroup>
            <Label htmlFor="name">Dictionary Name</Label>
            <Input type="text" placeholder={this.state.dictionary.name} value={this.state.dictionary.name} onChange={this.updateName} name="name" id="name" />
          </FormGroup>
          <br />
        </Form>
    };

    if(this.state.editPairs){
      domainForm =
        <Form ref="form">
          <FormGroup>
            <Input type="text" value={this.state.pair.domain} onChange={this.updateDomain} name="domain" id="domain" />
          </FormGroup>
        </Form>;

      rangeForm =
        <Form ref="form">
          <FormGroup>
          <Input type="text" value={this.state.pair.range} onChange={this.updateRange} name="range" id="range" />
          </FormGroup>
        </Form>
    };


    return (
      <div className="DictionaryView">
        <h1>{this.state.dictionary.name}
        <Button onClick={this.toggleEditName} color="info">{ this.state.editName ? <FaCheck /> : <FaEdit />}</Button>
        <Button onClick={this.removeDictionary} color="danger"><FaTrashAlt /></Button></h1>

        {nameForm}
        <Table className="editTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Domain</th>
              <th>Range</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.state.dictionary && this.state.dictionary.pairs.map((pair, index) => {
            return (
              <tr key = {index}>
                <td>{index +1}</td>
                <td>{pair.domain} {domainForm}</td>
                <td>{pair.range} {rangeForm}</td>
                <td><FaEdit onClick={this.toggleEditPairs}/></td>
                <td><FaTrashAlt /></td>
              </tr>
            )
          })}
          </tbody>
        </Table>
        <Button onClick={this.toggleEditPairs}><FaEdit /></Button>
        <Button><FaSave /></Button>
      </div>
    )
  }
}

export default DictionaryView;
