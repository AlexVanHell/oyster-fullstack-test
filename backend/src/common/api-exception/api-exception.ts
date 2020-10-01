import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { API_ERRORS } from '../../constant/api-errors.constant';
import { ApiError } from './api-error.interface';

/**
 * @template E Errors type
 * @template T Extra data type
 */
export class ApiException<E = any, T = any> extends Error {
	@ApiProperty({
		description: 'Http status code',
		example: HttpStatus.INTERNAL_SERVER_ERROR,
	})
	statusCode: HttpStatus;

	@ApiProperty({
		description: 'Error code. Each code describe an specific case to developer',
		example: API_ERRORS.INTERNAL_SERVER_ERROR.code,
	})
	code: string;

	@ApiProperty({
		description: 'Error message',
	})
	message: string;

	@ApiProperty({
		description: 'Error timestamp',
		example: new Date().toISOString(),
	})
	timestamp: string;

	@ApiProperty({
		description: 'Request URL path',
	})
	path: string;

	@ApiProperty({
		description: 'Errors description',
	})
	errors?: E;

	@ApiProperty({
		description: 'Some data to use in specific cases',
	})
	data?: T;

	/** This is used only for development porpouses */
	original?: any;

	/**
	 *
	 * @param payload Error payload
	 * @param errors Description errors
	 * @param message Custom message. Override error payload message
	 * @param data Aditional data
	 */
	constructor(payload: ApiError, errors?: E, message?: string, data?: T) {
		super(message || payload.message);
		this.statusCode = payload.statusCode;
		this.code = payload.code;
		this.errors = errors;
		this.data = data;
	}
}
