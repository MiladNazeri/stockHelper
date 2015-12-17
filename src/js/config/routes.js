var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;


import App from '../components/app';
import Hello from '../components/hello';
import Template from '../components/template';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Hello} />
    <Route path="/template" component={Template} />
  </Route>
);