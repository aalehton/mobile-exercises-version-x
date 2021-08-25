import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import MovieDetailScreen from './MovieDetailScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

function MoviesList(props) {

  const [movies, setMovies] = useState([]); 

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/550?api_key=576c3137cd1a3bf64cd1e012a692f2b4')
      .then(response => {
        // Here it will get the movie data
        console.log(response.data.results);
        setMovies(response.data.results);
      })
      //If it doesn't find a movie, it will send "Loadin, please wait" message
      if (movies.length === 0) {
        return(
          <View style={{flex: 1, padding: 20}}>
            <Text>Loading, please wait...</Text>
          </View>
        )
      }
      let movieItems = movies.map(function(movie,index){
        return (
          <TouchableHighlight onPress={_ => itemPressed(index)} 
                    underlayColor="lightgray" key={index}>
          <MovieListItem movie={movie} key={index}/>
          </TouchableHighlight>
        )
      });
    
      const itemPressed = (index) => {
        props.navigation.navigate(
          'MovieDetails',
          { movie: movies[index] });
        }      

      return (
        <ScrollView>
          {movieItems}
        </ScrollView>
      )
    }
    )};

function MovieListItem(props) {
  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
  let imageurl = IMAGEPATH + props.movie.poster_path;

  return(
<View style={styles.movieItem}>
      <View style={styles.movieItemImage}>
        <Image source={{uri: imageurl}} style={{width: 99, height: 146}} />
      </View>
      <View style={{marginRight: 50}}>
        <Text style={styles.movieItemTitle}>{props.movie.title}</Text>
        <Text style={styles.movieItemText}>{props.movie.release_date}</Text>
        <Text numberOfLines={6} ellipsizeMode="tail" style={styles.movieItemText}>{props.movie.overview}</Text>
      </View> 
    </View>
  )
}

const MovieListScreen: () => Node = ({ navigation }) => {

  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
          <MoviesList navigation={ navigation }/>
          <MoviesList/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: 'row'
  },
  movieItemImage: {
    marginRight: 5
  },
  movieItemTitle: {
    fontWeight: 'bold',
  },
  movieItemText: {
    flexWrap: 'wrap'
  }
});

export default MovieListScreen;