import {
	Button,
	Center,
	Container,
	Paper,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Container size="md" my={40}>
			<Center>
				<Paper radius="md" p="xl" withBorder>
					<Stack align="center" gap="md">
						<Title order={1} c="red">
							403
						</Title>
						<Title order={2}>Unauthorized Access</Title>
						<Text ta="center" c="dimmed">
							You don't have permission to access this page.
						</Text>
						<Button onClick={() => navigate(-1)}>Go Back</Button>
					</Stack>
				</Paper>
			</Center>
		</Container>
	);
};

export default UnauthorizedPage;
