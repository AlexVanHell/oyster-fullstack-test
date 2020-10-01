import { Prop, Schema } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export interface BaseDocumentInterface {
	_id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	active?: boolean;
}

@Schema()
export class BaseDocument extends Document implements BaseDocumentInterface {
	/* _id: string; */
	@Prop({
		type: SchemaTypes.Date,
	})
	createdAt?: Date;

	@Prop({
		type: SchemaTypes.Date,
	})
	updatedAt?: Date;

	@Prop()
	active?: boolean;
}
