import React from "react";
import { View, Text, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import HomeScreen from './homeTab/homeScreen'
import BuyScreen from "./buyTab/buyScreen"
import PsalmsScreen from './psalmsTab/psalmsScreen'
import LoginScreen from './authTab/loginScreen'
import RegisterScreen from './authTab/registerScreen'

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    )
  }
}

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: DetailsScreen,
})

const BuyStack = createStackNavigator({
  Buy: { screen: BuyScreen },
  Details: DetailsScreen,
})

const PsalmsStack = createStackNavigator({
  Psalms: { screen: PsalmsScreen },
  Details: DetailsScreen,
})

const TabNavigator = createBottomTabNavigator(
  {
    Progamação: HomeStack,
    Lojinha: BuyStack,
    Salmos: PsalmsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        if (routeName === 'Progamação'){
          iconName = 'home'
        } else if (routeName === 'Lojinha') {
          iconName = 'shopping-basket'
        }
        else if (routeName === 'Salmos') {
          iconName = 'book-open'
        }
        return <Icon name={iconName} size={25} color={tintColor}/>
      }
    }),
    tabBarOptions:{
      activeTintColor: '#3480f9',
      inactiveTintColor: 'white',
      tabStyle:{
        backgroundColor: '#4a4b4c'
      }
    }
  },
)

const AuthScreen = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
})

export default createAppContainer(createSwitchNavigator({
  Auth: AuthScreen,
  TabNavigator: TabNavigator,
})
)

