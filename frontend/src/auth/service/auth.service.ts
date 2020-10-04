import { UserModel } from '../../common/model/user.model';
import { ConfigService } from '../../config/config.service';

export class AuthService {
	private sessionKey = '';
	private tokenKey = '';

	constructor(private readonly configService: ConfigService) {
		this.setKeys();
	}

	/**
	 * Wheter a user is logged in
	 */
	public isAuthenticated() {
		return localStorage.getItem(this.sessionKey) !== null;
	}

	/**
	 * Authenticate user
	 * @param user User's data
	 * @param token User's access token
	 */
	public async authenticate(user: UserModel, token: string) {
		const resUser = this.setUser(user);
		const resToken = this.setToken(token);
		return { user: resUser, token: resToken };
	}

	/**
	 * Get authorization token
	 */
	public getToken() {
		if (!this.isAuthenticated) {
			return null;
		}

		return localStorage.getItem(this.tokenKey) || undefined;
	}

	/**
	 * Set authorization token
	 * @param token Token to save
	 */
	public setToken(token: string) {
		localStorage.setItem(this.tokenKey, token);
		return token;
	}

	/**
	 * Get logged user
	 */
	public getUser() {
		const str = localStorage.getItem(this.sessionKey);
		return str ? (JSON.parse(str) as UserModel) : undefined;
	}

	/**
	 * Set user
	 * @param user User's data to save
	 */
	public setUser(user: UserModel) {
		localStorage.setItem(this.sessionKey, JSON.stringify(user));
		return user;
	}

	/**
	 * Update properties of user
	 * @param user New user data to replace
	 */
	public updateUser(user: Partial<UserModel>) {
		if (!this.isAuthenticated) {
			return null;
		}

		const currentUser = this.getUser();
		const userUpdated = { ...currentUser, ...user } as UserModel;

		localStorage.setItem(this.sessionKey, JSON.stringify(userUpdated));
		return userUpdated;
	}

	/**
	 * Remove user authentication
	 */
	public async deleteUser() {
		localStorage.removeItem(this.sessionKey);
		localStorage.removeItem(this.tokenKey);
	}

	public buildAuthHeader() {
		// return authorization header with jwt token
		const token = this.getToken();

		if (token) {
			return { Authorization: `Bearer ${token}` };
		} else {
			return {};
		}
	}

	private setKeys() {
		this.sessionKey = this.configService.get('sessionKey');
		this.tokenKey = this.configService.get('tokenKey');
	}
}
