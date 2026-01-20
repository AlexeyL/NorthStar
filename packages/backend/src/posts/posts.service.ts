import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
	constructor(private prisma: PrismaService) {}

	async create(createPostDto: CreatePostDto, userId: string) {
		return this.prisma.post.create({
			data: {
				...createPostDto,
				authorId: userId,
			},
			include: {
				author: true,
			},
		});
	}

	async findAll() {
		return this.prisma.post.findMany({
			include: {
				author: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async findOne(id: string) {
		return this.prisma.post.findUnique({
			where: { id },
			include: {
				author: true,
			},
		});
	}

	async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
		const post = await this.prisma.post.findUnique({
			where: { id },
		});

		if (!post) {
			throw new NotFoundException('Post not found');
		}

		// Check if user is the author or has admin/moderator role
		if (post.authorId !== userId) {
			// Check if user has admin or moderator role
			const user = await this.prisma.user.findUnique({
				where: { id: userId },
				include: {
					userRoles: {
						include: {
							role: true,
						},
					},
				},
			});

			const userRoles = user?.userRoles.map((ur) => ur.role.name) || [];
			if (!userRoles.includes('admin') && !userRoles.includes('moderator')) {
				throw new ForbiddenException('You can only update your own posts');
			}
		}

		return this.prisma.post.update({
			where: { id },
			data: updatePostDto,
			include: {
				author: true,
			},
		});
	}

	async remove(id: string, userId: string) {
		const post = await this.prisma.post.findUnique({
			where: { id },
		});

		if (!post) {
			throw new NotFoundException('Post not found');
		}

		// Check if user is the author or has admin/moderator role
		if (post.authorId !== userId) {
			// Check if user has admin or moderator role
			const user = await this.prisma.user.findUnique({
				where: { id: userId },
				include: {
					userRoles: {
						include: {
							role: true,
						},
					},
				},
			});

			const userRoles = user?.userRoles.map((ur) => ur.role.name) || [];
			if (!userRoles.includes('admin') && !userRoles.includes('moderator')) {
				throw new ForbiddenException('You can only delete your own posts');
			}
		}

		return this.prisma.post.delete({
			where: { id },
		});
	}

	async findByAuthor(authorId: string) {
		return this.prisma.post.findMany({
			where: { authorId },
			include: {
				author: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}
}
