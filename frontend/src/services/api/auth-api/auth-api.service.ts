import Axios, { AxiosError } from 'axios';
import { ConfigService } from '../../../config/config.service';
import { AuthApiLoginResponse } from './auth-api.response';

export class AuthApiService {
	private readonly endpoint = '/auth';

	constructor(private readonly configService: ConfigService) {}

	/**
	 * Call /auth/login
	 * @param username
	 * @param password
	 */
	public async login(username: string, password: string) {
		const fullEndpoint = `${this.configService.get('apiBase')}${
			this.endpoint
		}/login`;
		const req = `${username}:${password}`;
		const encoded = window.btoa(req);

		const headers = {
			Authorization: `Basic ${encoded}`,
		};

		try {
			const response = await Axios.get<AuthApiLoginResponse>(fullEndpoint, {
				headers,
			});

			return response.data;
		} catch (err) {
			if (err.response) {
				throw (err as AxiosError).response;
			}

			throw { data: { code: 'CON00' } };
		}
	}
}
