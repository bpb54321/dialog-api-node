function role(parent, args, context) {
  return context.prisma.line({id: parent.id}).role();
}

module.exports = {
  role
};