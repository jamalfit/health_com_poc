const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./Resolvers/resolvers');

async function startApolloServer() {
  const app = express();
  app.use(cors());  // This enables CORS for all routes

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // You can add context here if needed, e.g., for authentication
      return {};
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();