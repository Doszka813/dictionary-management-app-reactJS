import React from 'react';
import { Link } from "react-router-dom";
import { Nav, Badge, NavItem, NavLink, Table, Button} from 'reactstrap';
import { FaEdit } from 'react-icons/fa';


const DictionariesList = (props) => {
  const { dictionaries } = props;

  return (
    <div className="container">
      <h1>Available Dictionaries <Badge color="info">{dictionaries.length}</Badge></h1>
      <Nav tabs className="dictionaries">
        {dictionaries && dictionaries.map((dictionary, id) => {
          return (
            <NavItem className="dictionary">
              <NavLink><h2>{dictionary.name}</h2></NavLink>
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
            </NavItem>
          )
        })}
      </Nav>
    </div>
  )
}

export default DictionariesList;
