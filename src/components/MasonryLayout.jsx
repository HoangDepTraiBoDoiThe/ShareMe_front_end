import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

const MasonryLayout = ({pins}) => {
  return (
    <Masonry className=' animate-slide-fwd flex' breackPointCols = {breakpointColumnsObj}>
      {pins?.length > 0 ? (pins.map(pin => (
        <Pin key = {pin._id} pin = {pin} className =' w-max'/>
      ))): (
        <p className=' text-center font-bold text-2xl'>
          No pins found
        </p>
      )}
    </Masonry>
  )
}

export default MasonryLayout
