import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
	@ApiProperty({
		description: 'Permission name',
		example: 'posts:delete',
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: 'Resource name',
		example: 'posts',
	})
	@IsString()
	resource: string;

	@ApiProperty({
		description: 'Action name',
		example: 'delete',
	})
	@IsString()
	action: string;

	@ApiProperty({
		description: 'Permission description',
		example: 'Delete posts',
		required: false,
	})
	@IsOptional()
	@IsString()
	description?: string;
}
