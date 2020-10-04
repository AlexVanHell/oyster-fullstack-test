import React, { ComponentType, FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthService } from '../auth/service/auth.service';
import {
	injectServices,
	InjectServicesWrappedProps,
} from '../HOCs/inject-services.hoc';

export interface PublicProtectedRouteProps<P = {}> {
	layout?: ComponentType<P>;
}

const PublicProtectedRoute: FunctionComponent<
	InjectServicesWrappedProps<'authService'> &
		RouteProps &
		PublicProtectedRouteProps
> = ({ services: { authService }, layout: Layout, ...rest }) => {
	const isAuthenticated = authService.isAuthenticated();

	if (isAuthenticated) {
		const { from } = (rest.location?.state as {
			from: { pathname: string };
		}) || { from: { pathname: '/home' } };
		return <Redirect to={from} />;
	}

	const content = <Route {...(rest as RouteProps)} />;
	return Layout ? <Layout children={content} /> : content;
};

PublicProtectedRoute.propTypes = {};

export default injectServices(PublicProtectedRoute, [AuthService]);
