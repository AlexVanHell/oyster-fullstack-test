import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
	NotFoundException,
} from '@nestjs/common';
import { API_ERRORS } from '../../constant/api-errors.constant';
import { ApiException } from '../api-exception/api-exception';
import { BaseExceptionFilter } from './base-exception-filter';

interface CustomError {
	name: string;
	trace: string | Record<string, unknown>;
}

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter
	implements ExceptionFilter {
	public catch(exception: unknown, host: ArgumentsHost) {
		let apiError = API_ERRORS.INTERNAL_SERVER_ERROR;
		let error: CustomError | string | string[] = null;

		if (exception instanceof BadRequestException) {
			apiError = API_ERRORS.CLIENT.BAD_REQUEST;
			error = (exception.getResponse() as { message: string }).message;
		} else if (exception instanceof NotFoundException) {
			apiError = API_ERRORS.CLIENT.RESOURCE_NOT_FOUND;
			error = (exception.getResponse() as { message: string }).message;
		} else if (exception instanceof Error) {
			error = {
				name: exception.name,
				trace: exception.message,
			};
		} else if (typeof exception === 'object') {
			error = {
				name: 'N/A',
				trace: exception as Record<string, unknown>,
			};
		} else if (typeof exception === 'string') {
			error = {
				name: 'N/A',
				trace: exception,
			};
		}

		const resultException = new ApiException(apiError, error);
		resultException.original = exception;

		this.throwApiException(resultException, host, 'AllExceptionFilter');
	}
}
