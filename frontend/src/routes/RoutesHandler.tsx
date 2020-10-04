import React, { useState } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { AuthService } from '../auth/service/auth.service';
import { AuthUserContext } from '../common/context/auth-user.context';
import { UserModel } from '../common/model/user.model';
import {
	injectServices,
	InjectServicesWrappedProps,
} from '../HOCs/inject-services.hoc';
import NavbarLayout from '../layout/NavbarLayout/NavbarLayout';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicProtectedRoute from './PublicProtectedRoute';

const RoutesHandler = ({
	services: { authService },
}: InjectServicesWrappedProps<'authService'>) => {
	const [user, setUser] = useState(authService.getUser());

	const setAuthUser = async (value: UserModel, token: string) => {
		await authService.authenticate(value, token);
		setUser(value);
	};

	return (
		<BrowserRouter>
			<AuthUserContext.Provider
				value={{ value: user as UserModel, authenticate: setAuthUser }}
			>
				<Switch>
					{/* Login */}
					<PublicProtectedRoute path="/login" component={LoginPage} />

					{/* Dashboard */}
					<PrivateRoute
						path="/home"
						layout={NavbarLayout}
						component={HomePage}
					/>

					{/* Redirects */}
					<Redirect from="*" to="/login" />
				</Switch>
			</AuthUserContext.Provider>
		</BrowserRouter>
	);
};

RoutesHandler.propTypes = {};

export default injectServices(RoutesHandler, [AuthService]);
