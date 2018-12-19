import React from 'react';
import { Link } from "react-router-dom";

const Pair = (props) => {
  const { pair } = props;
  return (
    <tr>
      <td></td>
      <td>{pair.domain}</td>
      <td>{pair.range}</td>
    </tr>
    )
  }

export default Pair;
