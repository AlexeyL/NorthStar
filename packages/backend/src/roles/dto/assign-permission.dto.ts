import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignPermissionDto {
  @ApiProperty({
    description: 'Role name',
    example: 'moderator',
  })
  @IsString()
  roleName: string;

  @ApiProperty({
    description: 'Permission name',
    example: 'posts:delete',
  })
  @IsString()
  permissionName: string;
}
