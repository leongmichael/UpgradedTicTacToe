import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';





export default class HomeScreen extends React.Component {

    render() {

        const {navigate} = this.props.navigation;

        return(

            <View style={styles.container}>
                <Image style={styles.image} source={require('./assets/icon.png')}></Image>
                <Button title="How to Play" onPress={() => navigate('HowToPlay')}/>
                <Button title="Play Local" onPress={() => navigate('Game')}/>
            
            </View>

            

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c0c0c0',
        alignItems: 'center',
        justifyContent: 'center',
      },
    image: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        
      },

  
  
});
