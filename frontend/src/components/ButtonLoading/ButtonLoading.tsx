import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FormattedMessage } from 'react-intl';

interface ButtonLoadingIconProp {
	position: 'left' | 'right';
	value: IconDefinition;
}
export interface ButtonLoadingProps extends ButtonProps {
	icon?: ButtonLoadingIconProp;
	textId: string;
	loading: boolean;
}

export class ButtonLoading extends Component<ButtonLoadingProps> {
	static propTypes = {
		icon: PropTypes.shape({
			position: PropTypes.oneOf(['left', 'right']).isRequired,
			value: PropTypes.any.isRequired,
		}),
		textId: PropTypes.string.isRequired,
		loading: PropTypes.bool.isRequired,
	};

	private buildIcon(icon: ButtonLoadingIconProp) {
		return (
			<FontAwesomeIcon
				className={icon.position === 'left' ? 'mr-3' : 'ml-3'}
				icon={icon.value}
			/>
		);
	}

	render() {
		const { icon, textId, loading, ...buttonProps } = this.props;

		let buttonContent: JSX.Element;

		if (loading) {
			buttonContent = (
				<Fragment>
					<Spinner
						className="mr-3"
						as="span"
						animation={'border'}
						size="sm"
						role="status"
						aria-hidden="true"
					/>
					<FormattedMessage description="Button text" id={'loading'} />
				</Fragment>
			);
		} else {
			buttonContent = (
				<Fragment>
					{icon && icon.position === 'left' && this.buildIcon(icon)}
					<FormattedMessage description="Button text" id={textId} />
					{icon && icon.position === 'right' && this.buildIcon(icon)}
				</Fragment>
			);
		}

		return <Button {...buttonProps}>{buttonContent}</Button>;
	}
}

export default ButtonLoading;
