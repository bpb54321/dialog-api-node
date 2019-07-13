const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

function createDialog(root, args, context) {
  const userId = getUserId(context);
  let dialog = {
    name: args.name,
    roles: {
      create: args.roles,
    },
    lines: {
      create: args.lines,
    }
  };
  return context.prisma.createDialog(dialog);
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({email: args.email});
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({userId: user.id}, APP_SECRET)

  return {
    token,
    user,
  }
}

module.exports = {
  createDialog,
  signup,
  login,
};