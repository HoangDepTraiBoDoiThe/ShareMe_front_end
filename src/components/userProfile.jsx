import React, {useState, useEffect} from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google';
import { userSavedPinsQuery, userCreatedPinsQuery, userQuery } from '../utils/data';

import { Client } from '../client'
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { set } from 'mongoose';

const UserProfile = () => {

  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('Created')
  const {userId} = useParams()
  const useNav = useNavigate()

  const randomImage = 'https://source.unsplash.com/random/1600x900/?photography,technology,japan'
  useEffect(() => {
    const query = userQuery(userId)
    Client.fetch(query)
    .then((result) => {
      setUser(result[0])
    }).catch((err) => {
      console.log(err)
    });
  }, [userId])

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId)

      Client.fetch(createdPinsQuery)
      .then((result) => {
        setPins(result)
      }).catch((err) => {
        console.log(err)
      });
    }
    else {
      const savedPinsQuery = userSavedPinsQuery(userId)

      Client.fetch(savedPinsQuery)
      .then((result) => {
        setPins(result)
      }).catch((err) => {
        console.log(err)
      });
    }
  }, [text, userId])
  
  
  
  if (!user) {
    <span>Loading profile...</span>
  }
  
  return (
    <div className=' relative pb-2 h-full justify-center'>
      <div className=' flex flex-col pb-5'>
        <div className='flex flex-col relative mb-7'>
        <div className=' flex flex-col justify-center'>
          <img 
            className='w-full h-370 2xl:h-510 object-cover shadow-lg'
            src={randomImage}
            alt='banner-pic'
          />
          <img 
            className='rounded-full -mt-10 w-20 h-20 object-cover shadow-xl m-auto'
            src={user?.image}
            alt='profile-pic'
          />
          <h1 className=' font-bold text-3xl text-center mt-3'>
            {user?.name}
          </h1>
          <div className=' absolute top-0 z-1 right-0 p-2'>
            {userId === user?._id && (
              <button
                className=' bg-white rounded-full p-2 shadow-lg outline-none cursor-pointer'
                onClick={() => googleLogout()}
              >
                <AiOutlineLogout className=' text-2xl text-red-500' />
              </button>
            )}
          </div>
        </div>
        <div className=' text-center mb-7'>
        <button type='button'
            onClick={(e) => {
              setText(e.target.textContent)
              setActiveBtn('Created')
            }}
            className= {`${activeBtn === 'Created' ? 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none' : ' bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'}`}
          >
            Created
          </button>
          <button type='button'
            onClick={(e) => {
              setText(e.target.textContent)
              setActiveBtn('Saved')
            }}
            className= {`${activeBtn === 'Saved' ? 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none' : ' bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'}`}
          >
            Saved
          </button>
        </div>
        <div className=' px-2'>
          <MasonryLayout pins = {pins}/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
