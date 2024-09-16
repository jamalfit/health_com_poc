-- Create a new schema for the healthcare messaging system
CREATE SCHEMA IF NOT EXISTS healthcare_messaging;

-- Create extension for UUID generation (if not already created)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set the search path to use the new schema
SET search_path TO healthcare_messaging, public;

-- Staff table
CREATE TABLE "Staff" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "wearableId" TEXT UNIQUE NOT NULL
);

-- Location table
CREATE TABLE "Location" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" TEXT UNIQUE NOT NULL,
    "description" TEXT,
    "beaconId" TEXT UNIQUE NOT NULL
);

-- Message table
CREATE TABLE "Message" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "content" TEXT NOT NULL,
    "senderId" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "acknowledged" BOOLEAN DEFAULT FALSE,
    "acknowledgedAt" TIMESTAMP WITH TIME ZONE,
    "acknowledgedById" UUID,
    FOREIGN KEY ("senderId") REFERENCES "Staff" ("id"),
    FOREIGN KEY ("locationId") REFERENCES "Location" ("id"),
    FOREIGN KEY ("acknowledgedById") REFERENCES "Staff" ("id")
);

-- StaffLocation table
CREATE TABLE "StaffLocation" (
    "staffId" UUID PRIMARY KEY,
    "locationId" UUID NOT NULL,
    "lastUpdated" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("staffId") REFERENCES "Staff" ("id"),
    FOREIGN KEY ("locationId") REFERENCES "Location" ("id")
);

-- Create index on locationId in StaffLocation table
CREATE INDEX "StaffLocation_locationId_idx" ON "StaffLocation" ("locationId");

-- Wearable table
CREATE TABLE "Wearable" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "deviceId" TEXT UNIQUE NOT NULL,
    "batteryLevel" INTEGER NOT NULL,
    "lastSeen" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "staffId" UUID UNIQUE NOT NULL,
    FOREIGN KEY ("staffId") REFERENCES "Staff" ("id")
);

-- Tablet table
CREATE TABLE "Tablet" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "deviceName" TEXT NOT NULL,
    "locationId" UUID NOT NULL,
    "lastActive" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("locationId") REFERENCES "Location" ("id")
);

-- LocationBeacon table
CREATE TABLE "LocationBeacon" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "beaconId" TEXT UNIQUE NOT NULL,
    "locationId" UUID NOT NULL,
    "lastSeen" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("locationId") REFERENCES "Location" ("id")
);

-- Reset search path to default
SET search_path TO "$user", public;