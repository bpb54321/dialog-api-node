function role(parent, args, context) {
  return context.prisma.line({id: parent.id}).line();
}

module.exports = {
  role
};