import React, { Component, Fragment } from 'react';
import { BrowserRouter, /* Redirect, */ Route, Switch } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';

export class PublicLayout extends Component {
	static propTypes = {};

	render() {
		return (
			<Fragment>
				<BrowserRouter>
					<Switch>
						{/* <Redirect from="/" to="/login" /> */}
						<Route path="/login" /* component={LoginPage} */>
							<LoginPage />
						</Route>
					</Switch>
				</BrowserRouter>
			</Fragment>
		);
	}
}

export default PublicLayout;
