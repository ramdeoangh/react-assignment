import React, { Component } from "react";
import "./App.scss";
import { Router, Switch, Route } from "react-router-dom";

import { Home } from "./components";

import { history } from "./helpers";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
