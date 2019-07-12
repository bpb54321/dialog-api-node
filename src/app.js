const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');


const resolvers = {
  Query: {
    dialogs: (root, args, context, info) => {
      return context.prisma.dialogs();
    },
  },
  Mutation: {
    createDialog: (root, args, context) => {
        let dialog = {
          name: args.name,
          roles: args.roles,
          lines: args.lines,
        };
        return context.prisma.createDialog(dialog);
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
