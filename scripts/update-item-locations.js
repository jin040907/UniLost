/*
 * Copyright 2025 UniLost Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Script to update existing item locations to Sejong University campus
const { Pool } = require('pg');
const Database = require('better-sqlite3');
const path = require('path');

const usePostgres = !!process.env.DATABASE_URL;

// Sejong University campus locations - distributed across campus
// Campus area: approximately 37.549 - 37.552 (lat), 127.074 - 127.078 (lng)
const campusLocations = [
  { lat: 37.5503, lng: 127.0751 }, // Library area (center)
  { lat: 37.5508, lng: 127.0756 }, // Cafeteria area (northeast)
  { lat: 37.5495, lng: 127.0745 }, // Engineering Building (southwest)
  { lat: 37.5515, lng: 127.0770 }, // Gymnasium (northeast)
  { lat: 37.5500, lng: 127.0752 }, // Library study room (south center)
  { lat: 37.5505, lng: 127.0742 }, // Main entrance (west)
  { lat: 37.5492, lng: 127.0748 }, // Science Building (south)
  { lat: 37.5512, lng: 127.0765 }, // Business Building (north)
  { lat: 37.5518, lng: 127.0772 }, // Gymnasium locker room (far northeast)
  { lat: 37.5506, lng: 127.0758 }, // Cafeteria (east center)
  { lat: 37.5498, lng: 127.0740 }, // South building (southwest)
  { lat: 37.5510, lng: 127.0760 }, // North building (north center)
];

async function updateLocationsPostgres() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') ? false : {
      rejectUnauthorized: false
    }
  });

  const client = await pool.connect();
  try {
    console.log('Updating item locations to Sejong University campus in PostgreSQL...\n');

    const result = await client.query('SELECT id FROM items ORDER BY id');
    const items = result.rows;

    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].id;
      const location = campusLocations[i % campusLocations.length];
      
      await client.query(
        'UPDATE items SET lat = $1, lng = $2 WHERE id = $3',
        [location.lat, location.lng, itemId]
      );
      console.log(`  ✅ Updated item ${itemId} → (${location.lat}, ${location.lng})`);
    }

    console.log('\n✅ All item locations updated successfully!');
  } catch (err) {
    console.error('❌ Error updating locations:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

function updateLocationsSQLite() {
  // Database file is in app/ directory (parent directory)
  const dbPath = path.join(__dirname, '..', 'app', 'unilost.db');
  const db = new Database(dbPath);

  try {
    console.log('Updating item locations to Sejong University campus in SQLite...\n');

    const items = db.prepare('SELECT id FROM items ORDER BY id').all();
    const updateStmt = db.prepare('UPDATE items SET lat = ?, lng = ? WHERE id = ?');

    for (let i = 0; i < items.length; i++) {
      const itemId = items[i].id;
      const location = campusLocations[i % campusLocations.length];
      
      updateStmt.run(location.lat, location.lng, itemId);
      console.log(`  ✅ Updated item ${itemId} → (${location.lat}, ${location.lng})`);
    }

    console.log('\n✅ All item locations updated successfully!');
  } catch (err) {
    console.error('❌ Error updating locations:', err);
    throw err;
  } finally {
    db.close();
  }
}

// Main execution
(async () => {
  try {
    if (usePostgres) {
      await updateLocationsPostgres();
    } else {
      updateLocationsSQLite();
    }
    process.exit(0);
  } catch (err) {
    console.error('Failed to update locations:', err);
    process.exit(1);
  }
})();

