import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput
} from 'react-native'

import { graphql, compose } from 'react-apollo'
import uuidV4 from 'uuid/v4'
import CreateCity from './mutations/CreateCity'
import ListCities from './queries/ListCities'

import { Auth } from 'aws-amplify'

class Home extends React.Component {
  state = {
    name: '',
    country: '',
    identity: {}
  }
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({ identity: user.signInUserSession.accessToken.payload })
      })
  }
  addCity = () => {
    const { name, country, identity } = this.state
    this.props.onAdd({
      id: uuidV4(),
      name,
      country
    })
    this.setState({
      name: '',
      country: ''
    })
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  render() {
    console.log('props: ', this.props)
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.name}
          style={styles.input}
          placeholder='City'
          onChangeText={val => this.onChangeText('name', val)}
        />
        <TextInput
          value={this.state.country}
          style={styles.input}
          placeholder='Country'
          onChangeText={val => this.onChangeText('country', val)}
        />
        <Button
          title='Add City'
          onPress={this.addCity}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  input: {
    height: 45,
    borderBottomColor: '#4CAF50',
    borderBottomWidth: 2,
    margin: 10
  }
})

export default compose(
  graphql(ListCities, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => {
      console.log('props from compose: ', props)
      return {
        cities: props.data.listCities ? props.data.listCities.items : [] 
      }
    }
  }),
  graphql(CreateCity,{
    props: props => ({
      onAdd: city => props.mutate({
        variables: city
      })
    })
  })
)(Home)
