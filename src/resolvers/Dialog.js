function lines (parent, args, context) {
  return context.prisma.dialog({id: parent.id}).lines();
}

module.exports = {
  lines,
};