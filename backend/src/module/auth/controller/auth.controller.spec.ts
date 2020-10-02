import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from '../../user/dto/user.dto';
import { AuthService } from '../service/auth.service';
import { AuthController } from './auth.controller';

class AuthServiceMock {
	public login(data: any) {
		return data;
	}
}

describe('Auth Controller', () => {
	let controller: AuthController;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useClass: AuthServiceMock,
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('.login()', () => {
		it('should make login', async () => {
			const testUser: UserDto = {
				_id: '1',
				username: 'foo',
				email: 'foo@mail.com',
				firstname: 'Foo',
				lastname: 'Foo',
			};

			const result = await controller.login(testUser);
			expect(result).toBeTruthy();
		});
	});
});
