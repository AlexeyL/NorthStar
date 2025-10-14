import { Routes, Route } from 'react-router-dom'
import { AppShell, Burger, Group, Text, NavLink, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconHome, IconUsers, IconFileText, IconUser, IconLogin } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import PostsPage from './pages/PostsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import UnauthorizedPage from './pages/UnauthorizedPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LogoutButton from './components/auth/LogoutButton'

function App() {
  const [opened, { toggle }] = useDisclosure()
  const location = useLocation()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  const navigation = [
    { icon: IconHome, label: 'Home', href: '/' },
    { icon: IconUsers, label: 'Users', href: '/users' },
    { icon: IconFileText, label: 'Posts', href: '/posts' },
  ]

  const authNavigation = [
    { icon: IconUser, label: 'Profile', href: '/profile' },
  ]

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text size="xl" fw={700} c="blue">
              NorthStar
            </Text>
          </Group>
          
          <Group>
            {isAuthenticated ? (
              <>
                <Text size="sm" c="dimmed">
                  Welcome, {user?.name || user?.email}
                </Text>
                <LogoutButton />
              </>
            ) : (
              <Button component={Link} to="/login" variant="outline" leftSection={<IconLogin size="1rem" />}>
                Login
              </Button>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            component={Link}
            to={item.href}
            label={item.label}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            active={location.pathname === item.href}
            onClick={() => toggle()}
          />
        ))}
        
        {isAuthenticated && (
          <>
            <Text size="sm" fw={500} mt="md" mb="xs" c="dimmed">
              Account
            </Text>
            {authNavigation.map((item) => (
              <NavLink
                key={item.href}
                component={Link}
                to={item.href}
                label={item.label}
                leftSection={<item.icon size="1rem" stroke={1.5} />}
                active={location.pathname === item.href}
                onClick={() => toggle()}
              />
            ))}
          </>
        )}
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          <Route 
            path="/users" 
            element={
              <ProtectedRoute requiredRoles={['user', 'admin', 'moderator']}>
                <UsersPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/posts" 
            element={
              <ProtectedRoute requiredRoles={['user', 'admin', 'moderator']}>
                <PostsPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
