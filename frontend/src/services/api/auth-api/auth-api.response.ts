import { UserModel } from '../../../common/model/user.model';

interface AuthApiLoginResponseToken {
	accessToken: string;
	expiresIn: string;
}

export interface AuthApiLoginResponse {
	user: UserModel;
	token: AuthApiLoginResponseToken;
}
