import { BaseModel } from '../interface/base-model.interface';

export interface UserModel extends BaseModel {
	username: string;
	email: string;
	firstname: string;
	lastname: string;
}
