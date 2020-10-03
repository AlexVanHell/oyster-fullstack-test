import { UserModel } from '../../common/model/user.model';
import { ConfigService } from '../../config/config.service';
import { AuthService } from './auth.service';

const fakeEnv = { sessionKey: 'fake-value', tokenKey: 'fake-token-value' };

class ConfigServiceMock {
	get(key?: keyof { sessionKey: string; tokenKey: string }) {
		return key ? fakeEnv[key] : fakeEnv;
	}
}

describe('AuthService', () => {
	let service: AuthService;
	const testUser: UserModel = {
		_id: '1',
		username: 'foo',
		email: 'foo',
		firstname: 'Foo',
		lastname: 'Foo',
	};
	const testToken = 'fakeTestingToken';

	beforeAll(() => {
		service = new AuthService(new ConfigServiceMock() as ConfigService);
	});

	beforeEach(() => {
		localStorage.removeItem(fakeEnv.sessionKey),
			localStorage.removeItem(fakeEnv.tokenKey);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should set user', () => {
		service.setUser(testUser);

		const item = localStorage.getItem(fakeEnv.sessionKey);

		expect(item).toBeTruthy();
		expect(typeof item).toBe('string');
		expect(typeof JSON.parse(item as any)).toBe('object');
	});

	it('should set token', () => {
		service.setToken(testToken);

		const item = localStorage.getItem(fakeEnv.tokenKey);

		expect(item).toBeTruthy();
		expect(typeof item).toBe('string');
		expect(item).toBe(testToken);
	});

	it('should get user', () => {
		service.setUser(testUser);

		const user = service.getUser();

		expect(user).toBeDefined();
		expect(user?._id).toBeDefined();
		expect(user?._id).toBe(testUser._id);
	});

	it('should get token', () => {
		service.setToken(testToken);

		const token = service.getToken();

		expect(token).toBeDefined();
		expect(token).toBe(testToken);
	});

	it('should update user', () => {
		service.setUser(testUser);

		const updated = service.updateUser({ firstname: 'FooBar' });

		expect(updated).toBeDefined();
		expect(updated?.username).toBe(testUser.username);
		expect(updated?.firstname).toBe('FooBar');
	});

	it('should remove user and token', () => {
		service.setUser(testUser);
		service.setToken(testToken);

		service.deleteUser();

		expect(service.getUser()).toBe(null);
		expect(service.getToken()).toBe(null);
	});

	it('should build authorization header', () => {
		service.setToken(testToken);

		const headers = service.buildAuthHeader();

		expect(headers).toBeDefined();
		expect(headers.Authorization).toBeDefined();
		expect(typeof headers.Authorization).toBe('string');
		expect(headers.Authorization).toBe(`Bearer ${testToken}`);
	});
});
