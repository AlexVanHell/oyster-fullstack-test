import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import {
	AuthUserWrappedProps,
	withAuthUser,
} from '../../HOCs/with-auth-user.hoc';
import './Navbar.scss';

export class Navbar extends Component<AuthUserWrappedProps> {
	static propTypes = {};

	render() {
		return (
			<Fragment>
				<div className="Navbar-container">
					<div className="Navbar-content">
						<h2 className="m-0 p-2">Oyster</h2>
						<div className="Navbar-right-info">
							<Button variant={'danger'}>
								<FormattedMessage id={'dashboard.logout'} />
								<FontAwesomeIcon className="ml-3" icon={faSignOutAlt} />
							</Button>
						</div>
					</div>
				</div>
				<div className="Navbar-space"></div>
			</Fragment>
		);
	}
}

export default withAuthUser(Navbar);
