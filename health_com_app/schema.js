const { gql } = require('apollo-server');

const typeDefs = gql`
  type Staff {
    id: ID!
    name: String!
    role: String!
    wearableId: String!
  }

  type Location {
    id: ID!
    name: String!
    description: String
    beaconId: String!
  }

  # ... (include all the types from the previous schema here)

  type Query {
    staff(id: ID!): Staff
    allStaff: [Staff!]!
    location(id: ID!): Location
    allLocations: [Location!]!
    # ... (include all the queries from the previous schema here)
  }

  type Mutation {
    createStaff(name: String!, role: String!, wearableId: String!): Staff!
    updateStaff(id: ID!, name: String, role: String, wearableId: String): Staff!
    deleteStaff(id: ID!): Staff
    # ... (include all the mutations from the previous schema here)
  }

  scalar DateTime
`;

module.exports = typeDefs;