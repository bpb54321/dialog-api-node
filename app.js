const { GraphQLServer } = require('graphql-yoga');
let { testDialogs } = require('./data');


const resolvers = {
  Query: {
    dialogs: () => testDialogs,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
