var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;


import App from '../components/app';
import Stock from '../components/stock';
import Template from '../components/template';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Stock} />
    <Route path="/template" component={Template} />
  </Route>
);