import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';





export default class HowToPlay extends React.Component {
  

  render() {

    const {navigate} = this.props.navigation;

    return(
        <View style={styles.container}>
            <Text style={styles.header}>How To Play</Text>
            <View style={{paddingTop:25}}/>
            <Text style={styles.normText}>- Each side has 6 pieces, 2 small, 2 medium, and 2 big</Text>
            <Text style={styles.normText}>- Bigger pieces can be put over your opponent’s smaller pieces</Text>
            <Text style={styles.normText}>- Get 3 in a row of the same color to win</Text>
            <Button title="Back Home" onPress={() => navigate('Home')}/>
        </View>
    );
}

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
      },
    header: {
        fontSize: 50,
        flex: 0,
        marginTop: 50,
    },
    normText: {
        fontSize: 25,
        flex: 0,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 25,
    }
  
});
