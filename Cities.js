import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native'

import { graphql, compose } from 'react-apollo'
import ListCities from './queries/ListCities'
import City from './City'

import { Auth } from 'aws-amplify'
import { StackNavigator } from 'react-navigation'

class Cities extends React.Component {
  navigate = () => {
    this.props.navigation.navigate('City')
  }
  render() {
    return (
      <View style={styles.container}>
       {
         this.props.cities.map((city, index) => (
           <TouchableOpacity onPress={this.navigate} key={index}>
            <View>
              <Text>{city.name}</Text>
            </View>
           </TouchableOpacity>
         ))
       }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  }
})

const CitiesWithData = compose(
  graphql(ListCities, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      cities: props.data.listCities ? props.data.listCities.items : [],
    })
  })
)(Cities)

export default StackNavigator({
  Cities: { screen: CitiesWithData },
  City: { screen: City }
})
