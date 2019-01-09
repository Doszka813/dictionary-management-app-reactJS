import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Table, Button, Badge } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';

const DictionariesList = (props) => {

  return (
    <div>
    {props.dictionaries.length >= 1 ?
       <div className="container">
          <h1>Available Dictionaries <Badge color="info">{props.dictionaries.length}</Badge></h1>
          <div className="dictionaries">
            {props.dictionaries.map((dictionary, id) => {
              return (
                <Dictionary {...dictionary} key={dictionary.id}/>
              )
            })}
          </div>
        </div>
        : <h1>No dictionaries found. You can <Link to="/addDictionary">add </Link>one yourself.</h1>
    }
    </div>
  )
}

const Dictionary = (dictionary) => {
  return (
    <div className="dictionary">
      <h2>{dictionary.name}</h2>
      <Link to={`/dictionary/${dictionary.id}`}><Button id="edit_btn" color="info">Edit <FaEdit /></Button></Link>
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
            <Pairs {...dictionary}/>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const Pairs = (dictionary) => {
  return (
    dictionary && dictionary.pairs.map((pair, index) => {
      return (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{pair.domain}</td>
          <td>{pair.range}</td>
          </tr>
      )})
    )
}

const mapStateToProps = (state) => {
  return {
    dictionaries: state
  }
}

export default connect(mapStateToProps)(DictionariesList);
