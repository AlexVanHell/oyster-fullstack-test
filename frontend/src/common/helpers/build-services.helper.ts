import { AuthService } from '../../auth/service/auth.service';
import { ConfigService } from '../../config/config.service';
import { AuthApiService } from '../../services/api/auth-api/auth-api.service';
import { ServicesNamesInterface } from '../interface/services-names.interface';

export const buildServices = (): ServicesNamesInterface => {
	const configService = new ConfigService();
	const authService = new AuthService(configService);
	const authApiService = new AuthApiService(configService);

	return {
		configService,
		authService,
		authApiService,
	};
};
