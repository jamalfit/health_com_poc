-- Set the search path to use the healthcare_messaging schema
SET search_path TO healthcare_messaging, public;

-- Insert sample data into Staff table
INSERT INTO "Staff" ("name", "role", "wearableId") VALUES
('Dr. John Smith', 'Physician', 'W001'),
('Nurse Sarah Johnson', 'Nurse', 'W002'),
('Dr. Emily Brown', 'Surgeon', 'W003'),
('James Wilson', 'Technician', 'W004'),
('Nurse Mary Davis', 'Nurse', 'W005');

-- Insert sample data into Location table
INSERT INTO "Location" ("name", "description", "beaconId") VALUES
('Emergency Room', 'For immediate care', 'B001'),
('Operating Room 1', 'Main surgery room', 'B002'),
('ICU', 'Intensive Care Unit', 'B003'),
('Radiology', 'Imaging department', 'B004'),
('Pharmacy', 'Medication dispensary', 'B005');

-- Insert sample data into Message table
INSERT INTO "Message" ("content", "senderId", "locationId", "acknowledged", "acknowledgedById")
SELECT 
    'Sample message ' || generate_series,
    (SELECT "id" FROM "Staff" ORDER BY RANDOM() LIMIT 1),
    (SELECT "id" FROM "Location" ORDER BY RANDOM() LIMIT 1),
    CASE WHEN RANDOM() < 0.5 THEN TRUE ELSE FALSE END,
    CASE WHEN RANDOM() < 0.5 THEN (SELECT "id" FROM "Staff" ORDER BY RANDOM() LIMIT 1) ELSE NULL END
FROM generate_series(1, 5);

-- Insert sample data into StaffLocation table
INSERT INTO "StaffLocation" ("staffId", "locationId")
SELECT 
    "id" AS "staffId",
    (SELECT "id" FROM "Location" ORDER BY RANDOM() LIMIT 1) AS "locationId"
FROM "Staff";

-- Insert sample data into Wearable table
INSERT INTO "Wearable" ("deviceId", "batteryLevel", "staffId")
SELECT 
    'D00' || generate_series,
    floor(random() * 100 + 1)::int,
    "id"
FROM "Staff"
JOIN generate_series(1, 5) ON TRUE;

-- Insert sample data into Tablet table
INSERT INTO "Tablet" ("deviceName", "locationId")
SELECT 
    'Tablet ' || generate_series,
    "id"
FROM "Location"
JOIN generate_series(1, 5) ON TRUE;

-- Insert sample data into LocationBeacon table
INSERT INTO "LocationBeacon" ("beaconId", "locationId")
SELECT 
    'LB00' || generate_series,
    "id"
FROM "Location"
JOIN generate_series(1, 5) ON TRUE;

-- Reset search path to default
SET search_path TO "$user", public;

-- Verify the inserted data
SET search_path TO healthcare_messaging, public;

SELECT 'Staff' AS table_name, COUNT(*) AS record_count FROM "Staff"
UNION ALL
SELECT 'Location' AS table_name, COUNT(*) AS record_count FROM "Location"
UNION ALL
SELECT 'Message' AS table_name, COUNT(*) AS record_count FROM "Message"
UNION ALL
SELECT 'StaffLocation' AS table_name, COUNT(*) AS record_count FROM "StaffLocation"
UNION ALL
SELECT 'Wearable' AS table_name, COUNT(*) AS record_count FROM "Wearable"
UNION ALL
SELECT 'Tablet' AS table_name, COUNT(*) AS record_count FROM "Tablet"
UNION ALL
SELECT 'LocationBeacon' AS table_name, COUNT(*) AS record_count FROM "LocationBeacon";

SET search_path TO "$user", public;