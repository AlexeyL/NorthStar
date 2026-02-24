import logo from '@assets/logo.png';
import { Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Logo() {
	return (
		<Link to='/' style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Image src={logo} alt='Aptivor logo' h={50} />
			<Text c='white' size='xs' fw={500}>
				Aptivor
			</Text>
		</Link>
	);
}
