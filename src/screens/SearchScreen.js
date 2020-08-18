import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'
import yelp from '../api/yelp'

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [restaurants, setRestaurants] = useState('')

  const searchApi = async () => {
    const response = await yelp.get('/search', {
      params: {
        limit: 50,
        term: searchTerm,
        location: 'hong kong',
      },
    })

    setRestaurants(response.data.businesses)
  }

  return (
    <View>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmitSearchTerm={searchApi}
      />
      <Text>We have found {restaurants.length} results</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default SearchScreen
