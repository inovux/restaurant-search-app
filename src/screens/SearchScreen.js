import React, { useState } from 'react'
import { useRestaurants } from '../hooks/useRestaurants'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import SearchBar from '../components/SearchBar'
import RestaurantsList from '../components/RestaurantsList'

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchApi, restaurants, errorMessage] = useRestaurants()

  const filterResultsByPrice = (price) => {
    return restaurants.filter((restaurant) => restaurant.price === price)
  }

  return (
    <View style={styles.container}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmitSearchTerm={() => searchApi(searchTerm)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <RestaurantsList
          restaurants={filterResultsByPrice('$')}
          title="Cost Effective"
          navigation={navigation}
        />
        <RestaurantsList
          restaurants={filterResultsByPrice('$$')}
          title="Bit Pricier"
          navigation={navigation}
        />
        <RestaurantsList
          restaurants={filterResultsByPrice('$$$')}
          title="Big Spender"
          navigation={navigation}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default SearchScreen
