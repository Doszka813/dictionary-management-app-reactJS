import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, NavItem, NavLink, Table } from 'reactstrap';
import Pair from './Pair';
import '../../css/style.css';

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

  render() {
    return (
      <NavItem className="dictionary">
        <NavLink><h2>{this.props.dictionary.name}</h2></NavLink>
        <Link to={`/dictionary/${this.props.dictionary.id}`}><Button color="info">Edit</Button></Link>

        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Domain</th>
              <th>Range</th>
            </tr>
          </thead>
          <tbody>

          {this.props.dictionary && this.props.dictionary.pairs.map((pair, index) => {
            return <Pair key = {index} pair={pair}/>
          })}

          </tbody>
        </Table>
      </NavItem>
    )
  }
}

export default Dictionary;
