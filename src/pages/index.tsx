import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import QueryPage from './components/QueryPage';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/query" component={QueryPage} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
