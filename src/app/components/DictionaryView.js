import React, { Component } from 'react';
import { dictionaryValidationService } from '../../services/dictionaryValidationService';
import '../../css/style.css';

import { Link } from "react-router-dom";
import { Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaTrashAlt, FaEdit, FaSave, FaCheck, FaPlus, FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';
import { connect } from 'react-redux';

class DictionaryView extends Component {
  constructor(props) {
    super();
    const dictionary = props.dictionary;
    this.validator = dictionaryValidationService;
    this.state = {
      dictionary: {
        id: dictionary.id,
        name: dictionary.name,
        pairs: [...dictionary.pairs]
      },
      addNewPair: false,
      editName: false,
      editPairsMode: false,
      pair: {
        domain: '',
        range: '',
        errors: []
      }
    }
  };

  removeDictionary = () => {
    const id = this.state.dictionary.id;
    this.props.dispatch({
      type: 'DELETE_DICTIONARY',
      id
    });
    this.props.history.push("/dictionaries")
  };

  updateDictionary = () => {
    let dictionary = { ...this.state.dictionary };
    this.props.dispatch({
      type: 'UPDATE_DICTIONARY',
      dictionary
    });
  };

  removePair = (index) => {
    console.log('idx'+index);
    let dictionary = { ...this.state.dictionary };
    dictionary.pairs.splice(index, 1);
    this.setState({
      dictionary: dictionary
    });
    this.updateDictionary();
    if (dictionary.pairs.length < 1) {
      this.removeDictionary();
    };
    this.validate();
  };

  newDomain = (e) => {
    let pair = { ...this.state.pair };
    pair.domain = e.target.value;
    this.setState({
      pair: pair
    });
  };

  newRange = (e) => {
    let pair = { ...this.state.pair };
    pair.range = e.target.value;
    this.setState({
      pair: pair
    });
  };

  addPair = () => {
    let dictionary = { ...this.state.dictionary };
    let newPair = { ...this.state.pair };
    dictionary.pairs.push(newPair);
    let pair = {...this.pair};
    pair.domain = '';
    pair.range = '';
    this.setState({
      dictionary: dictionary,
      pair: {
        domain: '',
        range: '',
      }
    });
    this.validate();
  };

  updateName = (e) => {
    let dictionary = { ...this.state.dictionary };
    dictionary.name = e.target.value;
    this.setState({
      dictionary: dictionary
    });
  };

  updateDomain = (index, e) => {
    let dictionary = { ...this.state.dictionary };
    dictionary.pairs[index].domain = e.target.value;
    this.setState({
      dictionary: dictionary
    });
    this.validate();
  };

  updateRange = (index, e) => {
    let dictionary = { ...this.state.dictionary };
    dictionary.pairs[index].range = e.target.value;
    this.setState({
      dictionary: dictionary
    });
    this.validate();
  };

  toggleEditName = () => {
    this.setState({
      editName: !this.state.editName
    });
  };

  toggleAddNewPair = () => {
    this.setState({
      addNewPair: !this.state.addNewPair,
      pair: {
        domain: '',
        range: '',
      }
    });
  };

  toggleEditPairs = () => {
    this.setState({
      editPairsMode: !this.state.editPairsMode
    });
  };

  validate = () => {
    let dictionary = { ...this.state.dictionary };
    dictionary.pairs.forEach(pair => pair.errors = []);
    const addError = (pairIndex, errorType) => dictionary.pairs[pairIndex].errors.push(errorType);
    this.validator.findDuplicates(dictionary.pairs)
        .forEach(errorPairIndex => addError(errorPairIndex, "DUPLICATE"));
    this.validator.findForks(dictionary.pairs)
        .forEach(errorPairIndex => addError(errorPairIndex, "FORK"));
    this.validator.findChains(dictionary.pairs)
        .forEach(errorPairIndex => addError(errorPairIndex, "CHAIN"));
    this.validator.findCycles(dictionary.pairs)
        .forEach(errorPairIndex => addError(errorPairIndex, "CYCLE"));
    this.setState({
      dictionary: dictionary
    });
  };

  render() {
    let nameForm;
    let addPairForm;

    if (this.state.editName) {
      nameForm =
        <Form ref="form">
          <FormGroup>
            <Label htmlFor="name">Dictionary Name</Label>
            <Input type="text" placeholder={this.state.dictionary.name} value={this.state.dictionary.name} onChange={this.updateName} name="name" id="name" />
          </FormGroup>
          <br />
        </Form>
    };

    if(this.state.addNewPair) {
      addPairForm =
        <Form ref="form">
          <FormGroup>
            <Label htmlFor="domain">Domain</Label>
            <Input type="text" value={this.state.pair.domain} onChange={this.newDomain} name="domain" id="domain" />
          </FormGroup>
          <br />
          <FormGroup>
            <Label htmlFor="range">Range</Label>
            <Input type="text" value={this.state.pair.range} onChange={this.newRange} name="range" id="range" />
          </FormGroup>
          <Button id="btn" color="primary" onClick={this.toggleAddNewPair}><FaCheck /> Done</Button>
          <Button id="btn" color="primary" onClick={this.addPair}><FaPlus /> Add</Button>
          <br />
          <br />
        </Form>
    };

    return (
      <div className="dictionaryView">
        <h1>{this.state.dictionary.name}</h1>
        {nameForm}
        <br />
        <Button id="btn" onClick={this.toggleEditName} color="info">{ this.state.editName ? <FaCheck /> : <FaEdit />}</Button>
        <Button id="btn" onClick={this.removeDictionary} color="danger"><FaTrashAlt /></Button>
        <br />
        <Button id="btn" onClick={this.validate} color="primary" >Validate</Button>

        <Table className="Table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Domain</th>
              <th>Range</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.dictionary.pairs.map((pair, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pair.domain} {this.state.editPairsMode
                    ? <Input type="text" onChange={this.updateDomain.bind(this, index)}
                      value={pair.domain} name="domain" id="domain" />
                    : null}
                  </td>
                  <td>{pair.range} {this.state.editPairsMode
                    ? <Input type="text" onChange={this.updateRange.bind(this, index)}
                      value={pair.range} name="range" id="range" />
                    : null}
                  </td>
                  <td>
                    {pair.errors && pair.errors.indexOf('DUPLICATE') !== -1 ? <span title="duplicate"><FaExclamationCircle color="#f5ca47"/></span> : null}
                    {pair.errors && pair.errors.indexOf('FORK') !== -1 ? <span title="fork"><FaExclamationCircle color="#f2800d"/></span> : null}
                    {pair.errors && pair.errors.indexOf('CHAIN') !== -1 ? <span title="chain"><FaExclamationCircle color="red"/></span> : null}
                    {pair.errors && pair.errors.indexOf('CYCLE') !== -1 ? <span title="cycle"><FaExclamationCircle color="#800000"/></span> : null}
                  </td>
                  <td><FaEdit onClick={this.toggleEditPairs} /></td>
                  <td><FaTrashAlt onClick={this.removePair.bind(this, index)} /></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {addPairForm}
        <Button id="btn" color="success" onClick={this.toggleAddNewPair}><FaPlus /> Add row</Button>
        <Button id="btn" color="primary" onClick={this.updateDictionary}><FaSave /> Save</Button>
        <Link to="/dictionaries/"><Button id="btn" color="warning" onClick={this.toggleFlag}><FaArrowLeft /> Back </Button></Link>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const dictId = ownProps.match.params.id;
  const dict = state.find(dict => dict.id === +dictId);
  console.log('dict view: ' + dictId);
  return {
    dictionary: dict
  }
}

export default connect(mapStateToProps)(DictionaryView);
