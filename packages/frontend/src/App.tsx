import PageLayout from '@features/layout/components/pageLayout';
import type { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import { AppRouter } from './features';

function App() {
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth,
	);

	console.log('User:', user);
	console.log('Is Authenticated:', isAuthenticated);

	return (
		<PageLayout>
			<AppRouter />
		</PageLayout>
	);
}

export default App;
