import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AdMobBanner} from 'expo';

import Game from './Game';
import HomeScreen from './HomeScreen';
import HowToPlay from './HowToPlay';



const Stack = createStackNavigator();

export default class App extends React.Component {
  

  render() {
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="HowToPlay" component={HowToPlay} />
      </Stack.Navigator>
    </NavigationContainer>)
  }

}

const styles = StyleSheet.create({
  
  
});
