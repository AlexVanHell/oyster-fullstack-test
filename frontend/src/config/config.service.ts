import { ConfigInterface } from './interface/config.interface';

export class ConfigService {
	private env: ConfigInterface = {} as ConfigInterface;

	constructor() {
		this.setEnv();
	}

	// For compiler only
	get(): ConfigInterface;
	get<T extends keyof ConfigInterface = any>(key: T): ConfigInterface[T];

	/**
	 * Get a key of configuration. Get all config object if no key is provided
	 * @template T Config key
	 * @param key The key to get
	 */
	get(key?: keyof ConfigInterface) {
		if (!key) {
			return this.env;
		}

		return this.env[key];
	}

	private setEnv() {
		this.env = {
			apiBase: process.env['api_base'] || '',
			sessionKey: process.env['session_key'] || 'session',
			tokenKey: process.env['token_key'] || 'token',
		};
	}
}
