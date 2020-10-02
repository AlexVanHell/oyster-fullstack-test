import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trans } from '@lingui/react';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { I18nProps, withI18n } from '../HOCs/withI18n';

export interface LoginFormState {
	username: string;
	password: string;
	submitted: boolean;
}

export interface LoginFormProps extends I18nProps {}

export class LoginForm extends Component<LoginFormProps, LoginFormState> {
	static propTypes = {};

	constructor(props: LoginFormProps) {
		super(props);
		this.state = {
			username: '',
			password: '',
			submitted: false,
		};
	}

	render() {
		const { i18n } = this.props;

		return (
			<div>
				<Card>
					<Card.Body>
						<Row>
							<Col xs={12}>
								<h1>
									<Trans id={'login-title'} />
								</h1>
							</Col>
						</Row>
						<Row className="LoginForm-inputs-container">
							<Col xs={12}>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text id="username-addon">
											<FontAwesomeIcon icon={faUser} />
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder={i18n._(`login.username`)}
										aria-label={i18n._(`login.username`)}
										aria-describedby="username-addon1"
									/>
								</InputGroup>
							</Col>
							<Col xs={12}>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text id="password-addon">
											<FontAwesomeIcon icon={faUser} />
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder={i18n._(`login.password`)}
										aria-label={i18n._(`login.password`)}
										aria-describedby="password-addon"
									/>
								</InputGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button>
									<Trans id={'login.start-button'} />
								</Button>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state: LoginFormState) => ({});

const mapDispatchToProps = {};

export default withI18n(
	connect(mapStateToProps, mapDispatchToProps)(LoginForm),
);
