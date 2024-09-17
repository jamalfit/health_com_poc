const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./Resolvers/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // You can add context here if needed, e.g., for authentication
    return {};
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});