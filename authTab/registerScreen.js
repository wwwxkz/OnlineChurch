import React from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import firebase from 'firebase'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Registre-se',
    headerStyle: {
      backgroundColor: '#4a4b4c',
    },
    headerTitleStyle: {
      color: 'white',
    },
  }
    constructor(props){
      super(props)
      this.state = {name: '', number: '', email: '', password: '', isAuthenticated: false}
      this.componentWillMount = this.componentWillMount.bind(this)
    }
    async componentWillMount() {
      var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
    }
        if(!firebase.apps.length) {firebase.initializeApp(config)}
        
        firebaseSignUp = async () => {
          const { email, password, name, number } = this.state
          if (name != '' && number != ''){
            try{
              var user = await firebase.auth().createUserWithEmailAndPassword(email, password)
              var user = firebase.auth().currentUser
              firebase.database().ref('users/'+user.uid).set({
                  'name': name,
                  'email': email,
                  'number': number,
              })
              this.setState({ isAuthenticated: true })
              this.props.navigation.navigate('TabNavigator')
            } catch(err){
                alert('Erro ao criar usuario (caso o problema persista contate a central de atendimento)')
              }
          } else {
            alert('Nome ou(e) numero não preenchido')
          }
      }
    }

      render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                  <Text style={styles.title}>Se torne um fiel da Bom Jesus</Text>
                  <TextInput
                    maxLength = {35}
                    underlineColorAndroid="white"
                    style={styles.inputs}
                    placeholder="Nome"
                    placeholderTextColor="white"
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}
                  />
                  <TextInput
                    maxLength = {15}
                    underlineColorAndroid="white"
                    style={styles.inputs}
                    placeholder="Telefone"
                    placeholderTextColor="white"
                    value={this.state.number}
                    onChangeText={number => this.setState({number})}
                  />
                  <TextInput
                    maxLength = {30}
                    underlineColorAndroid="white"
                    style={styles.inputs}
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                  />
                  <TextInput
                    maxLength = {30}
                    underlineColorAndroid="white"
                    style={styles.inputs}
                    placeholder="Senha"
                    placeholderTextColor="white"
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                  />
                </View>
                <View style={styles.buttonsView}>
                  <Button
                    color="#4a4b4c"
                    onPress={firebaseSignUp}
                    title="Registrar-se"
                  />
                </View>
            </View>
        );
      }

}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3480f9',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    title: {
      marginTop: 25,
      marginBottom: 40,
      fontSize: 22,
      color: 'white',
    },
    inputView:{
      width: '90%',
    },
    inputs:{
      color:'white',
      margin: 5,
    },
    buttonsView: {
      marginTop: 40,
      width: '90%',
    },
  });
  