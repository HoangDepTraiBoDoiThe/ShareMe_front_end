import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {IoMdAdd, IoMdSearch} from 'react-icons/io'

const NavBar = ({user, searchTerm, setSearchTerm}) => {
  const navigate = useNavigate()
  
  if (!user) return null;

  return (
    <div className = 'flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className = 'ml-1'/>
        <input
          type = 'text'
          placeholder = 'Search'
          onChange={(e) => setSearchTerm(e.target.value)}
          className = 'w-full rounded-md p-2 outline-none'
          value={searchTerm}
          onFocus={() => navigate('/search')}
        />
      </div>
      <div className='flex gap-3 items-center'>
        <Link to = {`user-profile/${user?._id}`} className='hidden md:block'>
          <img src={user?.image} alt='profile' className='w-12 rounded'/>
        </Link>
        <Link to = 'create-pin' className=' '>
          <IoMdAdd fontSize={30} className=' bg-black text-white rounded items-center justify-items-center'/>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
