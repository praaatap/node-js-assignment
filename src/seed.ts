import { dbPool, initializeDatabase } from "./config/db";

const seedData = [
  { name: "Springfield Elementary", address: "123 Main St, Springfield", latitude: 39.7817, longitude: -89.6501 },
  { name: "Westside High School", address: "456 Oak Ave, Portland", latitude: 45.5152, longitude: -122.6784 },
  { name: "Lakeside Academy", address: "789 Pine Rd, Chicago", latitude: 41.8781, longitude: -87.6298 },
  { name: "Mountain View School", address: "321 Elm St, Denver", latitude: 39.7392, longitude: -104.9903 },
  { name: "Sunrise Public School", address: "654 Maple Dr, Austin", latitude: 30.2672, longitude: -97.7431 },
];

async function seed() {
  try {
    await initializeDatabase();
    console.log("Database tables initialized");

    const insertSQL = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;

    for (const school of seedData) {
      await dbPool.execute(insertSQL, [school.name, school.address, school.latitude, school.longitude]);
    }
    
    console.log(`Successfully seeded ${seedData.length} schools`);
    
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
}

seed();
