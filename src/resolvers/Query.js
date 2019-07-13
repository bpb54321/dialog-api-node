function dialogs(root, args, context, info) {
  return context.prisma.dialogs();
}

module.exports = {
  dialogs,
}