import React, { Fragment } from 'react';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';

const RoutesHandler = () => {
	return (
		<Fragment>
			<PublicRoutes />
			<ProtectedRoutes />
		</Fragment>
	);
};

RoutesHandler.propTypes = {};

export default RoutesHandler;
