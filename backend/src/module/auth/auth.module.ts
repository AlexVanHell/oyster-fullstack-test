import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtCustomModule } from '../../common/jwt/jwt-custom.module';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { BasicStrategy } from './strategy/basic/basic.strategy';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';

@Module({
	imports: [
		SharedModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtCustomModule.forRoot(),
		UserModule,
	],
	controllers: [AuthController],
	providers: [AuthService, BasicStrategy, JwtStrategy],
})
export class AuthModule {}
