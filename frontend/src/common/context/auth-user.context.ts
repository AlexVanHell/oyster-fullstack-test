import { createContext } from 'react';
import { UserModel } from '../model/user.model';

export interface AuthUserContextInterface {
	value: UserModel;
	authenticate: (user: UserModel, token: string) => Promise<void>;
}

export const AuthUserContext = createContext<AuthUserContextInterface>(
	{} as AuthUserContextInterface,
);
