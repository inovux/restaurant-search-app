import React, { useState } from 'react'
import { useRestaurants } from '../hooks/useRestaurants'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchApi, restaurants, errorMessage] = useRestaurants()

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
