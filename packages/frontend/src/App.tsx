import { AppShell, Burger, Button, Group, NavLink, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { RootState } from '@store/store'
import { IconFileText, IconHome, IconLogin, IconUser, IconUsers } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { AppRouter } from './features'
import LogoutButton from './features/auth/components/LogoutButton'


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

  console.log('User:', user);

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
        <AppRouter />
      </AppShell.Main>
    </AppShell>
  )
}

export default App
