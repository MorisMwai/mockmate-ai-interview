import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import { getCurrentUser, isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import UserDropdown from '@/components/UserDropdown'

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated) redirect('/sign-in')
    
  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">MockMate</h2>
        </Link>

        {user && <UserDropdown name={user.name} />}

        {/* <LogoutButton /> */}
      </nav>

      {children}
    </div>
  )
}

export default RootLayout