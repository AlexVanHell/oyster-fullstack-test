import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, FieldAttributes } from 'formik';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import {
	FormattedMessage,
	injectIntl,
	WrappedComponentProps,
} from 'react-intl';

export interface LoginFormFieldProps {
	className?: string;
	name: string;
	icon: IconDefinition;
	type: string;
	validate: (value: string) => string;
}

export class LoginFormField extends Component<
	LoginFormFieldProps & WrappedComponentProps
> {
	static propTypes = {
		className: PropTypes.string,
		name: PropTypes.string.isRequired,
		icon: PropTypes.any.isRequired,
		type: PropTypes.string.isRequired,
		validate: PropTypes.func.isRequired,
	};

	render() {
		const {
			className,
			children,
			intl,
			name,
			icon,
			type,
			validate,
		} = this.props;

		const iconAddonId = `${name}-addon`;
		const placeholder = intl.formatMessage({
			id: `login.${name}`,
		});

		return (
			<Fragment>
				<Field name={name} validate={(value: string) => validate(value)}>
					{({
						field,
						form: { errors },
						meta: { touched },
					}: FieldAttributes<any>) => (
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text id={iconAddonId}>
									<FontAwesomeIcon icon={icon} />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								{...field}
								className={className || ''}
								placeholder={placeholder}
								aria-label={placeholder}
								aria-describedby={iconAddonId}
								type={type}
								isInvalid={touched && !!errors[name]}
							/>
							{children}
							{touched && errors[name] && (
								<Form.Control.Feedback type="invalid">
									<FormattedMessage id={errors[name]} />
								</Form.Control.Feedback>
							)}
						</InputGroup>
					)}
				</Field>
			</Fragment>
		);
	}
}

export default injectIntl(LoginFormField);
