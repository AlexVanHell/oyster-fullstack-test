import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ApiException } from '../../../../common/api-exception/api-exception';
import { API_ERRORS } from '../../../../constant/api-errors.constant';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') implements CanActivate {
	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const authorization = request.get('Authorization');

		if (!/^Basic /.test(authorization)) {
			throw new ApiException(API_ERRORS.module.USER.NO_BASIC_AUTH);
		}

		return super.canActivate(context);
	}

	public handleRequest(err: any, user: any) {
		if (err instanceof UnauthorizedException) {
			throw new ApiException(API_ERRORS.module.USER.NO_BASIC_AUTH);
		} else if (err) {
			throw err;
		}

		return user;
	}
}
