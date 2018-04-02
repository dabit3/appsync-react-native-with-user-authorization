import gql from 'graphql-tag'

export default gql`
  query listCities {
    listCities {
      items {
        id
        name
        country
      }
    }
  }
`