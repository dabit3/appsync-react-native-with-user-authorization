import gql from 'graphql-tag'

export default gql`
  mutation createCity(
    $id: ID!,
    $name: String!,
    $country: String!
  ) {
    createCity(input: {
      id: $id,
      name: $name,
      country: $country
    }) {
      id
      name
      country
    }
  }
`