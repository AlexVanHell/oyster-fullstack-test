import { I18n } from '@lingui/react';
import React, { ComponentType, FunctionComponent } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export interface WithLoadingProps {
	loading: boolean;
}

export const withLoading = <P extends Record<string, any>>(
	WrappedComponent: ComponentType<P>,
): FunctionComponent<P & WithLoadingProps> =>
	function WrappedWithLoading({ loading, ...props }: WithLoadingProps) {
		return loading ? (
			<Spinner animation="border" role="status">
				<I18n>
					{({ i18n }) => (
						<span className="sr-only">{i18n._('loading', {})}</span>
					)}
				</I18n>
			</Spinner>
		) : (
			<WrappedComponent {...(props as P)} />
		);
	};
