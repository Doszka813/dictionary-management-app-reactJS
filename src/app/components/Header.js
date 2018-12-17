import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Welcome from './Welcome';
import DictionariesList from './DictionariesList';
import DictionaryCreator from './DictionaryCreator';

import { Button } from 'reactstrap';

class Header extends Component {

  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-sm bg-light">
          <nav>
            <ul>
              <li>
                <Link to="/"><Button color="primary">Home</Button></Link>
              </li>
              <li>
                <Link to="/dictionaries/">Dictionaries</Link>
              </li>
              <li>
                <Link to="/addDictionary/">Add Dictionary</Link>
              </li>
            </ul>
          </nav>

          <Route exact path="/" component={Welcome}></Route>
          <Route path="/dictionaries" component={DictionariesList}></Route>
          <Route path="/addDictionary" component={DictionaryCreator}></Route>
        </nav>
      </Router>
    );
  }
}

export default Header;
