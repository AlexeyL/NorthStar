import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
	@ApiProperty({ example: 'John' })
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({ example: 'Doe' })
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({ example: 'user@example.com' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: 'password123', minLength: 6 })
	@IsString()
	@MinLength(6)
	password: string;

	@ApiProperty({ example: 'Acme Corp' })
	@IsString()
	@IsNotEmpty()
	companyName: string;

	@ApiProperty({ example: '+1 555 000 0000' })
	@IsString()
	@IsNotEmpty()
	phone: string;

	@ApiProperty({ example: '123 Main St' })
	@IsString()
	@IsNotEmpty()
	address: string;

	@ApiProperty({ example: 'Springfield' })
	@IsString()
	@IsNotEmpty()
	city: string;

	@ApiProperty({ example: 'IL' })
	@IsString()
	@IsNotEmpty()
	state: string;

	@ApiProperty({ example: '62701' })
	@IsString()
	@IsNotEmpty()
	zip: string;
}
