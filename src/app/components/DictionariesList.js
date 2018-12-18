import React from 'react';
import { Link } from "react-router-dom";
import Dictionary from './Dictionary';
import { Nav } from 'reactstrap';

const DictionariesList = (props) => {
  const { dictionaries } = props;

  return (
    <div className="container">
      <h1>Available Dictionaries</h1>
      <Nav pills className="dictionaries">
        {dictionaries && dictionaries.map((dictionary, id) => {
          return <Dictionary key = {id} dictionary={dictionary}/>
        })}
      </Nav>
    </div>
  )
}

export default DictionariesList;
