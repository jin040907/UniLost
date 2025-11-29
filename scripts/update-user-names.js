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

// Script to update existing user names from Korean to English
const { Pool } = require('pg');
const Database = require('better-sqlite3');
const path = require('path');

const usePostgres = !!process.env.DATABASE_URL;

async function updateUserNamesPostgres() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') ? false : {
      rejectUnauthorized: false
    }
  });

  const client = await pool.connect();
  try {
    console.log('Updating user names to English in PostgreSQL...\n');

    // Update student users
    for (let i = 1; i <= 10; i++) {
      const userId = `student${i}`;
      const name = `Student ${i}`;
      await client.query('UPDATE users SET name = $1 WHERE id = $2', [name, userId]);
      console.log(`  ✅ Updated ${userId} → ${name}`);
    }

    // Update admin users
    for (let i = 1; i <= 10; i++) {
      const userId = `admin${i}`;
      const name = `Admin ${i}`;
      await client.query('UPDATE users SET name = $1 WHERE id = $2', [name, userId]);
      console.log(`  ✅ Updated ${userId} → ${name}`);
    }

    console.log('\n✅ All user names updated successfully!');
  } catch (err) {
    console.error('❌ Error updating user names:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

function updateUserNamesSQLite() {
  // Database file is in app/ directory (parent directory)
  const dbPath = path.join(__dirname, '..', 'app', 'unilost.db');
  const db = new Database(dbPath);

  try {
    console.log('Updating user names to English in SQLite...\n');

    // Update student users
    const updateUser = db.prepare('UPDATE users SET name = ? WHERE id = ?');
    for (let i = 1; i <= 10; i++) {
      const userId = `student${i}`;
      const name = `Student ${i}`;
      updateUser.run(name, userId);
      console.log(`  ✅ Updated ${userId} → ${name}`);
    }

    // Update admin users
    for (let i = 1; i <= 10; i++) {
      const userId = `admin${i}`;
      const name = `Admin ${i}`;
      updateUser.run(name, userId);
      console.log(`  ✅ Updated ${userId} → ${name}`);
    }

    console.log('\n✅ All user names updated successfully!');
  } catch (err) {
    console.error('❌ Error updating user names:', err);
    throw err;
  } finally {
    db.close();
  }
}

// Main execution
(async () => {
  try {
    if (usePostgres) {
      await updateUserNamesPostgres();
    } else {
      updateUserNamesSQLite();
    }
    process.exit(0);
  } catch (err) {
    console.error('Failed to update user names:', err);
    process.exit(1);
  }
})();

