import React, { ComponentType, FunctionComponent } from 'react';
import { AuthUserContext } from '../common/context/auth-user.context';
import { UserModel } from '../common/model/user.model';

export interface AuthUserWrappedProps {
	authUser: UserModel;
}

type WithAuthUserProps<P> = Omit<P, keyof AuthUserWrappedProps> & {};

export const withAuthUser = <P extends AuthUserWrappedProps>(
	WrappedComponent: ComponentType<any>,
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
