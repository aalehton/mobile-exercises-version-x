import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Keyboard } from 'react-native';

function ToDoList() {

  const [item, setItem] = useState(""); 
  const [itemList, setItemList] = useState([]);

  const addToDoItem = () => { 
    if (item !== '') {
        setItemList([...itemList, {id: Math.random(), text: item}])
        setItem('')
      }
      Keyboard.dismiss();
    }

    const removeItem = (id) => {
      const newItems = itemList.filter(item => item.id !== id);
      setItemList(newItems);
    }
    
  return (
    <View>
      <View style={styles.addToDo}>
      <TextInput style={styles.addToDoTextInput} onChangeText={(text) => setItem(text)}  placeholder="Write a new todo here" value={item} editable={true} />
        <Button title="Add" style={styles.addTodoButton} color='#98CAA6' onPress={addToDoItem}/>
      </View>
      <ScrollView style={styles.list}>
      {itemList.map( (item,index) => (
        <View key={index} style={styles.listItem}>
        <Text style={styles.listItemText}>* {item.text}</Text>
        <Text 
          style={styles.listItemDelete} 
          onPress={() => removeItem(item.id)}>X</Text>
</View>
))}
      </ScrollView>   
    </View>
  );
}

function Banner() {
  return (
    <View style={styles.aalesBanner}>
      <Text style={styles.aalesBannerText}>ToDo example with React Native</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <ToDoList />
      <StatusBar style="auto" /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    margin: 5
  },
  aalesBanner: {
    backgroundColor: '#006400', 
    justifyContent: 'center',
    marginBottom: 20
  },
  aalesBannerText : {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  addToDo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addToDoTextInput : {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    padding: 5,
    margin: 2,
    flex: 1,
  },
  list: {
    color: 'black',
    margin: 2,
  },
  listItem: {
    flex: 1, 
    flexDirection: 'row',
    margin: 5
  },
  listItemText: {
  },
  listItemDelete: {
    marginStart: 10,
    color: '#BF0413',
    fontWeight: 'bold'
  },
});
