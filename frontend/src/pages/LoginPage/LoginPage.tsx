import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.scss';

export class LoginPage extends Component {
	static propTypes = {};

	render() {
		return (
			<div className="LoginPage-container">
				<LoginForm />
			</div>
		);
	}
}

/* const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage); */

export default LoginPage;
