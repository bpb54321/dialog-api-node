const {getUserId} = require("../utils");

exports.dialogs = async function(root, args, context, info) {
  const userId = getUserId(context);
  return await context.prisma.user({id: userId}).dialogs();
};

exports.users = function(root, args, context, info) {
  return context.prisma.users();
};
