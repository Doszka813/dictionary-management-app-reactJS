import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, NavItem, NavLink, Table } from 'reactstrap';
import '../../css/style.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

class Dictionary extends Component {
  constructor(){
    super();
    this.state = {
      id: null
    }
  }

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
    return (
      <NavItem className="dictionary">
        <NavLink><h2>{this.props.dictionary.name}</h2></NavLink>
        <Button id="del" color="danger"><FaTrashAlt /></Button>
        <Link to={`/dictionary/${this.props.dictionary.id}`}><Button color="info">Edit <FaEdit /></Button></Link>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Domain</th>
              <th>Range</th>
            </tr>
          </thead>
          <tbody>
          {this.props.dictionary && this.props.dictionary.pairs.map((pair, index) => {
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
      </NavItem>
    )
  }
}

export default Dictionary;
