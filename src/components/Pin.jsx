import React, {useState} from 'react'
import {v4, uuid} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import { FetchUserLocalStore } from '../utils/FetchUser'
import {AiTwotoneDelete} from 'react-icons/ai'

import { Client, urlFor} from '../client'
import { render } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'

const Pin = ({pin: {image, _id, postedBy, destination, save}}) => {
  const [postHovered, setPostHovered] = useState(false)
  const navigate = useNavigate()
  const userInfo = FetchUserLocalStore()
  const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === userInfo?.sub) ?? []).length !== 0;
  const savingPost = (id) => {
    Client.patch(id)
    .setIfMissing({save: []})
    .insert('after', 'save[-1]', [
      {
        _key: v4(),
        userId: userInfo?.sub,
        postedBy: {
          _ref: userInfo?.sub,
          _type: 'postedBy'
        }
      }
    ])
    .commit()
    .then((result) => {
      window.location.reload()
    }).catch((err) => {
      
    });
  }
  const deletePin = (id) => {
    Client.delete(id)
    .then((result) => {
      window.location.reload()
    }).catch((err) => {
      
    });
  }
  
  return (
    <div className=' m-2'>
      <div 
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
          {image && (
            <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" /> 
          )}
          {postHovered && (
          <div 
            className=' absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
                <div className=' flex gap-2'>
                  <a 
                    href= {`${image?.asset?.url}?dl=`} 
                    download 
                    onClick={e => e.stopPropagation()}
                    className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  >
                    <MdDownloadForOffline />
                  </a>
                </div>
                {alreadySaved ? (
                  <button 
                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                    onClick={e => e.stopPropagation()}
                  >
                    {save?.length} Saved
                  </button>
                ): (
                  <button 
                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                    onClick={e => {
                      e.stopPropagation()
                      savingPost(_id)
                    }}
                  >
                    save
                  </button>
                )}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {destination && (
                <a
                  href={destination}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 20 ? destination.slice(8, 20) + "..." : destination.slice(8)}
                </a>
              )}
              {postedBy._id === userInfo?.sub && (
                <button
                  className='bg-white opacity-70 hover:opacity-100 text-black font-bold p-3 text-base rounded-full hover:shadow-md outline-none'
                  onClick={e => {
                    e.stopPropagation()
                    deletePin(_id)
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link 
        to = {`user-profile/${postedBy?._id}`}
        className='flex gap-2 mt-2 items-center'
      >
        <img 
          className='w-8 h-8 rounded-full object-cover'
          src={postedBy?.image}
          alt='user-profile'
        />
        <p className=' font-semibold capitalize'>{postedBy?.name}</p>
      </Link>
    </div>
  )
}

export default Pin
