import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import SearchScreen from './src/screens/SearchScreen'
import RestaurantDetailScreen from './src/screens/RestaurantDetailScreen'

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    RestaurantShow: RestaurantDetailScreen,
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: "Stanley's restaurant search",
    },
  },
)

export default createAppContainer(navigator)
