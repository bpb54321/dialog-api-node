function roles(parent, args, context) {
  return context.prisma.dialog({id: parent.id}).roles();
}

function lines () {
  return context.prisma.dialog({id: parent.id}).lines();
}

module.exports = {
  roles,
  lines,
};