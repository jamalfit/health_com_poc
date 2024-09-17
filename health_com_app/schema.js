const { gql } = require('apollo-server');

// Define your GraphQL schema
const typeDefs = gql`
  type Staff {
    id: ID!
    name: String!
    role: String!
    wearableId: String!
    messages: [Message!]!
    acknowledgedMessages: [Message!]!
    location: StaffLocation
    wearable: Wearable
  }

  type Location {
    id: ID!
    name: String!
    description: String
    beaconId: String!
    messages: [Message!]!
    staff: [StaffLocation!]!
    tablets: [Tablet!]!
    beacons: [LocationBeacon!]!
  }

  type Message {
    id: ID!
    content: String!
    sender: Staff!
    location: Location!
    timestamp: DateTime!
    acknowledged: Boolean!
    acknowledgedAt: DateTime
    acknowledgedBy: Staff
  }

  type StaffLocation {
    staff: Staff!
    location: Location!
    lastUpdated: DateTime!
  }

  type Wearable {
    id: ID!
    deviceId: String!
    batteryLevel: Int!
    lastSeen: DateTime!
    staff: Staff!
  }

  type Tablet {
    id: ID!
    deviceName: String!
    location: Location!
    lastActive: DateTime!
  }

  type LocationBeacon {
    id: ID!
    beaconId: String!
    location: Location!
    lastSeen: DateTime!
  }

  type Query {
    allStaff: [Staff!]!
    allLocations: [Location!]!
    allMessages: [Message!]!
    staffById(id: ID!): Staff
    locationById(id: ID!): Location
    messageById(id: ID!): Message
  }

  type Mutation {
    createStaff(name: String!, role: String!, wearableId: String!): Staff!
    createLocation(name: String!, description: String, beaconId: String!): Location!
    createMessage(content: String!, senderId: ID!, locationId: ID!): Message!
    acknowledgeMessage(messageId: ID!, staffId: ID!): Message!
    updateStaffLocation(staffId: ID!, locationId: ID!): StaffLocation!
  }

  scalar DateTime
`;

module.exports = typeDefs;