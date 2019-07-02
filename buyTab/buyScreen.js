import React from "react";
import { ScrollView, Image, StyleSheet, View, Text, Button } from "react-native";
import firebase from 'firebase'
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from 'react-native-admob'

export default class BuyScreen extends React.Component {
  static navigationOptions = {
    title: 'Lojinha',
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
    this.buyTravel = this.buyTravel.bind(this)
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

    firebase.database().ref('products').once('value', (data) => {
      var user = firebase.auth().currentUser
      if(user){
        // user is signed in
      } else {
        this.props.navigation.navigate('Auth')
        alert('Não esta logado hein espertinho')
      }
      var instance = this.state
      var output = data.toJSON()
      var jPosts = []
      for (let i = 0; i < Object.keys(output).length; i++){
        jPosts.push(
          <View style={styles.post} key={i}>
          <View style={styles.postTitle}>
            <Text style={styles.postTitleText}>{output[i].title}</Text>
            <Text style={styles.postTitleDate}>{output[i].date}</Text>
          </View>
          <View style={styles.postContent}>
            <Text style={styles.postContentText}>{output[i].content}</Text>
            <View style={styles.images}>
              <Image
              style={styles.image}
              source={{uri:output[i].image}}/>
            </View>
            <Text style={styles.lastperson}>{output[i].lastperson} e outros {output[i].reserved} iram a(ao) {output[i].title}</Text>
            <View style={styles.buttons}>
              <Button
              color="#3480f9"
              title="Eu Irei"
              onPress={() => this.buyTravel(i,output[i].reserved)}
              />
            </View>
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
  buyTravel = (i, rNum) => {
    var user = firebase.auth().currentUser
    if(user){
      firebase.database().ref('users/'+user.uid+'/name').once('value', (data) => {
        regExp = /["|']/g
        output = JSON.stringify(data)
        output = output.replace(regExp,"")
        output = output.substring(0,1).toUpperCase().concat(output.substring(1))
        firebase.database().ref('products/'+i).update({
          'reserved': Number(rNum) + 1,
          'lastperson': output,
        })
        alert('Item reservado com sucesso')
      })
      AdMobInterstitial.setAdUnitID('')
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd())
    } else {
      alert('Você não esta logado espertinho')
    }
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
  lastperson: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
  buttons: {
    marginTop: 10,
  },
});
