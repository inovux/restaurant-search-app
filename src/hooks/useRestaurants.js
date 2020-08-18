import { useState, useEffect } from 'react'
import yelp from '../api/yelp'

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const searchApi = async (term) => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: term,
          location: 'hong kong',
        },
      })

      setRestaurants(response.data.businesses)
    } catch (err) {
      setErrorMessage('Something went wrong')
    }
  }

  useEffect(() => {
    searchApi('pizza')
  }, [])

  return [searchApi, restaurants, errorMessage]
}
