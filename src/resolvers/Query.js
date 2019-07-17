async function dialogs(root, args, context, info) {
  const userId = getUserId(context);
  return await context.prisma.user({id: userId}).dialogs();
}

function users(root, args, context, info) {
  return context.prisma.users();
}

module.exports = {
  dialogs,
  users,
}
