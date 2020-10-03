import React, { Component, Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import {
	AuthUserWrappedProps,
	withAuthUser,
} from '../../HOCs/with-auth-user.hoc';
import './NavbarLayout.scss';

export class NavbarLayout extends Component<AuthUserWrappedProps> {
	static propTypes = {};

	render() {
		const { children } = this.props;

		return (
			<Fragment>
				<div className="NavbarLayout-container">
					<Navbar />
					<div className="NavbarLayout-content">{children}</div>
				</div>
			</Fragment>
		);
	}
}

export default withAuthUser(NavbarLayout);
