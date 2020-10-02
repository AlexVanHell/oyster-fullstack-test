import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiException } from '../../../common/api-exception/api-exception';
import { USER_MOCK } from '../../../mock/user.mock';
import { DateUtilService } from '../../../util/date/date-util.service';
import { PasswordUtilService } from '../../../util/password/password.util.service';
import { UserService } from '../../user/service/user.service';
import { UserDocument } from '../../user/user.schema';
import { AuthService } from './auth.service';

const testPassword = 'test123';
const users = USER_MOCK.map(u => ({ ...u, password: testPassword }));

class UserServiceMock {
	public getByUsernameOrEmail(value: string) {
		return users.find(u => u.username === value || u.email === value) || null;
	}
}

class JwtServiceMock {
	public async signAsync(payload: any) {
		return JSON.stringify(payload);
	}
}

class PasswordUtilServiceMock {
	public async compareString(value: string, hash: string) {
		return value === hash;
	}
}

class DateUtilServiceMock {
	public getExpirationDate() {
		return new Date();
	}
}

describe('AuthService', () => {
	let service: AuthService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UserService,
					useClass: UserServiceMock,
				},
				{
					provide: JwtService,
					useClass: JwtServiceMock,
				},
				{
					provide: PasswordUtilService,
					useClass: PasswordUtilServiceMock,
				},
				{
					provide: DateUtilService,
					useClass: DateUtilServiceMock,
				},
				{
					provide: 'authJwtOptions',
					useValue: {
						expiresIn: '1d',
					},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('.validateUser()', () => {
		it('should validate user if credetials are correct', async () => {
			const testUser = { ...USER_MOCK[0] };
			const result = await service.validateUser(
				testUser.username,
				testPassword,
			);

			expect(typeof result).toBe('object');
			expect(result).toBeTruthy();
		});

		it('should throw error if username is correct but password is wrong', async () => {
			const testUser = { ...USER_MOCK[0] };

			let error: any;
			let result: UserDocument;

			try {
				result = await service.validateUser(testUser.username, '123Test');
			} catch (err) {
				error = err;
			}

			expect(error).toBeTruthy();
			expect(error).toBeInstanceOf(ApiException);
			expect(result).toBeFalsy();
		});

		it('should throw error if username is wrong but password is correct', async () => {
			let error: any;
			let result: UserDocument;

			try {
				result = await service.validateUser('someUsernameToFail', testPassword);
			} catch (err) {
				error = err;
			}

			expect(error).toBeTruthy();
			expect(error).toBeInstanceOf(ApiException);
			expect(result).toBeFalsy();
		});

		it('should throw error if both username and password are wrong', async () => {
			let error: any;
			let result: UserDocument;

			try {
				result = await service.validateUser(
					'someUsernameToFail',
					'somePasswordToFail',
				);
			} catch (err) {
				error = err;
			}

			expect(error).toBeTruthy();
			expect(error).toBeInstanceOf(ApiException);
			expect(result).toBeFalsy();
		});
	});
});
