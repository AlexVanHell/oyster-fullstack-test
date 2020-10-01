import { HttpStatus } from '@nestjs/common';
import { ApiError } from '../common/api-exception/api-error.interface';
import { API_USER_ERRORS } from '../module/user/user.exception';
import { API_ERRORS_PREFIX } from './api-errors-prefix.constant';

export const API_ERRORS = {
	// Main errors
	INTERNAL_SERVER_ERROR: {
		code: `${API_ERRORS_PREFIX.GENERAL}00`,
		statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
		message: 'There was an internal server error.',
		description: 'Unexpected error ocurred with the server.',
	} as ApiError,
	DATABASE: {
		QUERY_FAILED: {
			code: `${API_ERRORS_PREFIX.GENERAL}01`,
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: 'There was an internal server error.',
			description:
				'Unexpected error ocurred with the server with database (connection, query, etc.).',
		} as ApiError,
		ENTITY_NOT_FOUND: {
			code: `${API_ERRORS_PREFIX.GENERAL}02`,
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: 'There was an internal server error.',
			description:
				'Unexpected error ocurred with the server with database (connection, query, etc.).',
		} as ApiError,
		VALIDATION_FAIL: {
			code: `${API_ERRORS_PREFIX.GENERAL}03`,
			statusCode: HttpStatus.BAD_REQUEST,
			message: 'There was an internal server error.',
			description: 'Database data validation error occurred.',
		} as ApiError,
	},

	// Token errors. Unauthorized
	TOKEN: {
		NOT_PROVIDED: {
			code: `${API_ERRORS_PREFIX.TOKEN}00`,
			statusCode: HttpStatus.BAD_REQUEST,
			message: 'Authorization token not provided.',
			description: 'Client did not provide an authorization token.',
		} as ApiError,
		INVALID_SCHEME: {
			code: `${API_ERRORS_PREFIX.TOKEN}01`,
			statusCode: HttpStatus.BAD_REQUEST,
			message: 'Authorization token has invalid scheme.',
			description:
				'Client did not provide an authorization token with Bearer scheme.',
		} as ApiError,
		INVALID: {
			code: `${API_ERRORS_PREFIX.TOKEN}02`,
			statusCode: HttpStatus.UNAUTHORIZED,
			message: 'Invalid authorization token.',
			description: 'Client sent invalid token.',
		} as ApiError,
		EXPIRED: {
			code: `${API_ERRORS_PREFIX.TOKEN}03`,
			statusCode: HttpStatus.UNAUTHORIZED,
			message: 'The session has expired.',
			description: 'Client sent expired token.',
		} as ApiError,
	},

	// Client errors
	CLIENT: {
		BAD_REQUEST: {
			code: `${API_ERRORS_PREFIX.CLIENT}00`,
			statusCode: HttpStatus.BAD_REQUEST,
			message: 'The request contains invalid syntax.',
			description:
				'Client sent a bad request (Invalid fields values, missing fields, etc.).',
		} as ApiError,
		RESOURCE_NOT_FOUND: {
			code: `${API_ERRORS_PREFIX.CLIENT}01`,
			statusCode: HttpStatus.NOT_FOUND,
			message: 'Resource not found.',
			description:
				'A resource was not found. You must implement a specific error for each resource.',
		} as ApiError,
		RESOURCE_ALREADY_EXISTS: {
			code: `${API_ERRORS_PREFIX.CLIENT}02`,
			statusCode: HttpStatus.CONFLICT,
			message: 'Resource already exists.',
			description: 'A resource with specific parameeters already exists.',
		} as ApiError,
	},

	// Module errors. Keep this at the bottom of this file
	module: {
		USER: API_USER_ERRORS,
	},
};
