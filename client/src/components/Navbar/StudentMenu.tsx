import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Link as ChakraLink,
  MenuItem,
  useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Router, { useRouter } from 'next/router'
import { CgLogOut, CgProfile } from 'react-icons/cg'
import { RiContactsFill, RiDashboardFill } from 'react-icons/ri'
import { useAuth } from '../../context/AuthContext'
import { logout } from '../../services/axiosService'

export function StudentMenu() {
  const { authState } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const onHandleLogout = async () => {
    await logout()
      .then((res) => {
        toast({
          title: "You've been successfully logged out.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        localStorage.removeItem('neogSubmission')
        localStorage.removeItem('mark15')
        localStorage.removeItem('x-auth-token')
        router.push('/')
        Router.reload()
      })

      .catch((err) => {
        toast({
          title: 'There was an error while logging you out. Please try again.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
  }
  return (
    <Menu>
      {authState?.isAuthenticated ? (
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
              {authState.user?.firstName}
            </Text>
          </Flex>
        </MenuButton>
      ) : (
        <NextLink href="/auth/login">Login</NextLink>
      )}

      <MenuList bg="black.800" hidden={!authState?.isAuthenticated}>
        {router.pathname !== '/dashboard' && (
          <NextLink href="/dashboard">
            <MenuItem icon={<RiDashboardFill />}>Dashboard</MenuItem>
          </NextLink>
        )}
        <NextLink href="/contact">
          <MenuItem icon={<RiContactsFill />}>Contact</MenuItem>
        </NextLink>
        <MenuItem icon={<CgLogOut />} onClick={onHandleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
