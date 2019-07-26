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

exports.createRole = async function(root, args, context, info) {
  let role = {
    name: args.name,
    dialog: {
      connect: {
        id: args.dialogId,
      }
    }
  };

  return await context.prisma.createRole(role);
};

exports.updateRole = async function(root, args, context, info) {
  let updateObject = {
    data: {
    },
    where: {
      id: args.id,
    }
  };

  if (args.name) {
    updateObject.data.name = args.name;
  }

  if (args.dialogId) {
    updateObject.data.dialog = {
      connect: {
        id: args.dialogId,
      }
    };
  }

  return await context.prisma.updateRole(updateObject);
};

exports.deleteRole = async function(root, args, context, info) {
  await context.prisma.deleteRole({
    id: args.id,
  });

  return true;
};

exports.createLine = async function(root, args, context, info) {
  let line = {
    text: args.text,
    role: {
      connect: {
        id: args.roleId,
      }
    },
    dialog: {
      connect: {
        id: args.dialogId,
      }
    },
    number: args.number
  };

  return await context.prisma.createLine(line);
};

exports.updateLine = async function(root, args, context, info) {
  let updateObject = {
    data: {
    },
    where: {
      id: args.id,
    }
  };

  if (args.text) {
    updateObject.data.text = args.text;
  }

  if (args.roleId) {
    updateObject.data.role = {
      connect: {
        id: args.roleId,
      }
    };
  }

  return await context.prisma.updateLine(updateObject);
};

exports.deleteLine = async function(root, args, context, info) {
  await context.prisma.deleteLine({
    id: args.id,
  });

  return true;
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
