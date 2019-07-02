import React from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import firebase from 'firebase'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      header: null,
    }
    constructor(props){
      super(props)
      this.state = {email: '', password: '', isAuthenticated: false}
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
        
        firebaseSignIn = async () => {
          const { email, password } = this.state
          try{
            const user = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            this.setState({ isAuthenticated: true })
            this.props.navigation.navigate('TabNavigator')
          } catch(err){
              alert('Erro ao logar-se, caso o problema persista contate a central de atendimento')
            }
        }
    }

      render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                  <Text style={styles.title}>Logar-se</Text>
                  <TextInput
                    underlineColorAndroid="white"
                    style={styles.inputs}
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                  />
                  <TextInput
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
                    onPress={firebaseSignIn}
                    title="Logar-se"
                  />
                  <Text style={styles.buttonsText}></Text>
                  <Button
                    color="#4a4b4c"
                    onPress={() => this.props.navigation.navigate('Register')}
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
      marginTop: 70,
      marginBottom: 40,
      fontSize: 26,
      color: 'white',
    },
    inputView:{
      width: '90%',
    },
    inputs:{
      color: 'white',
      margin: 5,
    },
    buttonsView: {
      marginTop: 40,
      width: '90%',
    },
    buttonsText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
    },
  });
  