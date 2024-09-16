# Healthcare Messaging System with React, Prisma, and Apollo Server

## 1. System Overview

This messaging system for healthcare facilities utilizes a modern tech stack with React for the frontend, Prisma for database management, and Apollo Server for GraphQL API. The system enables efficient, location-based communication among staff members across different areas of the facility with automatic location tracking.

## 2. Core Technologies

- Frontend: React
- Backend: Node.js with Express and Apollo Server
- Database ORM: Prisma
- Database: PostgreSQL
- Real-time Communication: Apollo Subscriptions and MQTT
- API: GraphQL
- Location Technology: Bluetooth Low Energy (BLE)

## 3. Key Components

### 3.1 Staff Wearables
- Small BLE-enabled devices worn by staff
- Continuously broadcast a unique identifier
- Long battery life (several weeks to months)

### 3.2 Facility Tablets
- Tablets (e.g., iPads or Android tablets) mounted throughout the facility
- Run React web application for message display
- Connected to USB-powered BLE scanners for detecting staff wearables

### 3.3 BLE Scanners
- USB-powered devices connected to facility tablets
- Continuously scan for staff wearables and location beacons

### 3.4 Location Beacons
- Placed throughout the facility
- Emit unique identifiers for precise location reference

### 3.5 Central Server
- Hosts Node.js application with Apollo Server
- Manages GraphQL API for data querying and mutations
- Handles real-time subscriptions for live updates

### 3.6 Prisma ORM
- Manages database schema and migrations
- Provides type-safe database access

### 3.7 PostgreSQL Database
- Stores all system data including messages, staff info, and locations

### 3.8 MQTT Broker
- Handles publish/subscribe messaging for real-time updates
- Used in conjunction with Apollo Subscriptions for redundancy

## 4. Prisma Schema

```prisma
model Staff {
  id          String   @id @default(uuid())
  name        String
  role        String
  wearableId  String   @unique
  location    StaffLocation?
  sentMessages Message[] @relation("SentMessages")
  acknowledgedMessages Message[] @relation("AcknowledgedMessages")
}

model Location {
  id          String   @id @default(uuid())
  name        String   @unique
  description String?
  beaconId    String   @unique
  messages    Message[]
  staffLocations StaffLocation[]
}

model Message {
  id          String   @id @default(uuid())
  content     String
  senderId    String
  sender      Staff    @relation("SentMessages", fields: [senderId], references: [id])
  locationId  String
  location    Location @relation(fields: [locationId], references: [id])
  timestamp   DateTime @default(now())
  acknowledged Boolean @default(false)
  acknowledgedAt DateTime?
  acknowledgedById String?
  acknowledgedBy Staff? @relation("AcknowledgedMessages", fields: [acknowledgedById], references: [id])
}

model StaffLocation {
  staffId     String   @id
  staff       Staff    @relation(fields: [staffId], references: [id])
  locationId  String
  location    Location @relation(fields: [locationId], references: [id])
  lastUpdated DateTime @default(now())

  @@index([locationId])
}
```

## 5. GraphQL Schema (Core Types and Operations)

```graphql
type Staff {
  id: ID!
  name: String!
  role: String!
  wearableId: String!
  location: Location
}

type Location {
  id: ID!
  name: String!
  description: String
  beaconId: String!
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

type Query {
  staff(id: ID!): Staff
  allStaff: [Staff!]!
  location(id: ID!): Location
  allLocations: [Location!]!
  messages(locationId: ID): [Message!]!
  unacknowledgedMessages: [Message!]!
}

type Mutation {
  createMessage(content: String!, senderId: ID!, locationId: ID!): Message!
  acknowledgeMessage(messageId: ID!, staffId: ID!): Message!
  updateStaffLocation(staffId: ID!, locationId: ID!): StaffLocation!
}

type Subscription {
  messageCreated(locationId: ID): Message!
  staffLocationChanged: StaffLocation!
}
```

## 6. Key Features

1. Automatic staff location tracking using BLE wearables
2. Real-time message delivery based on staff location
3. Message display and acknowledgment on facility tablets
4. GraphQL API with Apollo Server for efficient data fetching
5. Prisma for type-safe database operations
6. React frontend for responsive and interactive UI

## 7. Frontend Components (React)

### 7.1 Main Dashboard
- Displays messages for the current location
- Shows staff present at the location
- Provides interface for sending new messages

### 7.2 Message List
- Renders list of messages with real-time updates
- Implements infinite scrolling for message history

### 7.3 Staff Presence Display
- Shows staff currently at the location
- Updates in real-time as staff move

### 7.4 Message Composition
- Form for creating and sending new messages
- Ability to select message recipients based on location or role

### 7.5 Admin Panel
- Interface for managing staff, locations, and system settings
- Provides analytics and reporting features

## 8. Backend Services

### 8.1 Apollo Server
- Implements GraphQL schema and resolvers
- Handles queries, mutations, and subscriptions

### 8.2 Location Tracking Service
- Processes BLE scan data from facility tablets
- Updates staff locations in real-time

### 8.3 Message Routing Service
- Determines relevant recipients for each message
- Triggers notifications and updates to appropriate tablets

### 8.4 MQTT Service
- Manages MQTT connections for redundant real-time updates
- Publishes location changes and new messages

## 9. Development and Deployment Strategy

1. Backend Development (5 weeks)
   - Set up Node.js with Apollo Server
   - Implement Prisma schema and migrations
   - Develop GraphQL resolvers and business logic

2. Frontend Development (6 weeks)
   - Create React application structure
   - Implement Apollo Client for GraphQL interactions
   - Develop main components and admin interface

3. BLE Integration (3 weeks)
   - Develop service to handle BLE scan data
   - Integrate location tracking with backend services

4. Testing and Integration (3 weeks)
   - Conduct unit and integration testing
   - Perform end-to-end testing of entire system

5. Pilot Deployment (2 weeks)
   - Deploy in one department
   - Gather and incorporate feedback

6. Full Deployment and Training (3 weeks)
   - Roll out to entire facility
   - Conduct staff training on system use

Total Estimated Time: 22 weeks

## 10. Security and Privacy Considerations

- Implement JWT authentication for API access
- Encrypt all data in transit (HTTPS for API, TLS for MQTT)
- Regularly rotate BLE wearable identifiers to prevent tracking
- Implement strict access controls based on staff roles
- Conduct regular security audits and penetration testing

## 11. Future Enhancements

- Implement React Native mobile app for admin use
- Add support for voice-activated messaging
- Integrate with other hospital systems (EHR, scheduling)
- Implement AI for message prioritization and smart routing

This specification outlines a modern, efficient healthcare messaging system using React, Prisma, and Apollo Server, with automatic staff location tracking and real-time communication features.
