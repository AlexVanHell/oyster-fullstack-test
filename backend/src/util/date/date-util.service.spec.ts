import { Test, TestingModule } from '@nestjs/testing';
import { DateUtilService } from './date-util.service';

describe('DateUtilService', () => {
	let service: DateUtilService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DateUtilService],
		}).compile();

		service = module.get<DateUtilService>(DateUtilService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should generate expiration date', () => {
		const result = service.getExpirationDate('1d');

		expect(result).toBeTruthy();
		expect(result).toBeInstanceOf(Date);
	});
});
