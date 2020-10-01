import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { ApiError } from './api-error.interface';
import { ApiException } from './api-exception';

interface InitialValueInterface {
	array: ApiResponseOptions[];
	map: Map<HttpStatus, ApiResponseOptions>;
}

export const ApiExceptionResponse = (...payloads: ApiError[]) => {
	const statusGroups = payloads.reduce(
		(result, payload) => {
			if (!!payload) {
				if (!result.map.has(payload.statusCode)) {
					const obj = {
						status: payload.statusCode,
						description: '',
						type: ApiException,
					};

					result.map.set(payload.statusCode, obj);
					result.array.push(obj);
				}

				result.map.get(
					payload.statusCode,
				).description += `[code: "${payload.code}" | ${payload.description}]<br />`;
			}
			return result;
		},
		{ array: [], map: new Map() } as InitialValueInterface,
	);

	return applyDecorators(...statusGroups.array.map(item => ApiResponse(item)));
};
