import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
	BaseDocument,
	BaseDocumentInterface,
} from '../../common/document/base.document';

export interface UserDocumentInterface extends BaseDocumentInterface {
	firstname: string;
	lastname: string;
	username: string;
	email: string;
	password?: string;
}

@Schema({
	collection: 'user',
})
export class UserDocument extends BaseDocument
	implements UserDocumentInterface {
	@Prop()
	firstname: string;

	@Prop()
	lastname: string;

	@Prop()
	username: string;

	@Prop()
	email: string;

	@Prop()
	password?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
