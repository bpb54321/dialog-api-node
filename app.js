const { GraphQLServer } = require('graphql-yoga');
let { testDialogs } = require('./data');

const typeDefs = `
  type Query {
    dialogs: [Dialog!]!
  }

  type Dialog {
    id: ID!
    name: String!
    roles: [Role!]!
    lines: [Line!]!
  }

  type Role {
    id: ID!
    name: String!
  }

  type Line {
    id: ID!
    text: String!
    guess: String!
    role: Role!
    number: Int!
  }
`;

const resolvers = {
  Query: {
    dialogs: () => testDialogs,
  },
  Dialog: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    roles: (parent) => parent.roles,
    lines: (parent) => parent.lines,
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
