import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import {
	AuthUserWrappedProps,
	withAuthUser,
} from '../../HOCs/with-auth-user.hoc';

export class WelcomeCard extends Component<AuthUserWrappedProps> {
	static propTypes = {};

	render() {
		console.log(this.props);

		if (!this.props.authUser) {
			return <Redirect to="/login" />;
		}

		const {
			authUser: { firstname, lastname },
		} = this.props;

		return (
			<div className="WelcomeCard-container">
				<div className="WelcomeCard-content">
					<h1>
						<FormattedMessage
							id={'dashboard.welcome'}
							values={{ name: `${firstname} ${lastname}` }}
						/>
					</h1>
				</div>
			</div>
		);
	}
}

export default withAuthUser(WelcomeCard);
