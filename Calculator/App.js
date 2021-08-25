import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('0');
  const [num2, setNum2] = useState('0');
  const [result, setResult] = useState('0');

  const buttonPressed = (calc) =>  { 
    if (calc === '+') setResult(parseInt(num1) + parseInt(num2)+""); // if user pushes '+'-button, program will add up two given numbers (num1 + num2)
    else if (calc === '-') setResult(parseInt(num1) - parseInt(num2)+""); // if user pushes '-'-button, program will subtract two given numbers (num1 - num2)
    else if (calc === '/') setResult(parseInt(num1) / parseInt(num2)+""); // if user pushes '*'-button, program will multiply two given numbers (num1 * num2)
    else if (calc === '*') setResult(parseInt(num1) * parseInt(num2)+""); // if user pushes '/'-button, program will make an divide two given numbers (num1 / num2)
    Keyboard.dismiss();
  } 
  /* 
  here the code shows the buttons for calculating 
  makes changing given numbers possible 
  shows the answer for the calculation
  and makes changing the answer impossible
  */
  return (
    <View style={styles.container}>
      <Text style={styles.aalesCalculator}>Aale´s Calculator</Text>
      <View style={styles.row}>
          <View style={styles.text}>
            <Text>Number 1:</Text>
          </View>
            <TextInput placeholder="0" style={{textAlign:'right'}} editable={true} value={num1} onChangeText={text => setNum1(text)}></TextInput> 
            </View> 
        <View style={styles.row}>
          <View style={styles.text}>
            <Text>Number 2:</Text>
          </View>
          <TextInput placeholder="0" style={{textAlign:'right'}} editable={true} value={num2} onChangeText={text => setNum2(text)}></TextInput>
          </View>
          <View style={styles.buttonRow}>
            <Button title="  +  " color="#006400" onPress={() => buttonPressed ('+')}/> 
            <Button title="  -  " color="#006400" onPress={() => buttonPressed ('-')}/>
            <Button title="  *  " color="#006400" onPress={() => buttonPressed ('*')}/>
            <Button title="  /  " color="#006400" onPress={() => buttonPressed ('/')}/>
          </View>
          <View style={styles.row}>
            <Text style={styles.textInput}>Result:</Text>
        <TextInput placeholder="0" style={{borderBottomWidth: 1, textAlign:'right',}} editable={false} value={result}></TextInput>
        </View>
      <StatusBar style="auto" />
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aalesCalculator: {
fontSize: 40,
fontWeight: 'bold',
marginBottom: 20
  },
  row: {
  flexDirection: 'row',
  marginTop: 3
  },
  text: {
  backgroundColor: '#ff00ff',
  justifyContent: 'center',
  padding: 3,
  width: 80,
  },
  textInput: {
  justifyContent: 'center',
  padding: 3,
  borderBottomWidth: 1.0,
  width: 80,
  marginLeft: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: 200
  },
  space: {
    width: 30,
  },
});
