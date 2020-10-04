import React, { ComponentType, FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthService } from '../auth/service/auth.service';
import {
	injectServices,
	InjectServicesWrappedProps,
} from '../HOCs/inject-services.hoc';

export interface PrivateRouteProps<P = {}> {
	layout?: ComponentType<P>;
}

const PrivateRoute: FunctionComponent<
	InjectServicesWrappedProps<'authService'> & RouteProps & PrivateRouteProps
> = ({ services: { authService }, layout: Layout, ...rest }) => {
	const isAuthenticated = authService.isAuthenticated();

	if (isAuthenticated) {
		const content = <Route {...(rest as RouteProps)} />;
		return Layout ? <Layout children={content} /> : content;
	}

	return <Redirect to="/login" />;
};

PrivateRoute.propTypes = {};

export default injectServices(PrivateRoute, [AuthService]);
