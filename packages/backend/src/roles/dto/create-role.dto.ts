import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    example: 'moderator',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Moderator with content management access',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
