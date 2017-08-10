import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';
import routes from './routes/routes';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import allReducers from './reducers';
import App from './components/App';
import '.././scss/style.scss';

const store = createStore(
  allReducers,
  applyMiddleware(reduxThunk)
);
ReactDOM.render(
	<Provider store={store}>
  	<HashRouter>
  		{routes}
  	</HashRouter>
	</Provider>,
document.getElementById('root')
);
