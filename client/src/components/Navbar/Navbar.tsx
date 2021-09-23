import { Flex, Link as ChakraLink, useToast } from '@chakra-ui/react'
import { theme } from '../../themes'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import NeogLogo from './NeogLogo'
import { useAdminAuth } from '../../context/AdminContext'
import { StudentMenu } from './StudentMenu'
import { AdminMenu } from './AdminMenu'
import { addTime } from '../../utils/addTime'

export function Navbar() {
  const { authState: studentAuthState } = useAuth()
  const { authState: adminAuthState } = useAdminAuth()
  return (
    <Flex
      background={theme.colors.black['800']}
      width={'100%'}
      maxHeight={'60px'}
      minHeight={'60px'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Flex
        width={'100%'}
        background={theme.colors.black['800']}
        height={'100%'}
        alignItems={'center'}
        maxWidth={'1100px'}
        padding={'0 1rem'}
        justifyContent={'space-between'}
      >
        <Link
          href={
            studentAuthState?.isAuthenticated
              ? '/dashboard'
              : adminAuthState?.isAuthenticated
              ? '/admin/dashboard'
              : '/'
          }
          passHref
        >
          <ChakraLink>
            <NeogLogo />
          </ChakraLink>
        </Link>
        <Flex alignItems="center">
          {!adminAuthState?.admin?.role ? <StudentMenu /> : <AdminMenu />}
        </Flex>
      </Flex>
    </Flex>
  )
}
