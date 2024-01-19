import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'

import { categories } from '../utils/data'
import logo from '../assets/logo.png'
const SideBar = ({user, closeToggle}) => {

  const handleCloseSideBar = () => {
    if (closeToggle) closeToggle(false)
  }

  const isNotActiveStyle = 'flex item-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
  const isActiveStyle = 'flex item-center px-5 gap-3 font-extra-bold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'
  
  return (
    <div className='flex flex-col border-b-2 justify-between bg-white h-full overflow-y-scroll min-w-210 hidescrollbar'>
      <div className='flex flex-col'>
        <Link
          to={"/"}
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'  
          onClick={handleCloseSideBar}
        >
          <img src = {logo} alt = "logo" className = "w-full" />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to={"/"}
            className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSideBar}
          >
            <RiHomeFill/>
            <p>Home</p>
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
          {categories.slice(0, categories.length - 1).map((category) => {
            return (
              <NavLink 
                to={`/category/${category.name}`}
                onClick={handleCloseSideBar}
                className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                key={category.name}  
              >
                <img src={category.image} alt={category.name} className='w-8 h-8 rounded-full shadow-sm' />
                {category.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      {user && (
        <Link 
          to={`/user-profile/${user?._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
          onClick={handleCloseSideBar}
        >
          <img src={user?.image} alt='logo' className='w-10 rounded-full' />
          <p >{user?.name}</p>
        </Link>
      )}
    </div>
  )
}

export default SideBar
