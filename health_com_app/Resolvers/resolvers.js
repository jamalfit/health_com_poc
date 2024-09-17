const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    // Staff queries
    staff: async (_, { id }) => {
      return prisma.staff.findUnique({ where: { id } });
    },
    allStaff: async () => {
      return prisma.staff.findMany();
    },

    // Location queries
    location: async (_, { id }) => {
      return prisma.location.findUnique({ where: { id } });
    },
    allLocations: async () => {
      return prisma.location.findMany();
    },

    // Message queries
    message: async (_, { id }) => {
      return prisma.message.findUnique({ where: { id } });
    },
    allMessages: async () => {
      return prisma.message.findMany();
    },

    // StaffLocation queries
    staffLocation: async (_, { staffId }) => {
      return prisma.staffLocation.findUnique({ where: { staffId } });
    },
    allStaffLocations: async () => {
      return prisma.staffLocation.findMany();
    },

    // Wearable queries
    wearable: async (_, { id }) => {
      return prisma.wearable.findUnique({ where: { id } });
    },
    allWearables: async () => {
      return prisma.wearable.findMany();
    },

    // Tablet queries
    tablet: async (_, { id }) => {
      return prisma.tablet.findUnique({ where: { id } });
    },
    allTablets: async () => {
      return prisma.tablet.findMany();
    },

    // LocationBeacon queries
    locationBeacon: async (_, { id }) => {
      return prisma.locationBeacon.findUnique({ where: { id } });
    },
    allLocationBeacons: async () => {
      return prisma.locationBeacon.findMany();
    },
  },

  Mutation: {
    // Staff mutations
    createStaff: async (_, { name, role, wearableId }) => {
      return prisma.staff.create({
        data: { name, role, wearableId },
      });
    },
    updateStaff: async (_, { id, name, role, wearableId }) => {
      return prisma.staff.update({
        where: { id },
        data: { name, role, wearableId },
      });
    },
    deleteStaff: async (_, { id }) => {
      return prisma.staff.delete({ where: { id } });
    },

    // Location mutations
    createLocation: async (_, { name, description, beaconId }) => {
      return prisma.location.create({
        data: { name, description, beaconId },
      });
    },
    updateLocation: async (_, { id, name, description, beaconId }) => {
      return prisma.location.update({
        where: { id },
        data: { name, description, beaconId },
      });
    },
    deleteLocation: async (_, { id }) => {
      return prisma.location.delete({ where: { id } });
    },

    // Message mutations
    createMessage: async (_, { content, senderId, locationId }) => {
      return prisma.message.create({
        data: { content, senderId, locationId },
      });
    },
    updateMessage: async (_, { id, content, acknowledged, acknowledgedById }) => {
      return prisma.message.update({
        where: { id },
        data: { 
          content, 
          acknowledged, 
          acknowledgedById,
          acknowledgedAt: acknowledged ? new Date() : null
        },
      });
    },
    deleteMessage: async (_, { id }) => {
      return prisma.message.delete({ where: { id } });
    },

    // StaffLocation mutations
    updateStaffLocation: async (_, { staffId, locationId }) => {
      return prisma.staffLocation.upsert({
        where: { staffId },
        update: { locationId, lastUpdated: new Date() },
        create: { staffId, locationId },
      });
    },
    deleteStaffLocation: async (_, { staffId }) => {
      return prisma.staffLocation.delete({ where: { staffId } });
    },

    // Wearable mutations
    createWearable: async (_, { deviceId, batteryLevel, staffId }) => {
      return prisma.wearable.create({
        data: { deviceId, batteryLevel, staffId },
      });
    },
    updateWearable: async (_, { id, deviceId, batteryLevel, staffId }) => {
      return prisma.wearable.update({
        where: { id },
        data: { deviceId, batteryLevel, staffId },
      });
    },
    deleteWearable: async (_, { id }) => {
      return prisma.wearable.delete({ where: { id } });
    },

    // Tablet mutations
    createTablet: async (_, { deviceName, locationId }) => {
      return prisma.tablet.create({
        data: { deviceName, locationId },
      });
    },
    updateTablet: async (_, { id, deviceName, locationId }) => {
      return prisma.tablet.update({
        where: { id },
        data: { deviceName, locationId },
      });
    },
    deleteTablet: async (_, { id }) => {
      return prisma.tablet.delete({ where: { id } });
    },

    // LocationBeacon mutations
    createLocationBeacon: async (_, { beaconId, locationId }) => {
      return prisma.locationBeacon.create({
        data: { beaconId, locationId },
      });
    },
    updateLocationBeacon: async (_, { id, beaconId, locationId }) => {
      return prisma.locationBeacon.update({
        where: { id },
        data: { beaconId, locationId },
      });
    },
    deleteLocationBeacon: async (_, { id }) => {
      return prisma.locationBeacon.delete({ where: { id } });
    },
  },
};

module.exports = resolvers;