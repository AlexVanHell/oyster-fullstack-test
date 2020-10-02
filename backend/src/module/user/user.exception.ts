import { HttpStatus } from '@nestjs/common';
import { ApiError } from '../../common/api-exception/api-error.interface';
import { API_ERRORS_PREFIX } from '../../constant/api-errors-prefix.constant';

export const API_USER_ERRORS = {
	NOT_FOUND: {
		code: `${API_ERRORS_PREFIX.USER}00`,
		statusCode: HttpStatus.NOT_FOUND,
		message: 'User not found.',
		description: 'The user does not exist or it has been already deleted.',
	} as ApiError,
	USERNAME_EXISTS: {
		code: `${API_ERRORS_PREFIX.USER}01`,
		statusCode: HttpStatus.CONFLICT,
		message: 'The username is already taken by another person.',
		description: 'There is already an user associated to the username.',
	} as ApiError,
	EMAIL_EXISTS: {
		code: `${API_ERRORS_PREFIX.USER}02`,
		statusCode: HttpStatus.CONFLICT,
		message: 'The email is already taken by another person.',
		description: 'There is already an user associated to the email.',
	} as ApiError,
	WRONG_CREDENTIALS: {
		code: `${API_ERRORS_PREFIX.USER}03`,
		statusCode: HttpStatus.UNAUTHORIZED,
		message: 'Incorrect username and/or password.',
		description:
			'There is no user in the database with the provided credentials.',
	} as ApiError,
	WRONG_PASSWORD: {
		code: `${API_ERRORS_PREFIX.USER}04`,
		statusCode: HttpStatus.UNAUTHORIZED,
		message: 'Incorrect old password.',
		description: 'The provided old password is incorrect.',
	} as ApiError,
	NO_BASIC_AUTH: {
		code: `${API_ERRORS_PREFIX.USER}06`,
		statusCode: HttpStatus.UNAUTHORIZED,
		message: 'No authorization provided.',
		description: 'No basic auth provided.',
	} as ApiError,
};
