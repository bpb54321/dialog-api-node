async function dialogs(root, args, context, info) {
  return await context.prisma.dialogs();
}

module.exports = {
  dialogs,
}