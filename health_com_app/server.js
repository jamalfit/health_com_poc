const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema'); // Your GraphQL schema
const resolvers = require('./Resolvers/resolvers'); // The resolvers defined above

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});