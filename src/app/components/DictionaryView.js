import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, NavItem, NavLink, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../css/style.css';
import { FaTrashAlt, FaEdit, FaSave, FaCheck, FaPlus } from 'react-icons/fa';

class DictionaryView extends Component {
  constructor(){
    super();
    this.state = {
      dictionary: null,
      addNewPair: false,
      editName: false,
      editPairsMode: false,
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
    this.toggleAddNewPair = this.toggleAddNewPair.bind(this);
    this.toggleEditPairs = this.toggleEditPairs.bind(this);
    this.removeDictionary = this.removeDictionary.bind(this);
    this.updateDictionary = this.updateDictionary.bind(this);
    this.addPair = this.addPair.bind(this);
    this.newDomain = this.newDomain.bind(this);
    this.newRange = this.newRange.bind(this);
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
  };

  updateDictionary() {
    let dictionary = {...this.state.dictionary};
    this.props.updateDictionary(dictionary);
    console.log(this.state.dictionary);
    this.props.history.push("/dictionaries")
  };

  removePair(index) {
    let dictionary = {...this.state.dictionary};
    dictionary.pairs.splice(index, 1);
    this.setState({
      dictionary: dictionary
    });
    this.updateDictionary(this.state.dictionary);
    if(dictionary.pairs.length < 1) {
      this.removeDictionary();
    }
  };

  newDomain(e) {
    let pair = {...this.state.pair};
    pair.domain = e.target.value;
    this.setState({
      pair: pair});
  };

  newRange(e) {
    let pair = {...this.state.pair};
    pair.range = e.target.value;
    this.setState({
      pair: pair
    });
  };

  addPair() {
    let dictionary = {...this.state.dictionary};
    let newPair = {...this.state.pair};
    dictionary.pairs.push(newPair);
    this.setState({
      dictionary: dictionary
    })
  };

  updateName(e) {
    let dictionary = {...this.state.dictionary};
    dictionary.name = e.target.value;
    this.setState({
      dictionary: dictionary
    });
  };

  updateDomain(e, index) {
    let dictionary = {...this.state.dictionary};
    dictionary.pairs[index].domain = e.target.value;
    this.setState({
      dictionary: dictionary
    });
  };

  updateRange(e, index) {
    let dictionary = {...this.state.dictionary};
    dictionary.pairs[index].range = e.target.value;
    this.setState({
      dictionary: dictionary
    });
  };

  toggleEditName() {
    this.setState({
      editName: !this.state.editName
    });
  };

  toggleAddNewPair() {
    this.setState({
      addNewPair: !this.state.addNewPair
    });
  };

  toggleEditPairs() {
    this.setState({
      editPairsMode: !this.state.editPairsMode
    });
  };

  render() {
    let nameForm;
    let domainForm;
    let rangeForm;
    let addPairForm;
    let tableContent;

    if(this.state.editName){
      nameForm =
        <Form ref="form">
          <FormGroup>
            <Label htmlFor="name">Dictionary Name</Label>
            <Input type="text" placeholder={this.state.dictionary.name} value={this.state.dictionary.name} onChange={this.updateName} name="name" id="name" />
          </FormGroup>
          <br />
        </Form>
    }

    // if(!this.state.editPairsMode){
    //   tableContent =
    //     <tr key={index}>
    //       <td>{index +1}</td>
    //       <td>{pair.domain}</td>
    //       <td>{pair.range}</td>
    //       <td><FaEdit onClick={this.toggleEditPairs}/></td>
    //       <td><FaTrashAlt onClick={this.removePair.bind(this, index)}/></td>
    //     </tr>
    // } else {
    //     tableContent =
    //       <tr key={index}>
    //         <td>{index +1}</td>
    //         <td>
    //           {pair.domain}
    //           <Input type="text" onChange={this.updateDomain.bind(this, index)} value={this.state.dictionary.pairs[index].domain} name="domain" id="domain" />
    //         </td>
    //         <td>
    //           {pair.range}
    //           <Input type="text" onChange={this.updateRange.bind(this, index)} value={this.state.dictionary.pairs[index].range} name="range" id="range" />
    //         </td>
    //         <td><FaEdit onClick={this.toggleEditPairs.bind(this, index)}/></td>
    //         <td><FaTrashAlt onClick={this.removePair.bind(this, index)}/></td>
    //       </tr>
      // domainForm =
      //   <Form ref="form">
      //     <FormGroup>
      //       <Label htmlFor="domain"></Label>
      //       <Input type="text" onChange={this.updateDomain.bind(this, index)} name="domain" id="domain" />
      //     </FormGroup>
      //   </Form>;
      //
      // rangeForm =
      //   <Form ref="form">
      //     <FormGroup>
      //     <Label htmlFor="range"></Label>
      //     <Input type="text" onChange={this.updateRange.bind(this, index)} name="range" id="range" />
      //     </FormGroup>
      //   </Form>
    // }

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
        <Button color="primary" onClick={this.toggleAddNewPair}><FaCheck /></Button>
        <Button color="primary" onClick={this.addPair}>Add</Button>
      </Form>
    };


    return (
      <div className="DictionaryView">
        <h1>{this.state.dictionary.name}
        <Button onClick={this.toggleEditName} color="info">{ this.state.editName ? <FaCheck /> : <FaEdit />}</Button>
        <Button onClick={this.removeDictionary} color="danger"><FaTrashAlt /></Button></h1>
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
          {this.state.dictionary && this.state.dictionary.pairs.map((pair, index) => {
            return (
              <tr key={index}>
                <td>{index +1}</td>
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
               <td><FaEdit onClick={this.toggleEditPairs}/></td>
                <td><FaTrashAlt onClick={this.removePair.bind(this, index)}/></td>
              </tr>
            )
          })}
          </tbody>
        </Table>
        {addPairForm}

        <Button color="success" onClick={this.toggleAddNewPair}><FaPlus /></Button>
        {this.state.addNewPair ? <Button onClick={this.addPair} color="primary"><FaCheck /> Done </Button> : null }
        <Button color="primary" onClick={this.updateDictionary}><FaSave /></Button>

        <Link to="/dictionaries/"><Button color="warning" onClick={this.toggleFlag}>Back</Button></Link>

      </div>
    )
  }
}

export default DictionaryView;
