import { HttpStatus } from '@nestjs/common';

export interface ApiError {
	/**
	 * Error unique code
	 */
	code: string;
	/**
	 * Error description. Description for developers
	 */
	description: string;
	/**
	 * Message to send to client
	 */
	message?: string;
	/**
	 * Http status code
	 */
	statusCode: HttpStatus;
}
