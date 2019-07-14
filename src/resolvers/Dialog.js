exports.lines =  (parent, args, context) => {
  return context.prisma.dialog({id: parent.id}).lines();
};

exports.user = (parent, args, context) => {
  return context.prisma.dialog({id: parent.id}).user();
};