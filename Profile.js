import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'

import { Auth } from 'aws-amplify'

class Profile extends React.Component {
  signOut = () => {
    Auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Tabs')
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.signOut}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  buttonText: {
    color: 'white'
  }
})

export default Profile
