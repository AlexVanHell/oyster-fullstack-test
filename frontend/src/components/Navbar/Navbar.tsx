import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import {
	AuthUserWrappedProps,
	withAuthUser,
} from '../../HOCs/with-auth-user.hoc';
import LogoutButton from '../LogoutButton/LogoutButton';
import './Navbar.scss';

export class Navbar extends Component<AuthUserWrappedProps> {
	static propTypes = {};

	render() {
		const {
			authUser: {
				value: { firstname },
			},
		} = this.props;

		return (
			<Fragment>
				<div className="Navbar-container">
					<div className="Navbar-content">
						<div className="Navbar-logo-container">
							<img src="/logo192.png" alt="App Logo" />
						</div>
						<h2 className="m-0">Oyster</h2>
						<div className="Navbar-right-info">
							<div className="Navbar-user-container px-2">
								<Button variant={'light'} size={'lg'}>
									<FontAwesomeIcon className="mr-3" icon={faUser} />
									{firstname}
								</Button>
							</div>
							<LogoutButton />
						</div>
					</div>
				</div>
				<div className="Navbar-space"></div>
			</Fragment>
		);
	}
}

export default withAuthUser(Navbar);
