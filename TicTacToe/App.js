import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0],
      ],
currentPlayer: 'X',
}
}
componentDidMount() {
  this.IntializeGame();
}

IntializeGame  = () => {
  this.setState({gameState: [
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ],
  });
}
onTilePress = (row,col) => {

  var value = this.state.gameState[row][col];
  if (value !== 0 ) { return;}

  //defining beginner player
  var currentPlayer = this.state.currentPlayer;
  
  var arr = this.state.gameState.slice();
  arr[row][col] = currentPlayer;
  this.setState({gameState: arr});

  //changing player, doesn't work
  var nextPlayer = (currentPlayer == 'X') ? 'O' : 'X';
  this.setState({currentPlayer: nextPlayer});
}

playAgain = () => {
  this.setState({gameState: [
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ],}); 
}
RenderIcon = (row,col) => {
  var value = this.state.gameState[row][col];
  switch(value){
    case 'X': return <Icon name="close" style={styles.tileX} />;
    case 'O': return <Icon name="circle-outline" style={styles.tileO} />;
    default: return <View/>;
  }
}

render (){
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
      <Text style={styles.bannerText}>TicTacToe</Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={styles.title} onPress={() => this.onTilePress(0,0)}>
          {this.RenderIcon(0,0)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.title} onPress={() => this.onTilePress(0,1)}>
          {this.RenderIcon(0,1)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.title} onPress={() => this.onTilePress(0,2)}>
        {this.RenderIcon(0,2)}
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={styles.title} onPress={() => this.onTilePress(1,0)}>
        {this.RenderIcon(1,0)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.title} onPress={() => this.onTilePress(1,1)}>
        {this.RenderIcon(1,1)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.title} onPress={() => this.onTilePress(1,2)}>
        {this.RenderIcon(1,2)}
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={styles.title} onPress={() => this.onTilePress(2,0)}>
        {this.RenderIcon(2,0)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.title} onPress={() => this.onTilePress(2,1)}>
        {this.RenderIcon(2,1)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.title} onPress={() => this.onTilePress(2,2)}>
        {this.RenderIcon(2,2)}
        </TouchableOpacity>
      </View>
      <View style={{marginTop:30, fontSize: 20, marginBottom: 20}}><Text style={{textAlign: "center"}}>The next player is: {this.state.currenPlayer}</Text></View>
      <View style={styles.playButton}>
      <Button color="#E2C547" title="Play again" onPress={() => this.playAgain()}></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  /* 
  Just the styling of the app
  */
  container: {
    flex: 1,
    backgroundColor: '#cee0d2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: "#3EB1B5",
    marginBottom: 30,
    width: 300,
    textAlign: 'center',
  },
  bannerText: {
    fontSize: 30,
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
  },
  title: {
    borderWidth: 0.5,
    width: 100,
    height: 100,
  },
  tileX: {
    color: "green",
    fontSize: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 18,
    paddingTop: 18,
  },
  tileO: {
  color: "yellow",
  fontSize: 60,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 18,
  paddingTop: 18,
  },
  playButton: {
  width: 300,
  textAlign: 'center',
  }
});
