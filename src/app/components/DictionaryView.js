import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../css/style.css';
import { FaTrashAlt, FaEdit, FaSave, FaCheck, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { connect } from 'react-redux';

class DictionaryView extends Component {
  constructor(props) {
    super();
    const dictionary = props.dictionary;
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
        range: ''
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
  }

  updateDictionary = () => {
    let dictionary = { ...this.state.dictionary };
    this.props.dispatch({
      type: 'UPDATE_DICTIONARY',
      dictionary
    });
  }

  removePair = (index) => {
    let dictionary = { ...this.state.dictionary };
    dictionary.pairs.splice(index, 1);
    this.setState({
      dictionary: dictionary
    });
    this.updateDictionary(this.state.dictionary);
    if (dictionary.pairs.length < 1) {
      this.removeDictionary();
    }
  }

  newDomain = (e) => {
    let pair = { ...this.state.pair };
    pair.domain = e.target.value;
    this.setState({
      pair: pair
    });
  }

  newRange = (e) => {
    let pair = { ...this.state.pair };
    pair.range = e.target.value;
    this.setState({
      pair: pair
    });
  }

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
        range: ''
      }
    })
  }

  updateName = (e) => {
    let dictionary = { ...this.state.dictionary };
    dictionary.name = e.target.value;
    this.setState({
      dictionary: dictionary
    });
  }

  updateDomain = (index, e) => {
    let dictionary = { ...this.state.dictionary };
    dictionary.pairs[index].domain = e.target.value;
    this.setState({
      dictionary: dictionary
    });
  }

  updateRange = (index, e) => {
    let dictionary = { ...this.state.dictionary };
    dictionary.pairs[index].range = e.target.value;
    this.setState({
      dictionary: dictionary
    });
  }

  toggleEditName = () => {
    this.setState({
      editName: !this.state.editName
    });
  }

  toggleAddNewPair = () => {
    this.setState({
      addNewPair: !this.state.addNewPair
    });
  }

  toggleEditPairs = () => {
    this.setState({
      editPairsMode: !this.state.editPairsMode
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
    }

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
        <Button id="btn" color="primary" onClick={this.toggleAddNewPair}><FaCheck />Done</Button>
        <Button id="btn" color="primary" onClick={this.addPair}><FaPlus /> Add</Button>
        <br />
        <br />
      </Form>
    };


    return (
      <div className="DictionaryView">
        <h1>{this.state.dictionary.name}
        <Button id="btn" onClick={this.toggleEditName} color="info">{ this.state.editName ? <FaCheck /> : <FaEdit />}</Button>
        <Button id="btn" onClick={this.removeDictionary} color="danger"><FaTrashAlt /></Button></h1>
        {nameForm}

        <Table className="Table">
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
