import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import {
	ApiBasicAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ApiExceptionResponse } from '../../../common/api-exception/api-exception-response.decorator';
import { API_ERRORS } from '../../../constant/api-errors.constant';
import { UserDto } from '../../user/dto/user.dto';
import { AuthUser } from '../decorator/auth-user.decorator';
import { AuthDto } from '../dto/auth.dto';
import { BasicAuthGuard } from '../guard/basic/basic-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private service: AuthService) {}

	@UseGuards(BasicAuthGuard)
	@Get('/login')
	@ApiOperation({
		summary: 'Authenticate user by its credentials',
	})
	@ApiBasicAuth()
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User information and its token',
		type: AuthDto,
	})
	@ApiExceptionResponse(API_ERRORS.module.USER.WRONG_CREDENTIALS)
	public async login(@AuthUser() user: UserDto) {
		return this.service.login(user);
	}
}
