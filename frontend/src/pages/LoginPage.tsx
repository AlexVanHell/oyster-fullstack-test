import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';

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

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
