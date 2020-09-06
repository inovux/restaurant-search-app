import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import yelp from '../api/yelp'

const RestaurantDetailScreen = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState(null)
  const [reviews, setReviews] = useState(null)
  const id = navigation.getParam('id')

  const getRestaurant = async (id) => {
    const response = await yelp.get(`/${id}`)

    setRestaurant(response.data)
  }

  const getReviews = async (id) => {
    const response = await yelp.get(`/${id}/reviews`)

    setReviews(response.data)
  }

  useEffect(() => {
    getRestaurant(id)
    getReviews(id)
  }, [])

  if (!restaurant || !reviews) {
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
      <Text style={styles.title}>Reviews</Text>
      <FlatList
        data={reviews.reviews}
        style={styles.container}
        keyExtractor={(review) => review.id}
        renderItem={({ item }) => {
          return (
            <>
              <Text styles={styles.description}>
                {'\n'}
                {item.text}
              </Text>
              <Text style={styles.reviewDate}>
                {item.time_created} {'\n'}
              </Text>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />
            </>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  reviewDate: {
    textAlign: 'right',
  },
  title: {
    marginVertical: 5,
    marginHorizontal: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    marginBottom: 10,
    marginHorizontal: 15,
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
