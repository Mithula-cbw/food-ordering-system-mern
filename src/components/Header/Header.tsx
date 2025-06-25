import React from 'react'
import HeaderStrip from './HeaderStrip'
import HeaderLogo from './HeaderLogo'
import SearchBox from './SearchBox'
import AuthContainer from './AuthContainer'
import ActionContainer from './ActionContainer'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div id='header-wrapper' className='w-full bg-white shadow-md h-auto overflow-visible pb-4'>
        <HeaderStrip />
        <div id='header-main' className='w-full h-auto py-5 px-10 flex flex-row justify-between items-center'>
            <HeaderLogo />
            <SearchBox />
            <div className='flex flex-row items-center justify-between space-x-12'>
              <AuthContainer />
              <ActionContainer />
            </div>
        </div>
        <Navbar />
    </div>
  )
}

export default Header