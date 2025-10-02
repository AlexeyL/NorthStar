export interface User {
  id: string
  email: string
  name?: string
  createdAt: string
  updatedAt: string
  posts?: Post[]
}

export interface Post {
  id: string
  title: string
  content?: string
  published: boolean
  authorId: string
  author?: User
  createdAt: string
  updatedAt: string
}

export interface CreateUserDto {
  email: string
  name?: string
}

export interface UpdateUserDto {
  email?: string
  name?: string
}

export interface CreatePostDto {
  title: string
  content?: string
  published?: boolean
  authorId: string
}

export interface UpdatePostDto {
  title?: string
  content?: string
  published?: boolean
  authorId?: string
}
