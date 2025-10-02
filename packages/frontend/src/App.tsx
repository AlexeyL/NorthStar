import { Routes, Route } from 'react-router-dom'
import { AppShell, Burger, Group, Text, NavLink } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconHome, IconUsers, IconFileText } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import PostsPage from './pages/PostsPage'

function App() {
  const [opened, { toggle }] = useDisclosure()
  const location = useLocation()

  const navigation = [
    { icon: IconHome, label: 'Home', href: '/' },
    { icon: IconUsers, label: 'Users', href: '/users' },
    { icon: IconFileText, label: 'Posts', href: '/posts' },
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
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text size="xl" fw={700} c="blue">
            NorthStar
          </Text>
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
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
