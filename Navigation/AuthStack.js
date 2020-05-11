import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Login from '../Components/Login';

const Stack = createStackNavigator();

class AuthStack extends React.Component{
  render(){
    return(
  
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
  
    );
  }
}


export default AuthStack