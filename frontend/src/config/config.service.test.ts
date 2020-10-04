import { ConfigService } from './config.service';

describe('ConfigService', () => {
	let service: ConfigService;

	beforeAll(() => {
		service = new ConfigService();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get full config object if no parameter sent', () => {
		const result = service.get();

		expect(result).toBeTruthy();
		expect(typeof result).toBe('object');
		expect(typeof result.apiBase).toBe('string');
	});

	it('should get property if parameter is sent', () => {
		const result = service.get('apiBase');
		const result2 = service.get('sessionKey');

		expect(result).toBeDefined();
		expect(typeof result).toBe('string');

		expect(result2).toBeDefined();
		expect(typeof result2).toBe('string');
	});
});
