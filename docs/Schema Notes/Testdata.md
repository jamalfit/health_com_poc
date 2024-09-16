-- Use the healthcare_messaging schema
SET search_path TO healthcare_messaging;

-- Step 1: Clear existing records from tables
TRUNCATE TABLE healthcare_messaging."StaffLocation" CASCADE;
TRUNCATE TABLE healthcare_messaging."Message" CASCADE;
TRUNCATE TABLE healthcare_messaging."Location" CASCADE;
TRUNCATE TABLE healthcare_messaging."Staff" CASCADE;

-- Step 2: Insert sample staff records
-- Explicitly quoting column names to avoid case sensitivity issues
INSERT INTO healthcare_messaging."Staff" (id, name, role, "wearableId")
VALUES
  (gen_random_uuid(), 'Dr. Alice Johnson', 'Doctor', 'wearable-001'),
  (gen_random_uuid(), 'Nurse Bob Smith', 'Nurse', 'wearable-002'),
  (gen_random_uuid(), 'Dr. Carol Williams', 'Doctor', 'wearable-003'),
  (gen_random_uuid(), 'Technician Dave Brown', 'Technician', 'wearable-004');

-- Step 3: Insert sample location records
INSERT INTO healthcare_messaging."Location" (id, name, description, "beaconId")
VALUES
  (gen_random_uuid(), 'Operating Room 1', 'Main operating room', 'beacon-001'),
  (gen_random_uuid(), 'Nurses Station', 'Central nurses station', 'beacon-002'),
  (gen_random_uuid(), 'Emergency Room', 'Emergency treatment area', 'beacon-003'),
  (gen_random_uuid(), 'Laboratory', 'Medical testing lab', 'beacon-004');

-- Step 4: Insert sample message records
-- Correctly referencing "wearableId" and "beaconId"
INSERT INTO healthcare_messaging."Message" (id, content, "senderId", "locationId", timestamp, acknowledged)
VALUES
  (gen_random_uuid(), 'Patient is ready for surgery.', 
    (SELECT id FROM healthcare_messaging."Staff" WHERE "wearableId" = 'wearable-001'),
    (SELECT id FROM healthcare_messaging."Location" WHERE "beaconId" = 'beacon-001'), 
    CURRENT_TIMESTAMP, false),
  (gen_random_uuid(), 'Need assistance in ER.', 
    (SELECT id FROM healthcare_messaging."Staff" WHERE "wearableId" = 'wearable-002'),
    (SELECT id FROM healthcare_messaging."Location" WHERE "beaconId" = 'beacon-003'), 
    CURRENT_TIMESTAMP, false),
  (gen_random_uuid(), 'Lab results are available.', 
    (SELECT id FROM healthcare_messaging."Staff" WHERE "wearableId" = 'wearable-004'),
    (SELECT id FROM healthcare_messaging."Location" WHERE "beaconId" = 'beacon-004'), 
    CURRENT_TIMESTAMP, true);

-- Step 5: Insert sample staff location records
-- Correctly referencing "wearableId" and "beaconId"
INSERT INTO healthcare_messaging."StaffLocation" ("staffId", "locationId", "lastUpdated")
VALUES
  ((SELECT id FROM healthcare_messaging."Staff" WHERE "wearableId" = 'wearable-001'),
   (SELECT id FROM healthcare_messaging."Location" WHERE "beaconId" = 'beacon-001'), 
   CURRENT_TIMESTAMP),
  ((SELECT id FROM healthcare_messaging."Staff" WHERE "wearableId" = 'wearable-002'),
   (SELECT id FROM healthcare_messaging."Location" WHERE "beaconId" = 'beacon-003'), 
   CURRENT_TIMESTAMP),
  ((SELECT id FROM healthcare_messaging."Staff" WHERE "wearableId" = 'wearable-004'),
   (SELECT id FROM healthcare_messaging."Location" WHERE "beaconId" = 'beacon-004'), 
   CURRENT_TIMESTAMP);