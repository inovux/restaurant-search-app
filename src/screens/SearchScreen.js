import React, { useState } from 'react'
import { useRestaurants } from '../hooks/useRestaurants'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'
import RestaurantsList from '../components/RestaurantsList'

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchApi, restaurants, errorMessage] = useRestaurants()

  const filterResultsByPrice = (price) => {
    return restaurants.filter((restaurant) => restaurant.price === price)
  }

  return (
    <View>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmitSearchTerm={() => searchApi(searchTerm)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>We have found {restaurants.length} results</Text>
      <RestaurantsList
        restaurants={filterResultsByPrice('$')}
        title="Cost Effective"
      />
      <RestaurantsList
        restaurants={filterResultsByPrice('$$')}
        title="Bit Pricier"
      />
      <RestaurantsList
        restaurants={filterResultsByPrice('$$$')}
        title="Big Spender"
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default SearchScreen
