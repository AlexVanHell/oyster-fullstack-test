import { AxiosResponse } from 'axios';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { promiseTimeout } from '../../common/helpers/promise-timeout.helper';
import LoginForm, {
	LoginFormValues,
} from '../../components/LoginForm/LoginForm';
import {
	injectServices,
	InjectServicesWrappedProps,
} from '../../HOCs/inject-services.hoc';
import {
	AuthUserWrappedProps,
	withAuthUser,
} from '../../HOCs/with-auth-user.hoc';
import { AuthApiService } from '../../services/api/auth-api/auth-api.service';
import './LoginPage.scss';

interface LoginPageState {
	alertMessage: { variant: 'success' | 'danger'; id: string } | undefined;
}

export class LoginPage extends Component<
	RouteComponentProps &
		AuthUserWrappedProps &
		InjectServicesWrappedProps<'authApiService'>,
	LoginPageState
> {
	static propTypes = {};

	state: LoginPageState = {
		alertMessage: undefined,
	};

	private handleFormValuesChange(values: LoginFormValues, isValid: boolean) {
		this.setState({
			alertMessage: undefined,
		});
	}

	private async callApi(values: LoginFormValues) {
		const {
			services: { authApiService },
		} = this.props;

		try {
			return await authApiService.login(values.username, values.password);
		} catch (err) {
			if (err && err.data && (err as AxiosResponse).data.code) {
				this.setState({
					alertMessage: {
						variant: 'danger',
						id: `API_ERRORS.${err.data.code}`,
					},
				});
			}
		}
	}

	private async login(values: LoginFormValues, doneFormSubmit: () => void) {
		const { history, authUser } = this.props;

		await promiseTimeout(1000); // Fake loading
		const response = await this.callApi(values);

		if (response) {
			const { user, token } = response;

			this.setState({
				alertMessage: {
					variant: 'success',
					id: 'login.success',
				},
			});

			await promiseTimeout(1000); // Fake loading

			this.setState({ alertMessage: undefined }, async () => {
				doneFormSubmit();
				await authUser.authenticate(user, token.accessToken);
				history.push('/');
			});
		} else {
			doneFormSubmit();
		}
	}

	render() {
		const { alertMessage } = this.state;

		return (
			<div className="LoginPage-container">
				<div className="LoginPage-logo-container">
					<img src="/logo192.png" alt="App Logo" />
				</div>
				<LoginForm
					alertMessage={alertMessage}
					onFormSubmitted={(...args) => this.login(...args)}
					onFormValueChange={(...args) => this.handleFormValuesChange(...args)}
				/>
			</div>
		);
	}
}

export default injectServices(withAuthUser(withRouter(LoginPage)), [
	AuthApiService,
]);
