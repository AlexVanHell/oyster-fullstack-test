import {
	faEye,
	faEyeSlash,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment, ReactNode } from 'react';

export interface PasswordPreviewInjectedProps {
	type: 'text' | 'password';
	icon: JSX.Element;
	toggle: () => void;
}

export interface PasswordPreviewProps {
	children: (props: PasswordPreviewInjectedProps) => ReactNode;
}

export interface PasswordPreviewState {
	type: 'text' | 'password';
	icon: IconDefinition;
}

export default class PasswordPreview extends Component<
	PasswordPreviewProps,
	PasswordPreviewState
> {
	static propTypes = {};

	constructor(props: PasswordPreviewProps) {
		super(props);
		this.state = {
			icon: faEye,
			type: 'password',
		};
	}

	private handleToggle() {
		this.setState(
			this.state.type === 'password'
				? {
						icon: faEyeSlash,
						type: 'text',
				  }
				: {
						icon: faEye,
						type: 'password',
				  },
		);
	}

	render() {
		const { icon, type } = this.state;
		const { children } = this.props;

		return (
			<Fragment>
				{children({
					icon: <FontAwesomeIcon icon={icon} />,
					type,
					toggle: () => this.handleToggle(),
				})}
			</Fragment>
		);
	}
}
