import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Johnson',
      posts: {
        create: [
          {
            title: 'Getting Started with NestJS',
            content: 'NestJS is a progressive Node.js framework for building efficient and scalable server-side applications.',
            published: true,
          },
          {
            title: 'Understanding Prisma ORM',
            content: 'Prisma is a next-generation ORM that helps developers build faster and make fewer errors.',
            published: false,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob Smith',
      posts: {
        create: [
          {
            title: 'React Best Practices',
            content: 'Learn the best practices for building React applications.',
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
