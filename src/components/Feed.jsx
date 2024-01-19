import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import {feedQuery, searchQuery} from '../utils/data'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)
  const {categoryId} = useParams()

  useEffect(() => {
    if (categoryId) {
      setLoading(true)
  
      const query = searchQuery(categoryId)
      Client.fetch(query)
      .then(res => {
        setPins(res)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
    }
    else {
      const query = feedQuery()
      Client.fetch(query)
      .then(res => {
        setPins(res)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [categoryId])
  

  if (loading) return <Spinner message = 'We are adding new ideas to your feed.'/>

  return (
    <div>
      {pins && <MasonryLayout pins = {pins}/> }
    </div>
  )
}

export default Feed
