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
			apiBase: process.env['REACT_APP_API_BASE'] || '',
			sessionKey: process.env['REACT_APP_SESSION_KEY'] || 'session',
			tokenKey: process.env['REACT_APP_TOKEN_KEY'] || 'token',
		};
	}
}
