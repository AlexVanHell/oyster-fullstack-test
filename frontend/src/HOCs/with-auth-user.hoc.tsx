import React, { ComponentType, FunctionComponent } from 'react';
import {
	AuthUserContext,
	AuthUserContextInterface,
} from '../common/context/auth-user.context';

export interface AuthUserWrappedProps {
	authUser: AuthUserContextInterface;
}

type WithAuthUserProps<P> = Omit<P, keyof AuthUserWrappedProps>;

export const withAuthUser = <
	P extends AuthUserWrappedProps = AuthUserWrappedProps
>(
	WrappedComponent: ComponentType<P>,
): FunctionComponent<WithAuthUserProps<P>> =>
	function WrappedWithAuthUser(props: WithAuthUserProps<P>) {
		return (
			<AuthUserContext.Consumer>
				{(authUser) => (
					<WrappedComponent {...(props as P)} authUser={authUser} />
				)}
			</AuthUserContext.Consumer>
		);
	};
