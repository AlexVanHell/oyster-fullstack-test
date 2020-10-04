import React, { ComponentType, FunctionComponent } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { IntlContext } from 'react-intl';

export interface WithLoadingProps {
	loading: boolean;
}

export const withLoading = <P extends Record<string, any>>(
	WrappedComponent: ComponentType<P>,
): FunctionComponent<P & WithLoadingProps> =>
	function WrappedWithLoading({ loading, ...props }: WithLoadingProps) {
		return loading ? (
			<Spinner animation="border" role="status">
				<IntlContext.Consumer>
					{({ formatMessage }) => (
						<span className="sr-only">{formatMessage({ id: 'loading' })}</span>
					)}
				</IntlContext.Consumer>
			</Spinner>
		) : (
			<WrappedComponent {...(props as P)} />
		);
	};
