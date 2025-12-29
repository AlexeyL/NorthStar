import {
	Card,
	Container,
	Group,
	SimpleGrid,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { IconBrandReact, IconDatabase, IconServer } from '@tabler/icons-react';

export default function HomePage() {
	const features = [
		{
			icon: IconBrandReact,
			title: 'React Frontend',
			description:
				'Modern React SPA with TypeScript, Mantine UI, and RTK Query for state management.',
		},
		{
			icon: IconServer,
			title: 'NestJS Backend',
			description:
				'Scalable Node.js backend built with NestJS framework and comprehensive API documentation.',
		},
		{
			icon: IconDatabase,
			title: 'PostgreSQL + Prisma',
			description:
				'Robust database setup with PostgreSQL and Prisma ORM for type-safe database operations.',
		},
	];

	return (
		<Container size="lg">
			<Title order={1} ta="center" mb="xl">
				Welcome to NorthStar
			</Title>

			<Text size="lg" ta="center" mb="xl" c="dimmed">
				A modern full-stack application with NestJS backend and React
				frontend
			</Text>

			<SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
				{features.map((feature, index) => (
					<Card
						key={index}
						shadow="sm"
						padding="lg"
						radius="md"
						withBorder
					>
						<Group mb="md">
							<ThemeIcon size="lg" radius="md" variant="light">
								<feature.icon size="1.5rem" />
							</ThemeIcon>
							<Title order={3}>{feature.title}</Title>
						</Group>
						<Text size="sm" c="dimmed">
							{feature.description}
						</Text>
					</Card>
				))}
			</SimpleGrid>
		</Container>
	);
}
