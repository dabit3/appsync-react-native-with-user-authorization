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

class AddCity extends React.Component {
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
    justifyContent: 'center'
  },
  input: {
    height: 45,
    borderBottomColor: '#4CAF50',
    borderBottomWidth: 2,
    margin: 10
  }
})

export default compose(
  graphql(CreateCity,{
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      onAdd: city => props.mutate({
        variables: city,
        optimisticResponse: {
          __typename: 'Mutation',
          createCity: { ...city,  __typename: 'City' }
        },
        update: (proxy, { data: { createCity } }) => {
          const data = proxy.readQuery({ query: ListCities })
          let stopExecuting = false
          data.listCities.items.map(item => {
            if (item.id === createCity.id) {
              stopExecuting = true
            }
          })
          if (stopExecuting) return
          data.listCities.items.push(createCity)
          proxy.writeQuery({ query: ListCities, data })
        }
      })
    })
  })
)(AddCity)
