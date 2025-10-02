import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is the content of my first post.', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @ApiProperty({ example: 'user-id-here' })
  @IsString()
  @IsNotEmpty()
  authorId: string;
}
