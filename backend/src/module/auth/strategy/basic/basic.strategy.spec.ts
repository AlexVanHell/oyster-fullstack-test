import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../service/auth.service';
import { BasicStrategy } from './basic.strategy';

class AuthServiceMock {
	public validateUser(username: string, password: string) {
		return { username, password };
	}
}

describe('BasicStrategy', () => {
	let service: BasicStrategy;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BasicStrategy,
				{
					provide: AuthService,
					useClass: AuthServiceMock,
				},
			],
		}).compile();

		service = module.get<BasicStrategy>(BasicStrategy);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('.validate()', () => {
		it('should validate user', async () => {
			const user = {
				username: 'foo',
				password: 'foo',
			};

			const result = await service.validate(user.username, user.password);
			expect(result).toBeTruthy();
		});
	});
});
