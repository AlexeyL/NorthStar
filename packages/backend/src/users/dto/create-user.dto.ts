import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'john@example.com' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ example: 'strongPassword123' })
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty({ example: 'John', required: false })
	@IsString()
	@IsOptional()
	firstName?: string;

	@ApiProperty({ example: 'Doe', required: false })
	@IsString()
	@IsOptional()
	lastName?: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	companyId?: string;
}
