"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Dialog",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Line",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/brian-blosser/dialog-api-node/dev`
});
exports.prisma = new exports.Prisma();
