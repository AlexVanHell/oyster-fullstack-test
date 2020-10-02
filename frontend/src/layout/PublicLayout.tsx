import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

export class PublicLayout extends Component {
	static propTypes = {};

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Redirect from="/" to="/home" />
					<Route path="/login" component={LoginPage} exact />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default PublicLayout;
