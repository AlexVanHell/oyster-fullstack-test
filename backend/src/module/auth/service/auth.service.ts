import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiException } from '../../../common/api-exception/api-exception';
import { ConfigJwtOptionsInterface } from '../../../config/interface/config-jwt-options.interface';
import { API_ERRORS } from '../../../constant/api-errors.constant';
import { DateUtilService } from '../../../util/date/date-util.service';
import { PasswordUtilService } from '../../../util/password/password.util.service';
import { UserService } from '../../user/service/user.service';
import { UserDocumentInterface } from '../../user/user.schema';
import { AuthUserDto } from '../dto/auth-user.dto';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly passwordUtil: PasswordUtilService,
		private readonly dateUtil: DateUtilService,
		@Inject('authJwtOptions')
		private readonly jwtOptions: ConfigJwtOptionsInterface,
	) {}

	/**
	 * Validate user
	 * @param username Username or Email
	 * @param password Password
	 * @param strictSearch Indicate wheter the user should be searched by only one specific field
	 */
	public async validateUser(username: string, password: string) {
		const user = await this.userService.getByUsernameOrEmail(username);

		if (user) {
			const validPassword = await this.passwordUtil.compareString(
				password,
				user.password,
			);

			delete user.password;

			if (validPassword) {
				return user;
			}
		}

		throw new ApiException(API_ERRORS.module.USER.WRONG_CREDENTIALS);
	}

	/**
	 * Create payload and sign object with jwt
	 * @param user User object
	 */
	public async login(user: Partial<UserDocumentInterface>) {
		const payload: AuthUserDto = {
			_id: user._id,
			username: user.username,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
			active: user.active,
			token: '',
		};

		const accessToken = await this.jwtService.signAsync(payload);

		const result = new AuthDto();
		result.user = payload;
		result.token = {
			expiresAt: this.dateUtil.getExpirationDate(this.jwtOptions.expiresIn),
			accessToken,
		};

		return result;
	}
}
