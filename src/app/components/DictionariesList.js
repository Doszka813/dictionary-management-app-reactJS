import React from 'react';
import { Link } from "react-router-dom";
import Dictionary from './Dictionary';
import { Nav, Badge } from 'reactstrap';

const DictionariesList = (props) => {
  const { dictionaries } = props;

  return (
    <div className="container">
      <h1>Available Dictionaries <Badge color="info">{dictionaries.length}</Badge></h1>


      <Nav pills className="dictionaries">
        {dictionaries && dictionaries.map((dictionary, id) => {
          return <Dictionary key = {dictionary.id} dictionary={dictionary}/>
        })}
      </Nav>
    </div>
  )
}

export default DictionariesList;
