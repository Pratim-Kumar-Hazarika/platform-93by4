import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react'
import { CgLogOut, CgProfile } from 'react-icons/cg'
import { useAdminAuth } from '../../context/AdminContext'
import NextLink from 'next/link'
import { RiContactsFill, RiDashboardFill } from 'react-icons/ri'
import { useRouter } from 'next/router'

export function AdminMenu() {
  const { authState: adminAuthState, setAuthState } = useAdminAuth()
  const toast = useToast()
  const router = useRouter()

  async function handleAdminLogout() {
    localStorage.removeItem('x-auth-token')
    setAuthState({
      admin: null,
      isLoading: false,
      isAuthenticated: false,
    })
    toast({
      title: 'You have been logged out.',
      description: 'Redirecting to home page...',
    })
    router.push('/')
  }
  return (
    <Menu>
      {adminAuthState?.isAuthenticated ? (
        <MenuButton
          as={Button}
          aria-label="Options"
          leftIcon={<CgProfile size="1.3rem" />}
          variant="link"
          p={2}
          size="ld"
        >
          <Flex>
            <Text pl="2" fontWeight="600" textTransform="capitalize">
              {adminAuthState?.admin?.firstName}
            </Text>
          </Flex>
        </MenuButton>
      ) : (
        <NextLink href="/auth/login">Login</NextLink>
      )}

      <MenuList bg="black.800" hidden={!adminAuthState?.isAuthenticated}>
        <NextLink href="/dashboard">
          <MenuItem icon={<RiDashboardFill />}>Admin Dashboard</MenuItem>
        </NextLink>

        <NextLink href="/contact">
          <MenuItem icon={<RiContactsFill />}>Contact</MenuItem>
        </NextLink>
        <MenuItem icon={<CgLogOut />} onClick={handleAdminLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
