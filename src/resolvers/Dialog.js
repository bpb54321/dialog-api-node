function lines (parent) {
  return context.prisma.dialog({id: parent.id}).lines();
}

module.exports = {
  lines,
};