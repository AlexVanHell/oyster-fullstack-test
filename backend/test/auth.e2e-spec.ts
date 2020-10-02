import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { API_ERRORS } from '../src/constant/api-errors.constant';
import { DatabaseServiceTest } from '../src/database/database.module.test';
import { DatabaseService } from '../src/database/service/database.service';
import { USER_MOCK } from '../src/mock/user.mock';
import { AuthModule } from '../src/module/auth/auth.module';
import { AuthDto } from '../src/module/auth/dto/auth.dto';
import { UserService } from '../src/module/user/service/user.service';

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	const testPassword = 'test123';
	const testUser = { ...USER_MOCK[0] };
	testUser.password = testPassword;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AuthModule],
		})
			.overrideProvider(DatabaseService)
			.useClass(
				DatabaseServiceTest({
					connectionName: (new Date().getTime() * Math.random()).toString(16),
				}),
			)
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const userService = moduleFixture.get<UserService>(UserService);
		await userService.create({ ...testUser });
	});

	afterAll(async () => {
		await app.close();
	});

	describe('/login (GET)', () => {
		it('Login user if API finds the user', async () => {
			const basicAuth = Buffer.from(
				`${testUser.username}:${testPassword}`,
			).toString('base64');

			const response: { body: AuthDto } = await request(app.getHttpServer())
				.get('/auth/login')
				.set('Authorization', `Basic ${basicAuth}`)
				.expect(200);

			expect(response.body).toBeTruthy();
			expect(response.body.user).toBeTruthy();
			expect(response.body.token).toBeTruthy();
		});

		it('throws error if API cannot find the user', async () => {
			const username = testUser.username;
			const password = 'failingPassword';

			const basicAuth = Buffer.from(`${username}:${password}`).toString(
				'base64',
			);

			const response = await request(app.getHttpServer())
				.get('/auth/login')
				.set('Authorization', `Basic ${basicAuth}`)
				.expect(401);

			expect(response.body.code).toBe(
				API_ERRORS.module.USER.WRONG_CREDENTIALS.code,
			);
		});
	});
});
