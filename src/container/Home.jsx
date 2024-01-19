import React, {useState, useRef, useEffect} from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import favIcon from '../assets/favicon.png'
import SideBar from '../components/sideBar'
import UserProfile from '../components/userProfile'
import Pins from './pins'
import {HiMenu} from 'react-icons/hi'
import red_logo from '../assets/logo.png'
import { userQuery } from '../utils/data'
import { Client } from '../client'
import { FetchUserLocalStore } from '../utils/FetchUser'

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)
  
  const userInfo = FetchUserLocalStore()
  
  useEffect(() => {
    const query = userQuery(userInfo?.sub)
    Client.fetch(query)
    .then((data) => {
      setUser(data[0])
    })
  }, [])
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [])
  

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col transition-height h-screen duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <SideBar user = {user && user} closeToggle = {setToggleSideBar}/>
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between shadow-md items-center'>
          <HiMenu fontSize={40} className=' cursor-pointer' onClick={() => setToggleSideBar(true)}/>
          <Link to='/' >
            <img src={red_logo} alt='logo' className='w-20' />
          </Link>
          <Link to={`/user-profile/${user?._id}`} >
            <img src={user?.image} alt='logo' className='w-20 rounded-2xl' />
          </Link>
        </div>
        {toggleSideBar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className=' absolute w-full flex justify-end items-center p-2'>
              <HiMenu fontSize={40} className=' cursor-pointer' onClick={() => setToggleSideBar(false)}/>
            </div>
            <SideBar user = {user && user} closeToggle = {setToggleSideBar}/>
          </div>
        )}
      </div>

      <div className=' overflow-y-scroll pb-2 flex-1 h-screen'>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user = {user && user}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default Home
