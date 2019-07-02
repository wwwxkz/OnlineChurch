import React from "react";
import { StyleSheet, Image, View, Text, Button, ScrollView } from "react-native";
import firebase from 'firebase'
import { AdMobBanner } from 'react-native-admob'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Salmos',
    headerStyle: {
      backgroundColor: '#4a4b4c',
    },
    headerTitleStyle: {
      color: 'white',
    },
  }
  constructor(props){
    super(props)
    this.state = {rPosts:[]}
    this.componentWillMount = this.componentWillMount.bind(this)
  }
  async componentWillMount() {
    var config = {
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
  }
    if(!firebase.apps.length) {firebase.initializeApp(config)}
    var user = firebase.auth().currentUser
    if(user){
      // user is signed in
    } else {
      this.props.navigation.navigate('Auth')
      alert('Não esta logado hein espertinho')
    }
    firebase.database().ref('psalms').once('value', (data) => {
      var instance = this.state
      var output = data.toJSON()
      var jPosts = []
      for (let i = 0; i < Object.keys(output).length; i++){
        jPosts.push(
          <View style={styles.post} key={i}>
          <View style={styles.postTitle}>
            <Text style={styles.postTitleText}>{output[i].title}</Text>
          </View>
          <View style={styles.postContent}>
            <Text style={styles.postContentText}>{output[i].content}</Text>
          </View>
        </View>
        )
        jPosts.push(
          <AdMobBanner key={i + Object.keys(output).length}
          adSize="fullBanner"
          adUnitID=""
          />
        )
      }
      instance.rPosts = jPosts
      this.setState(instance)
    })
  }

    render() {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.posts}>
            
            { this.state.rPosts }

          </View>
        </ScrollView>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d3d3d',
  },
  posts: {
  },
  post: {
    backgroundColor: '#565656',
    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
    alignContent: 'center',
  },
  postTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postTitleText:{
    color: 'white',
    fontSize: 18,
    margin: 5,
  },
  postTitleDate:{
    color: 'white',
    fontSize: 16,
    margin: 5,
  },
  postContent:{
    margin: 10,
  },
  postContentText:{
    color: 'white',
  },
  images: {
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 150,
  },
});
