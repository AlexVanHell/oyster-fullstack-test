import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

/**
 * @template I Id type
 */
export interface BaseDtoInterface {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

/**
 * @template I Id type
 */
export class BaseDto implements BaseDtoInterface {
	@ApiProperty({
		description: `Item's id`,
		example: 'asdasd92349ijijsdasd',
		type: 'string',
	})
	_id: string;

	@ApiProperty({
		description: 'Creation date',
		example: new Date().toISOString(),
	})
	createdAt: Date;

	@ApiProperty({
		description: 'Last update date',
		example: new Date().toISOString(),
	})
	updatedAt: Date;

	@Exclude()
	deletedAt: Date;
}
