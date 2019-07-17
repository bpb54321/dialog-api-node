const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

exports.createDialog = async function(root, args, context, info) {
  const userId = getUserId(context);

  // Create lines and roles first
  // Can use the create keyword to do nested creation with Prisma
  // However, appears that you can only do one level of nested writes with
  // Prisma, so we do the lines first, then the dialogs
  // https://www.prisma.io/docs/1.34/prisma-client/basic-data-access/writing-data-JAVASCRIPT-rsc6/#nested-object-writes
  let linesWithCreatedRole = args.lines.map((line) => {
    const {text, guess, number, role} = line;
    const lineWithCreatedRole = {
      text,
      guess,
      number,
      role: {
        create: role,
      }
    };

    return lineWithCreatedRole;
  });

  let dialog = {
    name: args.name,
    lines: {
      create: linesWithCreatedRole,
    },
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
  const user = await context.prisma.createUser({ ...args, password })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

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
