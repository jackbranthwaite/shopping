import React from 'react'
import s from './Header.module.scss'
import Logo from '@/assets/pngs/GetLost_Logo_WhiteShadow_PurpleCircle_RGB_001.png'
import Link from 'next/link'

export const Header = () => {
  return (
    <div className={s.headerWrapper}>
      <div className={s.logoWrapper}>
        <img src={Logo.src} alt="Get Lost Logo" className={s.logo} />
      </div>
      <div className={s.menuWrapper}>
        <ul className={s.menu}>
          <li className={s.menuItem}>
            <Link href={'/'}>Shop</Link>
          </li>
          <li className={s.menuItem}>
            <Link href={'/'}>Builds</Link>
          </li>
          <li className={s.menuItem}>
            <Link href={'/'}>Blogs</Link>
          </li>
          <li className={s.menuItem}>
            <Link href={'/'}>About Us</Link>
          </li>
          <li className={s.menuItem}>
            <Link href={'/'}>Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
