import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
	@ApiProperty({
		description: 'User ID',
		example: 'clx1234567890',
	})
	@IsString()
	userId: string;

	@ApiProperty({
		description: 'Role name',
		example: 'moderator',
	})
	@IsString()
	roleName: string;
}
