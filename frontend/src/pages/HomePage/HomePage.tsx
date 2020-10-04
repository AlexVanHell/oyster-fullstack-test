import React, { Component } from 'react';
import WelcomeCard from '../../components/WelcomeCard/WelcomeCard';
import './HomePage.scss';

export class HomePage extends Component {
	static propTypes = {};

	render() {
		return (
			<div className="HomePage-container">
				<WelcomeCard />
			</div>
		);
	}
}

export default HomePage;
