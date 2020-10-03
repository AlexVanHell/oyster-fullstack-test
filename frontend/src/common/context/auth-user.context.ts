import { createContext } from 'react';
import { UserModel } from '../model/user.model';

export const AuthUserContext = createContext<UserModel | undefined>(undefined);
