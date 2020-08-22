import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import yelp from '../api/yelp'

const RestaurantDetailScreen = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState(null)
  const id = navigation.getParam('id')

  const getRestaurant = async (id) => {
    const response = await yelp.get(`/${id}`)

    setRestaurant(response.data)
  }

  useEffect(() => {
    getRestaurant(id)
  }, [])

  if (!restaurant) {
    return null
  }

  const categories = restaurant.categories
    .map((category) => category.title)
    .join(' • ')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.description}>
        Rating: {restaurant.rating} • {categories} •{' '}
        {restaurant.location.display_address[0]} • {restaurant.display_phone}
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.photos}
        data={restaurant.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 5,
    marginHorizontal: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 10,
    marginHorizontal: 15,
    color: '#a2a2a2',
  },
  image: {
    height: 200,
    width: 300,
    marginLeft: 15,
  },
})

export default RestaurantDetailScreen
