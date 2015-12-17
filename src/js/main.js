import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes.js'
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

import { Router, Route, IndexRoute, History} from 'react-router';

const history = createHashHistory();


ReactDOM.render(
  <Router history={history}>{routes}</Router>,
  document.getElementById('content')
)
