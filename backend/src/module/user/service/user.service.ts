import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiError } from '../../../common/api-exception/api-error.interface';
import { ApiException } from '../../../common/api-exception/api-exception';
import { SimpleCrudService } from '../../../common/service/simple-crud.service';
import { ConfigService } from '../../../config/service/config.service';
import { API_ERRORS } from '../../../constant/api-errors.constant';
import { PasswordUtilService } from '../../../util/password/password.util.service';
import { UserDocument, UserDocumentInterface } from '../user.schema';

@Injectable()
export class UserService extends SimpleCrudService<UserDocument> {
	constructor(
		@InjectModel(UserDocument.name)
		model: Model<UserDocument>,
		private readonly configService: ConfigService,
		private readonly passwordService: PasswordUtilService,
	) {
		super(model);
	}

	/**
	 * Create new user in database
	 * @param data User's data
	 */
	public async create(data: Partial<UserDocumentInterface>) {
		await this.checkDuplicateUser(data.username, data.email);

		if (!data.password) {
			data.password = this.passwordService.generateRandom(4);
		}

		// Encrypt password
		const password = await this.passwordService.hashString(
			data.password,
			this.configService.get('password').saltRounds,
		);

		return super.create({ ...data, password });
	}

	/**
	 * Get user by email
	 * @param value Username or Email to find
	 */
	public async getByUsernameOrEmail(value: string) {
		return this.model.findOne({
			$or: [{ email: value }, { username: value }],
		});
	}

	public getNotFoundError(): ApiError {
		return API_ERRORS.module.USER.NOT_FOUND;
	}

	/**
	 * Get user by username
	 * @param username Username to find
	 * @param id Check with the same id
	 */
	public async getByUsername(username: string, id?: string) {
		return await this.model.findOne({
			username,
			...(id ? { _id: { $ne: id } } : {}),
		});
	}

	/**
	 * Get user by email
	 * @param username Email to find
	 * @param id Check with the same id
	 */
	private async getByEmail(email: string, id?: string) {
		return this.model.findOne({
			email,
			...(id ? { _id: { $ne: id } } : {}),
		});
	}

	/**
	 * Check if there is a duplicate user
	 * @param username Username check
	 * @param email Email check
	 * @param id Check against another existent user
	 */
	private async checkDuplicateUser(
		username: string,
		email: string,
		id?: string,
	) {
		const findWithUsername = await this.getByUsername(username, id);
		const findWithEmail = await this.getByEmail(email, id);

		if (findWithUsername) {
			throw new ApiException(API_ERRORS.module.USER.USERNAME_EXISTS);
		}

		if (findWithEmail) {
			throw new ApiException(API_ERRORS.module.USER.EMAIL_EXISTS);
		}
	}
}
