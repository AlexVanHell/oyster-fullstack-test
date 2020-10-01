import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModuleTest } from '../../../database/database.module.test';
import { USER_MOCK } from '../../../mock/user.mock';
import { SharedModule } from '../../../shared/shared.module';
import { UserDocument, UserSchema } from '../user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService],
			imports: [
				SharedModule,
				DatabaseModuleTest({
					connectionName: (new Date().getTime() * Math.random()).toString(16), // <-- This is to have a "unique" name for the connection,
				}),
				MongooseModule.forFeature([
					{ name: UserDocument.name, schema: UserSchema },
				]),
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('.create()', () => {
		it('should save the user and add the createdAt and savedAt fields', async () => {
			const testUser = USER_MOCK[0];
			const result = await service.create(testUser);

			expect(typeof result).toBe('object');
			expect(result._id).toBeTruthy();
			expect(result.createdAt).toBeInstanceOf(Date);
			expect(result.updatedAt).toBeInstanceOf(Date);
			expect(typeof result.active).toBe('boolean');
		});

		it('should throw error if user username or email are already in use', async () => {
			const testUser = USER_MOCK[0];
			await service.create(testUser);

			let result: UserDocument;
			let error: any;

			try {
				result = await service.create(testUser);
			} catch (err) {
				error = err;
			}

			expect(result).toBeFalsy();
			expect(error).toBeTruthy();
		});
	});

	describe('.getByUsernameOrEmail()', () => {
		beforeEach(async () => {
			for (const user of USER_MOCK) {
				await service.create(user);
			}
		});

		it('should return null if username not exists', async () => {
			const result = await service.getByUsernameOrEmail('none');
			expect(result).toBe(null);
		});

		it('should return null if email not exists', async () => {
			const result = await service.getByUsernameOrEmail('none@mail.com');
			expect(result).toBe(null);
		});

		it('should return an object if username exists', async () => {
			const result = await service.getByUsernameOrEmail(USER_MOCK[0].username);
			expect(typeof result).toBe('object');
			expect(result).toBeTruthy();
		});

		it('should return an object if email exists', async () => {
			const result = await service.getByUsernameOrEmail(USER_MOCK[1].email);
			expect(typeof result).toBe('object');
			expect(result).toBeTruthy();
		});
	});
});
