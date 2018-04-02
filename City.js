import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput
} from 'react-native'

import { graphql, compose } from 'react-apollo'

class City extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>City</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
})

export default City
