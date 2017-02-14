import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./Layout";

import Main from "./pages/Main";

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Main}></IndexRoute>
      <Route path="/(:character1)(/:character2)" component={Main}></Route>
    </Route>
  </Router>,
  document.getElementById('app')
);