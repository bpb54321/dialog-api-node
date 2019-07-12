const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Query {
    info: String!
  }

  type Dialog {
    _id: ID!
    name: String!
    roles: [Role]!
    lines: [Line]!
  }

  type Role {
    _id: ID!
    name: String!
  }

  type Line {
    _id: ID!
    text: String!
    guess: String!
    role: Role!
    number: Int!
  }
`;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));