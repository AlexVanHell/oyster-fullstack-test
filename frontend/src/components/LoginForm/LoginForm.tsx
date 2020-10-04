import { faLock, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import {
	Form as FormikForm,
	Formik,
	FormikConfig,
	FormikHelpers,
	FormikProps,
} from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { FormattedMessage } from 'react-intl';
import ButtonLoading from '../ButtonLoading/ButtonLoading';
import LoginFormField from '../LoginFormField/LoginFormField';
import PasswordPreview from '../PasswordPreview/PasswordPreview';
import './LoginForm.scss';

export interface LoginFormValues {
	username: string;
	password: string;
}

export interface LoginFormProps {
	alertMessage: { variant: 'success' | 'danger'; id: string } | undefined;
	/**
	 * @param values Values from form
	 * @param done Callback to notify submit done
	 */
	onFormSubmitted: (values: LoginFormValues, done: () => void) => void;
	onFormValueChange: (values: LoginFormValues, isValid: boolean) => void;
}

export class LoginForm extends Component<LoginFormProps> {
	static propTypes = {
		alertMessage: PropTypes.shape({
			variant: PropTypes.oneOf(['success', 'danger']).isRequired,
			id: PropTypes.string.isRequired,
		}),
		onFormSubmitted: PropTypes.func.isRequired,
		onFormValueChange: PropTypes.func.isRequired,
	};

	private validateField(value: string, id: string) {
		let error = '';

		if (!value || !value.trim().length) {
			error = id;
		}

		return error;
	}

	private validateUsername(value: string) {
		return this.validateField(value, 'login.validation.username.required');
	}

	private validatePassword(value: string) {
		return this.validateField(value, 'login.validation.password.required');
	}

	private handleFormChange(values: LoginFormValues, isValid: boolean) {
		this.props.onFormValueChange(values, isValid);
	}

	private async handleSubmit(
		values: LoginFormValues,
		{ setSubmitting }: FormikHelpers<LoginFormValues>,
	) {
		setSubmitting(true);
		this.props.onFormSubmitted(values, () => {
			setSubmitting(false);
		});
	}

	render() {
		const { alertMessage } = this.props;

		const formikProps: FormikConfig<LoginFormValues> = {
			initialValues: { username: '', password: '' },
			onSubmit: (values, formikHelpers) => {
				this.handleSubmit(values, formikHelpers);
			},
		};

		return (
			<div className="LoginForm-container">
				<Card>
					<Card.Body>
						<div className="py-3">
							<Row>
								<Col xs={12}>
									<h1 className="LoginForm-title text-center text-primary">
										<FormattedMessage description="Title" id={'login.title'} />
									</h1>
								</Col>
								{alertMessage && (
									<Col className="py-1" xs={12}>
										<Alert className="m-0" variant={alertMessage.variant}>
											<FormattedMessage id={alertMessage.id} />
										</Alert>
									</Col>
								)}
							</Row>

							<Formik {...formikProps}>
								{({ isValid, isSubmitting, values }: FormikProps<any>) => (
									<FormikForm
										onChange={() => this.handleFormChange(values, isValid)}
									>
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
													loading={isValid && !!isSubmitting}
													textId={'login.start_button'}
													icon={{ position: 'right', value: faSignInAlt }}
													type={'submit'}
													block={true}
													size={'lg'}
													disabled={!isValid || !!isSubmitting}
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

export default LoginForm;
