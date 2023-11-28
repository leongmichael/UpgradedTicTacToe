import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class Game extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
      currentPlayer: 1,

      orangePieces: ["o1", "o1", "o2", "o2", "o3", "o3"],
      bluePieces: ["b1", "b1", "b2", "b2", "b3", "b3"],
    }

  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState: 
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
      orangePieces: ["o1", "o1", "o2", "o2", "o3", "o3"],
      bluePieces: ["b1", "b1", "b2", "b2", "b3", "b3"],
    });
  }

  convertCodes = (str) => {
    if (str == "o1") {
      return "Small Orange"
    }

    if (str == "o2") {
      return "Medium Orange"
    }

    if (str == "o3") {
      return "Big Orange"
    }

    if (str == "b1") {
      return "Small Blue"
    }

    if (str == "b2") {
      return "Medium Blue"
    }

    if (str == "b3") {
      return "Big Blue"
    }
  }

  determineTurn = () => {
    if (this.state.currentPlayer == 1) {
      return "Blue";
    }

    if (this.state.currentPlayer == -1) {
      return "Orange";
    }
  }

  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;


    // check rows
    for (var i = 0; i < NUM_TILES; i++) {
      if (arr[i][0][0] == "b" && arr[i][1][0] == "b" && arr[i][2][0] == "b") {return "b";}
      else if (arr[i][0][0] == "o" && arr[i][1][0] == "o" && arr[i][2][0] == "o") {return "o";}
    }

    // check columns
    for (var i=0; i < NUM_TILES; i++) {
      if (arr[0][i][0] == "b" && arr[1][i][0] == "b" && arr[2][i][0] == "b") {return "b";}
      else if (arr[0][i][0] == "o" && arr[1][i][0] == "o" && arr[2][i][0] == "o") {return "o";}
    }

    // check diagonals
    if (arr[0][0][0] == "b" && arr[1][1][0] == "b" && arr[2][2][0] == "b") {return "b";}
    else if (arr[0][0][0] == "o" && arr[1][1][0] == "o" && arr[2][2][0] == "o") {return "o";}

    if (arr[2][0][0] == "b" && arr[1][1][0] == "b" && arr[0][2][0] == "b") {return "b";}
    else if (arr[2][0][0] == "o" && arr[1][1][0] == "o" && arr[0][2][0] == "o") {return "o";}

    // no winner
    return 0;
  }

  
  onTilePress = (row, col) => {


    // set the current tile
    var arr = this.state.gameState.slice();
    var x = []

    if (this.state.currentPlayer == 1) {
      for (let i = 0; i < this.state.bluePieces.length; i++) {
        x.push({text: this.convertCodes(this.state.bluePieces[i]), onPress: () => {
          var value = this.state.gameState[row][col];
          if (value != 0) { // if tile is filled or not
            if (value[0] == "b") {Alert.alert("Hey!", "You can't place that there!"); // check if piece on tile is blue, don't allow piece to be placed
            } else if (value[0] != "b") { // check if piece on tile is orange
              if (value[1] < this.state.bluePieces[i][1]) { // if orange piece is smaller than the blue piece 
                arr[row][col] = this.state.bluePieces[i]; 
                this.setState({gameState: arr});  
                this.state.bluePieces.splice(i, 1);
                this.setState({currentPlayer: this.state.currentPlayer * -1}); 
                //check for winner
                var winner = this.getWinner();
                if (winner == "b") {
                  Alert.alert("Blue wins the game!");
                  this.initializeGame();
                } else if (winner == "o") {
                  Alert.alert("Orange wins the game!");
                  this.initializeGame();
                }
              } else if (value[1] > this.state.bluePieces[i][1] || value[1] == this.state.bluePieces[i][1]) { // if blue piece isn't bigger than orange piece
                Alert.alert("Hey!", "You can't place that there!");
              }
            }
            
          } else { // if tile is not filled
            arr[row][col] = this.state.bluePieces[i]; 
            this.setState({gameState: arr});  
            this.state.bluePieces.splice(i, 1);
            this.setState({currentPlayer: this.state.currentPlayer * -1}); 
            //check for winner
            var winner = this.getWinner();
            if (winner == "b") {
              Alert.alert("Blue wins the game!");
              this.initializeGame();
            } else if (winner == "o") {
              Alert.alert("Orange wins the game!");
              this.initializeGame();
            }
          }
          
        
        } });
      }
      x.push({text: "Cancel", onPress: () => {return} })
    } else if (this.state.currentPlayer == -1) {
      for (let i = 0; i < this.state.orangePieces.length; i++) {
        x.push({text: this.convertCodes(this.state.orangePieces[i]), onPress: () => {
          var value = this.state.gameState[row][col];
          if (value != 0) { // if tile is filled or not
            if (value[0] == "o") {Alert.alert("Hey!", "You can't place an orange piece on an orange piece!"); // check if piece on tile is orange, don't allow piece to be placed
            } else if (value[0] != "o") { // check if piece on tile is blue
              if (value[1] < this.state.orangePieces[i][1]) { // if blue piece is smaller than the orange piece 
                arr[row][col] = this.state.orangePieces[i]; 
                this.setState({gameState: arr});  
                this.state.orangePieces.splice(i, 1);
                this.setState({currentPlayer: this.state.currentPlayer * -1});
                //check for winner
                var winner = this.getWinner();
                if (winner == "b") {
                  Alert.alert("Blue wins the game!");
                  this.initializeGame();
                } else if (winner == "o") {
                  Alert.alert("Orange wins the game!");
                  this.initializeGame();
                } 
              } else if (value[1] > this.state.orangePieces[i][1] || value[1] == this.state.orangePieces[i][1]) { // if orange piece isn't bigger than blue piece
                Alert.alert("Hey!", "You can't place that there!");
              }
            }
            
          } else { // if tile is not filled
            arr[row][col] = this.state.orangePieces[i]; 
            this.setState({gameState: arr});  
            this.state.orangePieces.splice(i, 1);
            this.setState({currentPlayer: this.state.currentPlayer * -1}); 
            //check for winner
            var winner = this.getWinner();
            if (winner == "b") {
              Alert.alert("Blue wins the game!");
              this.initializeGame();
            } else if (winner == "o") {
              Alert.alert("Orange wins the game!");
              this.initializeGame();
            }
          }
        
        } });
      }
      x.push({text: "Cancel", onPress: () => {return} })
    }

    Alert.alert("Select Piece", this.determineTurn(), x);

  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value) {
      case "b1": return <Image style={styles.pieceSmall} source={require('./assets/p1icon.png')} ></Image>;
      case "b2": return <Image style={styles.pieceMedium} source={require('./assets/p1icon.png')} ></Image>;
      case "b3": return <Image style={styles.pieceBig} source={require('./assets/p1icon.png')} ></Image>;

      case "o1": return <Image style={styles.pieceSmall} source={require('./assets/p2icon.png')} ></Image>;
      case "o2": return <Image style={styles.pieceMedium} source={require('./assets/p2icon.png')} ></Image>;
      case "o3": return <Image style={styles.pieceBig} source={require('./assets/p2icon.png')} ></Image>;

      default: return <View></View>
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}> 
        <Text style={[styles.turnText, {color: "#ff0000"}]}>Curent Turn:</Text>
        <Text style={[styles.turnText]}>{this.determineTurn()}</Text>
        <View style={{paddingBottom:25}}/>
        
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>{this.renderIcon(0,0)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.tile, {borderTopWidth: 0}]}>{this.renderIcon(0,1)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.tile, {borderTopWidth: 0, borderRightWidth: 0}]}>{this.renderIcon(0,2)}</TouchableOpacity>
        </View>
  
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile, {borderLeftWidth: 0}]}>{this.renderIcon(1,0)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={[styles.tile, ]}>{this.renderIcon(1,1)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile, {borderRightWidth: 0}]}>{this.renderIcon(1,2)}</TouchableOpacity>
        </View>
  
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>{this.renderIcon(2,0)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.tile, {borderBottomWidth: 0}]}>{this.renderIcon(2,1)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0}]}>{this.renderIcon(2,2)}</TouchableOpacity>
        </View>

        <StatusBar style="auto" />

        <View style={{paddingTop:25}}/>
        <Button title="Restart Game" onPress={this.onNewGamePress}/>
        <Button title="Back Home" onPress={() => navigate('Home')}/>
  
      </View>
    );
  }

}

const styles = StyleSheet.create({
  turnText: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
  },

  pieceBig: {
    width: 80,
    height: 80,
    marginTop: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  pieceMedium: {
    width: 50,
    height: 50,
    marginTop: 20,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  pieceSmall: {
    width: 25,
    height: 25,
    marginTop: 30,
    marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  
});
