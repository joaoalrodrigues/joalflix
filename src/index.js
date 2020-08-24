import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChannelRegister from './pages/Register/Channel';

function Error404() {
	return (
		<div>Error 404</div>
	)
}

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/register/channel" component={ChannelRegister} />
			<Route component={Error404} />
		</Switch>
	</BrowserRouter>,

	document.getElementById('root')
);

