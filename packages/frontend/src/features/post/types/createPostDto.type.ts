export type CreatePostDto = {
    title: string;
    content?: string;
    published?: boolean;
    authorId: string;
}