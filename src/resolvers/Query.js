async function dialogs(root, args, context, info) {
  return await context.prisma.dialogs();
}

function users(root, args, context, info) {
  return context.prisma.users();
}

module.exports = {
  dialogs,
  users,
}