import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'
import yelp from '../api/yelp'

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('')
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

  return (
    <View>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmitSearchTerm={() => searchApi(searchTerm)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>We have found {restaurants.length} results</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default SearchScreen
