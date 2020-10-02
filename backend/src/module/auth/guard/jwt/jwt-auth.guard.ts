import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiException } from '../../../../common/api-exception/api-exception';
import { API_ERRORS } from '../../../../constant/api-errors.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
	constructor(private readonly reflector: Reflector) {
		super();
	}

	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	public handleRequest(err: any, user: any, info: any) {
		if (err instanceof UnauthorizedException) {
			throw new ApiException(API_ERRORS.TOKEN.INVALID);
		} else if (err) {
			throw err;
		}

		if (info instanceof Error) {
			if (info.message === 'No auth token') {
				throw new ApiException(API_ERRORS.TOKEN.NOT_PROVIDED);
			}

			throw info;
		}

		return user;
	}
}
