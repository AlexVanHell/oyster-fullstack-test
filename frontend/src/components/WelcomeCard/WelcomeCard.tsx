import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
	AuthUserWrappedProps,
	withAuthUser,
} from '../../HOCs/with-auth-user.hoc';

export class WelcomeCard extends Component<AuthUserWrappedProps> {
	static propTypes = {};

	render() {
		const {
			authUser: {
				value: { firstname, lastname },
			},
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
