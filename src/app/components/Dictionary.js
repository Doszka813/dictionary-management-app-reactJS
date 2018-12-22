import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, NavItem, NavLink, Table } from 'reactstrap';
import '../../css/style.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';


const Dictionary = (props) => {
  const { dictionary } = props;

  return (
    <NavItem className="dictionary">
      <NavLink><h2>{dictionary.name}</h2></NavLink>
      <Link to={`/dictionary/${dictionary.id}`}><Button color="info">Edit <FaEdit /></Button></Link>
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
    </NavItem>
  )
}

export default Dictionary;
