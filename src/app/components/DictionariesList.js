import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Table, Button, Badge } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';


class DictionariesList extends Component {
  render() {
    if (this.props.dictionaries.length >= 1) {
      return (
        <div className="container">
          <h1>Available Dictionaries <Badge color="info">{this.props.dictionaries.length}</Badge></h1>
          <div className="dictionaries">
            {this.props.dictionaries.map((dictionary, id) => {
              return (
                <div className="dictionary" key={id}>
                  <h2>{dictionary.name}</h2>
                  <Link to={`/dictionary/${dictionary.id}`}><Button color="info">Edit <FaEdit /></Button></Link>
                  <div>
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
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{pair.domain}</td>
                              <td>{pair.range}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <h2>No dictionaries found. You can <Link to="/addDictionary">add </Link>one yourself.</h2>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    dictionaries: state
  }
}

export default connect(mapStateToProps)(DictionariesList);
