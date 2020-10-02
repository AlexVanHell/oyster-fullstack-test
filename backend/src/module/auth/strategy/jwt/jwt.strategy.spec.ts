import { Test, TestingModule } from '@nestjs/testing';
import { IncomingHttpHeaders } from 'http';
import { JwtCustomModule } from '../../../../common/jwt/jwt-custom.module';
import { ConfigJwtOptionsInterface } from '../../../../config/interface/config-jwt-options.interface';
import { AuthRequest } from '../../interface/auth-request.interface';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
	let service: JwtStrategy;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				JwtStrategy,
				{
					provide: 'authJwtOptions',
					useValue: {
						expiresIn: '1d',
						secret: 'mySecret',
					} as ConfigJwtOptionsInterface,
				},
			],
			imports: [JwtCustomModule.forRoot()],
		}).compile();

		service = module.get<JwtStrategy>(JwtStrategy);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('.validate()', () => {
		it('should validate data', () => {
			const headers: IncomingHttpHeaders = {
				authorization: 'Bearer testToken',
			};

			const result = service.validate(
				{
					headers,
					get: (name: string) => {
						return headers[name.toLowerCase()];
					},
				} as AuthRequest,
				{
					_id: '1',
					username: 'Foo',
					email: 'user@user.com',
					firstname: 'Foo',
					lastname: 'Foo',
				},
			);

			expect(result).toBeDefined();
			expect(result).toBeTruthy();
			expect(typeof result).toBe('object');
			expect(typeof result.token).toBe('string');
		});
	});
});
