import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'

import NavBar from '../components/NavBar'
import Feed from '../components/Feed'
import CreatePin from '../components/CreatePin'
import Search from '../components/Search'
import PinDetail from '../components/PinDetail'

const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <NavBar user = {user} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/pin-detail/:pinId' element={<PinDetail user = {user} />}/>
          <Route path='/category/:categoryId' element={<Feed/>}/>
          <Route path='/create-pin' element={<CreatePin user = {user}/>}/>
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Pins
