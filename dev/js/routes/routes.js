import React from 'react';
import {Route,Switch} from 'react-router-dom';

import App from '../components/App';
import Home from '../containers/Home';

export default(
	<Switch>
		<Route component={Home} path='/dashboard' />
		<Route component={App} path='/' />
	</Switch>
	)
