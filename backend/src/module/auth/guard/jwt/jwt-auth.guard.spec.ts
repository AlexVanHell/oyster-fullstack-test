import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
	let service: JwtAuthGuard;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [JwtAuthGuard],
		}).compile();

		service = module.get<JwtAuthGuard>(JwtAuthGuard);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
