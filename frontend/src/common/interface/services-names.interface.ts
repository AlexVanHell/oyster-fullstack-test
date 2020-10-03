import { AuthService } from '../../auth/service/auth.service';
import { ConfigService } from '../../config/config.service';
import { AuthApiService } from '../../services/api/auth-api/auth-api.service';

export interface ServicesNamesInterface {
	configService: ConfigService;
	authService: AuthService;
	authApiService: AuthApiService;
}
