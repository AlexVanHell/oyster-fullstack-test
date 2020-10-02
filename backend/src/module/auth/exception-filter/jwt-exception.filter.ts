import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ApiError } from '../../../common/api-exception/api-error.interface';
import { ApiException } from '../../../common/api-exception/api-exception';
import { BaseExceptionFilter } from '../../../common/exception-filter/base-exception-filter';
import { API_ERRORS } from '../../../constant/api-errors.constant';

@Catch(TokenExpiredError, JsonWebTokenError)
export class JwtExceptionFilter extends BaseExceptionFilter
	implements ExceptionFilter {
	public catch(
		exception: TokenExpiredError | JsonWebTokenError,
		host: ArgumentsHost,
	) {
		let apiError: ApiError;

		if (exception instanceof TokenExpiredError) {
			apiError = API_ERRORS.TOKEN.EXPIRED;
		} else if (exception instanceof JsonWebTokenError) {
			apiError = API_ERRORS.TOKEN.INVALID;
		}

		const resultException = new ApiException(apiError);
		resultException.original = exception;

		this.throwApiException(resultException, host, 'JwtExceptionFilter');
	}
}
