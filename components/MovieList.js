import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Button, Alert  } from 'react-native';

export default class MovieList extends React.Component {

  _onPressButton(item) {
    Alert.alert(
      'Release Year',
      item.releaseYear,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  constructor(props){
    super(props);
    this.state ={ isLoading: true, year: 1900}
  }

  async getMovies() {
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson.movies,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }

  async componentDidMount(){
    return await this.getMovies()
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          </View>
        </View>

      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={
          ({item}) => 
              <View style={styles.buttonContainer}>
                  <Button 
                  style={styles.buttons} 
                  onPress={() => this._onPressButton(item)} 
                  title={item.title}
                  />
              </View>
            

          }
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});