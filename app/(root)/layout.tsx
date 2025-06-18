import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">MockMate</h2>
        </Link>
      </nav>

      {children}
    </div>
  )
}

export default RootLayout