import React from 'react';
import { Link } from "react-router-dom";
import { Button, NavItem, NavLink, Table } from 'reactstrap';
import Pair from './Pair';
import '../../css/style.css';

const Dictionary = (props) => {
  const { dictionary } = props;

  return (
    <NavItem className="dictionary">
      <NavLink><h2>{dictionary.name}</h2></NavLink>
      <Button color="info">Edit</Button>

      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Domain</th>
            <th>Range</th>
          </tr>
        </thead>
        <tbody>

        {dictionary && dictionary.pairs.map((pair, index) => {
          return <Pair key = {index} pair={pair}/>
        })}

        </tbody>
      </Table>
    </NavItem>
  )
}

export default Dictionary;
