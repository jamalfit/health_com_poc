const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    allStaff: () => prisma.staff.findMany(),
    allLocations: () => prisma.location.findMany(),
    allMessages: () => prisma.message.findMany(),
    staffById: (_, { id }) => prisma.staff.findUnique({ where: { id } }),
    locationById: (_, { id }) => prisma.location.findUnique({ where: { id } }),
    messageById: (_, { id }) => prisma.message.findUnique({ where: { id } }),
  },
  Mutation: {
    createStaff: (_, args) => prisma.staff.create({ data: args }),
    createLocation: (_, args) => prisma.location.create({ data: args }),
    createMessage: (_, args) => prisma.message.create({ 
      data: { 
        content: args.content,
        sender: { connect: { id: args.senderId } },
        location: { connect: { id: args.locationId } },
      } 
    }),
    acknowledgeMessage: (_, { messageId, staffId }) => prisma.message.update({
      where: { id: messageId },
      data: { 
        acknowledged: true, 
        acknowledgedAt: new Date(),
        acknowledgedBy: { connect: { id: staffId } }
      }
    }),
    updateStaffLocation: (_, { staffId, locationId }) => prisma.staffLocation.upsert({
      where: { staffId },
      update: { locationId, lastUpdated: new Date() },
      create: { staffId, locationId }
    }),
  },
  Staff: {
    messages: (parent) => prisma.message.findMany({ where: { senderId: parent.id } }),
    acknowledgedMessages: (parent) => prisma.message.findMany({ where: { acknowledgedById: parent.id } }),
    location: (parent) => prisma.staffLocation.findUnique({ where: { staffId: parent.id } }),
    wearable: (parent) => prisma.wearable.findUnique({ where: { staffId: parent.id } }),
  },
  Location: {
    messages: (parent) => prisma.message.findMany({ where: { locationId: parent.id } }),
    staff: (parent) => prisma.staffLocation.findMany({ where: { locationId: parent.id } }),
    tablets: (parent) => prisma.tablet.findMany({ where: { locationId: parent.id } }),
    beacons: (parent) => prisma.locationBeacon.findMany({ where: { locationId: parent.id } }),
  },
  Message: {
    sender: (parent) => prisma.staff.findUnique({ where: { id: parent.senderId } }),
    location: (parent) => prisma.location.findUnique({ where: { id: parent.locationId } }),
    acknowledgedBy: (parent) => parent.acknowledgedById ? prisma.staff.findUnique({ where: { id: parent.acknowledgedById } }) : null,
  },
  StaffLocation: {
    staff: (parent) => prisma.staff.findUnique({ where: { id: parent.staffId } }),
    location: (parent) => prisma.location.findUnique({ where: { id: parent.locationId } }),
  },
  Wearable: {
    staff: (parent) => prisma.staff.findUnique({ where: { id: parent.staffId } }),
  },
  Tablet: {
    location: (parent) => prisma.location.findUnique({ where: { id: parent.locationId } }),
  },
  LocationBeacon: {
    location: (parent) => prisma.location.findUnique({ where: { id: parent.locationId } }),
  },
};

module.exports = resolvers;