import React from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button
} from 'react-native'

import { Auth } from 'aws-amplify'

class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    user: {},
    authCode: ''
  }
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.props.navigation.navigate('AppNav')
      })
      .catch(err => console.log('err: ', err))
  }
  onChangeText(key, value) {
    this.setState({ [key]: value })
  }
  signIn = () => {
    const { username, password } = this.state
    Auth.signIn(username, password)
      .then(user => {
        console.log('successful sign in!')
        this.setState({ user })
      })
      .catch(err => {
        console.log('error signin in!: ', err)
      })
  }
  confirmSignIn = () => {
    const { authCode, user } = this.state
    Auth.confirmSignIn(user, authCode)
      .then(() => {
        console.log('successful confirm sign in!')
        this.props.navigation.navigate('AppNav')
      })
      .catch(err => {
        console.log('error confirming signin in!: ', err)
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder='User Name'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={val => this.onChangeText('username', val)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          onChangeText={val => this.onChangeText('password', val)}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title="Sign In"
          onPress={this.signIn}
        />

        <TextInput
          placeholder='Authorization Code'
          onChangeText={val => this.onChangeText('authCode', val)}
          style={styles.input}
        />
        <Button
          title='Confirm Sign In'
          onPress={this.confirmSignIn}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#4CAF50',
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    height: 50,
    margin: 10
  }
})

export default SignIn