import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AuthService } from '../../auth/service/auth.service';
import { promiseTimeout } from '../../common/helpers/promise-timeout.helper';
import {
	injectServices,
	InjectServicesWrappedProps,
} from '../../HOCs/inject-services.hoc';
import ButtonLoading from '../ButtonLoading/ButtonLoading';

const LogoutButton = ({
	history,
	services: { authService },
}: RouteComponentProps & InjectServicesWrappedProps<'authService'>) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (loading) {
			authService.deleteUser().then(async () => {
				await promiseTimeout(1000);
				setLoading(false);
				history.push('/');
			});
		}

		return () => {};
	}, [history, authService, loading]);

	const handleClick = async () => {
		setLoading(true);
	};

	return (
		<ButtonLoading
			loading={loading}
			disabled={loading}
			textId={'dashboard.logout'}
			icon={{ position: 'right', value: faSignOutAlt }}
			variant={'danger'}
			onClick={() => handleClick()}
		/>
	);
};

LogoutButton.propTypes = {};

export default injectServices(withRouter(LogoutButton), [AuthService]);
