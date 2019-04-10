import React, { Component } from 'react';
import { Router, Route} from "react-router-dom";
import Login from './page/Login/Login.jsx';
import System from './page/System/System.jsx'
import history from './history.js';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
           <Route exact path="/" component={Login}  />
           <Route path="/system" component={System}  />
        </div>
      </Router>
    );
  }
}

export default App;
