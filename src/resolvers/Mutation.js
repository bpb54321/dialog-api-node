const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

exports.createDialog = async function(root, args, context, info) {
  const userId = getUserId(context);

  let dialog = {
    name: args.name,
    user: {
      connect: {
        id: userId
      }
    }
  };

  return await context.prisma.createDialog(dialog);
};

exports.signup = async function(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

exports.login = async function(parent, args, context, info) {
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
};

exports.updateUser = async function(parent, args, context, info) {
  const newHashedPassword = await bcrypt.hash(args.newPassword, 10);
    await context.prisma.updateUser({
      data: {
        password: newHashedPassword,
      },
      where: {
        email: args.email,
      },
    });

    return true;
};
