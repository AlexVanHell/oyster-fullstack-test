import React, { Component, Fragment } from 'react';

export class PublicLayout extends Component {
	static propTypes = {};

	render() {
		const { children } = this.props;

		return <Fragment>{children}</Fragment>;
	}
}

export default PublicLayout;
