import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiExceptionResponse } from '../../../common/api-exception/api-exception-response.decorator';
import { API_ERRORS } from '../../../constant/api-errors.constant';
import { JwtAuthGuard } from '../guard/jwt/jwt-auth.guard';

export const Auth = () =>
	applyDecorators(
		UseGuards(JwtAuthGuard),
		ApiBearerAuth(),
		ApiExceptionResponse(
			API_ERRORS.TOKEN.NOT_PROVIDED,
			API_ERRORS.TOKEN.INVALID,
			API_ERRORS.TOKEN.EXPIRED,
		),
	);
