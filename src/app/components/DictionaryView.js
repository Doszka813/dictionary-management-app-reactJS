import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, NavItem, NavLink, Table } from 'reactstrap';
import '../../css/style.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

class DictionaryView extends Component {
  constructor(){
    super();
    this.state = {
    }
  };



  // componentDidMount() {
  //   let id = this.props.dictionary.match.params.id;
  //   this.setState({
  //     id: id
  //   })
  // }
  // removeDictionary = (dictionary) => {
  //   this.props.removeDictionary(dictionary);
  //
  // }
  render() {
    const ind = this.props.match.params.id;
    let dictionary = this.props.dictionaries[ind];

    if (!ind) {
      return <div>Sorry, but the dictionary was not found</div>
    }
    return (
      <div className="DictionaryView">
        <h1>{dictionary.name}</h1>

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
    )
  }
}

export default DictionaryView;
