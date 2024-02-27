import React from 'react'
import { Navbar, NavbarItem, NavbarContent, Link } from '@nextui-org/react'


const Nav = () => {
  return (
    <Navbar className='bg-[#003b5c]'>
      <NavbarContent className="gap-6 w-full" justify="center">
        <NavbarItem>
          <Link className='text-[#FFB81C] text-lg font-semibold' href="/guide">
            Guide
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-[#FFB81C] text-lg font-semibold' href="/">
            Home
          </Link>
        </NavbarItem>                
      </NavbarContent>
    </Navbar>
  )
}

export default Nav