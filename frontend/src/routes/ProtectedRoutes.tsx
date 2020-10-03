import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthService } from '../auth/service/auth.service';
import { AuthUserContext } from '../common/context/auth-user.context';
import {
	injectServices,
	InjectServicesWrappedProps,
} from '../HOCs/inject-services.hoc';
import NavbarLayout from '../layout/NavbarLayout/NavbarLayout';
import HomePage from '../pages/HomePage/HomePage';

const ProtectedRoutes = (props: InjectServicesWrappedProps<'authService'>) => {
	const {
		services: { authService },
	} = props;

	const user = authService.getUser() || undefined;

	return (
		<AuthUserContext.Provider value={user}>
			<NavbarLayout>
				<BrowserRouter>
					<Switch>
						{/* <Redirect from="/" to="/home" /> */}
						<Route path="/home">
							<HomePage />
						</Route>
					</Switch>
				</BrowserRouter>
			</NavbarLayout>
		</AuthUserContext.Provider>
	);
};

ProtectedRoutes.propTypes = {};

export default injectServices(ProtectedRoutes, [AuthService]);
