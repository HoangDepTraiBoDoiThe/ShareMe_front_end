import React, {useState, useEffect} from 'react'
import Spinner from './Spinner'
import { Client } from '../client'
import MasonryLayout from './MasonryLayout'
import {searchQuery, feedQuery} from '../utils/data'

const Search = ({searchTerm}) => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)
  
  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== '')
    {
      setLoading(true)
      const query = searchQuery(searchTerm)

      Client.fetch(query)
      .then(res => {
        setPins(res)
        setLoading(false)
      })
    }
    else {
      const query = feedQuery()
      Client.fetch(query)
      .then(res => {
        setPins(res)
        setLoading(false)
      })
    }
  }, [searchTerm])
  
  
  return (
    <div>
      <MasonryLayout pins={pins && pins}/>
    </div>
  )
}

export default Search
