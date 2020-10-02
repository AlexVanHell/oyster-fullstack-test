import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { AuthService } from '../../service/auth.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
	constructor(private authService: AuthService) {
		super();
	}

	public async validate(username: string, password: string) {
		const user = await this.authService.validateUser(username, password);

		/* if (!user.active) {
			throw new ApiException(API_ERRORS.module.USER.NOT_VERIFIED);
		} */

		return user;
	}
}
