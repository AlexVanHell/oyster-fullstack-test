import { FilterQuery, Model, mongo } from 'mongoose';
import { API_ERRORS } from '../../constant/api-errors.constant';
import { ApiError } from '../api-exception/api-error.interface';
import { ApiException } from '../api-exception/api-exception';
import { BaseDocument } from '../document/base.document';
import { SimpleCrudServiceInterface } from './simple-crud.service.interface';

export abstract class SimpleCrudService<D extends BaseDocument>
	implements SimpleCrudServiceInterface<D> {
	constructor(protected readonly model: Model<D>) {}

	public async getAll(conditions?: FilterQuery<D>) {
		return this.model.find({ ...conditions }).exec();
	}

	public async getById(id: string) {
		return this.model.findById(id).exec();
	}

	public async create(data: Partial<D>) {
		const created = new this.model({
			active: true,
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		return created.save();
	}

	public async updateById(id: string, data: Partial<D>) {
		const find = await this.getById(id);

		if (!find) {
			throw new ApiException(this.getNotFoundError());
		}

		const updated = { ...data, updatedAt: new Date() };

		await this.model.updateOne({ _id: new mongo.ObjectID(id) } as any, updated);
		return updated as D;
	}

	public async deleteById(id: string) {
		const find = await this.getById(id);

		if (!find) {
			throw new ApiException(this.getNotFoundError());
		}

		const { _id } = find;

		await this.model.deleteOne({ _id });
		return _id;
	}

	public getNotFoundError(): ApiError {
		return API_ERRORS.CLIENT.RESOURCE_NOT_FOUND;
	}
}
