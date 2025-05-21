import Link from 'next/link'
import Image from 'next/image'

import DesktopLogo from '@/public/airbnb-desktop.png'
import MobileLogo from '@/public/airbnb-mobile.webp'
import { UserNav } from './UserNav'
import SearchComponent from './SearchComponent'

export default function Navbar() {
  return (
    <nav className="w-full border-b mb-10">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Airbnb"
            className="w-32 hidden lg:block"
          />
          <Image src={MobileLogo} alt="Airbnb" className="w-12 lg:hidden" />
        </Link>
        <SearchComponent />
        <UserNav />
      </div>
    </nav>
  )
}
