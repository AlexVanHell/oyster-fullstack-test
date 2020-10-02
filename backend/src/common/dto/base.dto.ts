import { ApiProperty } from '@nestjs/swagger';

/**
 * @template I Id type
 */
export interface BaseDtoInterface {
	_id: string;
	active?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
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
		description: `Item's active status`,
		example: new Date().toISOString(),
	})
	active?: boolean;

	@ApiProperty({
		description: 'Creation date',
		example: new Date().toISOString(),
	})
	createdAt?: Date;

	@ApiProperty({
		description: 'Last update date',
		example: new Date().toISOString(),
	})
	updatedAt?: Date;
}
