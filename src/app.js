const { GraphQLServer } = require('graphql-yoga');
let { testDialogs } = require('./data');


const resolvers = {
  Query: {
    dialogs: () => testDialogs,
  },
  Mutation: {
    createDialog: (parent, args) => {
        let dialog = {
          name: args.name,
          roles: args.roles,
          lines: args.lines,
        };
        testDialogs.push(dialog);
        return dialog;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
