import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('user', 'admin', 'moderator')
	@Permissions('posts:create')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create a new post' })
	@ApiResponse({ status: 201, description: 'Post created successfully' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: any) {
		return this.postsService.create(createPostDto, user.userId);
	}

	@Get()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('user', 'admin', 'moderator')
	@Permissions('posts:read')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get all posts' })
	@ApiResponse({ status: 200, description: 'List of all posts' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiQuery({ name: 'authorId', required: false, description: 'Filter by author ID' })
	findAll(@Query('authorId') authorId?: string) {
		if (authorId) {
			return this.postsService.findByAuthor(authorId);
		}
		return this.postsService.findAll();
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('user', 'admin', 'moderator')
	@Permissions('posts:read')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get post by ID' })
	@ApiResponse({ status: 200, description: 'Post found' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiResponse({ status: 404, description: 'Post not found' })
	findOne(@Param('id') id: string) {
		return this.postsService.findOne(id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('user', 'admin', 'moderator')
	@Permissions('posts:update')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Update post by ID' })
	@ApiResponse({ status: 200, description: 'Post updated successfully' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiResponse({ status: 404, description: 'Post not found' })
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @CurrentUser() user: any) {
		return this.postsService.update(id, updatePostDto, user.userId);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('admin', 'moderator')
	@Permissions('posts:delete')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Delete post by ID' })
	@ApiResponse({ status: 200, description: 'Post deleted successfully' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	@ApiResponse({ status: 404, description: 'Post not found' })
	remove(@Param('id') id: string, @CurrentUser() user: any) {
		return this.postsService.remove(id, user.userId);
	}
}
