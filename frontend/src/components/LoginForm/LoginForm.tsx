import { faLock, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import {
	Form as FormikForm,
	Formik,
	FormikConfig,
	FormikHelpers,
	FormikProps,
} from 'formik';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {
	FormattedMessage,
	injectIntl,
	WrappedComponentProps,
} from 'react-intl';
import { AuthService } from '../../auth/service/auth.service';
import {
	injectServices,
	InjectServicesWrappedProps,
} from '../../HOCs/inject-services.hoc';
import { AuthApiService } from '../../services/api/auth-api/auth-api.service';
import ButtonLoading from '../ButtonLoading/ButtonLoading';
import LoginFormField from '../LoginFormField/LoginFormField';
import PasswordPreview from '../PasswordPreview/PasswordPreview';
import './LoginForm.scss';

export interface LoginFormState {
	username: string;
	password: string;
	submitted: boolean;
}

export interface LoginFormValues {
	username: string;
	password: string;
}

export class LoginForm extends Component<
	WrappedComponentProps &
		InjectServicesWrappedProps<'authService' | 'authApiService'>
> {
	static propTypes = {};

	private validateField(value: string, id: string) {
		let error = '';

		if (!value || !value.trim().length) {
			error = this.props.intl.formatMessage({
				id,
			});
		}

		return error;
	}

	private validateUsername(value: string) {
		return this.validateField(value, 'login.validation.username.required');
	}

	private validatePassword(value: string) {
		return this.validateField(value, 'login.validation.password.required');
	}

	private async handleSubmit(
		values: LoginFormValues,
		{ setSubmitting }: FormikHelpers<LoginFormValues>,
	) {
		setSubmitting(true);

		setTimeout(async () => {
			await this.login(values);
			setSubmitting(false);
		}, 500);
	}

	private async login(values: LoginFormValues) {
		const response = await this.props.services.authApiService.login(
			values.username,
			values.password,
		);

		this.props.services.authService.setUser(response.user);
		this.props.services.authService.setToken(response.token.accessToken);
	}

	render() {
		const formikProps: FormikConfig<LoginFormValues> = {
			initialValues: { username: '', password: '' },
			onSubmit: (values, formikHelpers) => {
				this.handleSubmit(values, formikHelpers);
			},
		};

		console.log(this.props);

		return (
			<div className="LoginForm-container">
				<Card>
					<Card.Body>
						<div className="py-3">
							<h1 className="LoginForm-title text-center text-primary">
								<FormattedMessage description="Title" id={'login.title'} />
							</h1>
							<Formik {...formikProps}>
								{({ isValid, isSubmitting }: FormikProps<any>) => (
									<FormikForm>
										<Row className="LoginForm-inputs-container">
											<Col xs={12} className="pb-3">
												<LoginFormField
													name={'username'}
													icon={faUser}
													type={'text'}
													validate={(value) => this.validateUsername(value)}
												/>
											</Col>
											<Col xs={12} className="pb-4">
												<PasswordPreview>
													{({ type, icon, toggle }) => (
														<LoginFormField
															className="LoginForm-password-input"
															name={'password'}
															icon={faLock}
															type={type}
															validate={(value) => this.validatePassword(value)}
														>
															<InputGroup.Append>
																<InputGroup.Text className="LoginForm-password-icon">
																	<div onClick={() => toggle()}>{icon}</div>
																</InputGroup.Text>
															</InputGroup.Append>
														</LoginFormField>
													)}
												</PasswordPreview>
											</Col>
											<Col>
												<ButtonLoading
													variant={'primary'}
													loading={isValid && isSubmitting}
													textId={'login.start_button'}
													icon={{ position: 'right', value: faSignInAlt }}
													type={'submit'}
													block={true}
													disabled={!isValid || isSubmitting}
												/>
											</Col>
										</Row>
									</FormikForm>
								)}
							</Formik>
						</div>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

/* const mapStateToProps = (state: LoginFormState) => ({});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(injectIntl(LoginForm)); */

export default injectServices(injectIntl(LoginForm), [
	AuthApiService,
	AuthService,
]);
