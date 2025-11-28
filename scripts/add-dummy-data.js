/*
 * Copyright 2024 UniLost Contributors
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

// Script to add dummy data (items, chat messages, thread messages) to the database
const { Pool } = require('pg');
const Database = require('better-sqlite3');
const path = require('path');

// Database file is in app/ directory
const usePostgres = !!process.env.DATABASE_URL;

// Sample data - Sejong University campus locations
// Sejong University main coordinates: 37.5502, 127.0750
// Campus area: approximately 37.549 - 37.552 (lat), 127.074 - 127.078 (lng)
const sampleItems = [
  {
    title: "Lost Black Wallet",
    description: "Black leather wallet with credit cards and student ID. Found near the library entrance.",
    category: "Wallet",
    lat: 37.5503,
    lng: 127.0751,
    radius: 50,
    status: "approved",
    storagePlace: "Student Affairs Office, 1st Floor, Locker A-3",
    createdBy: "student1"
  },
  {
    title: "iPhone 14 Pro",
    description: "Silver iPhone 14 Pro with black case. Found in the cafeteria.",
    category: "Electronics",
    lat: 37.5508,
    lng: 127.0756,
    radius: 30,
    status: "approved",
    storagePlace: "Security Office, Main Building",
    createdBy: "student2"
  },
  {
    title: "Blue Backpack",
    description: "Nike blue backpack with laptop compartment. Found in classroom 301, Engineering Building.",
    category: "Bag",
    lat: 37.5495,
    lng: 127.0745,
    radius: 40,
    status: "pending",
    storagePlace: null,
    createdBy: "student3"
  },
  {
    title: "Student ID Card",
    description: "Student ID card belonging to John Doe. Found near the gymnasium.",
    category: "Student ID/Card",
    lat: 37.5515,
    lng: 127.0770,
    radius: 25,
    status: "approved",
    storagePlace: "Student Affairs Office, 1st Floor",
    createdBy: "student4"
  },
  {
    title: "AirPods Pro",
    description: "White AirPods Pro in charging case. Found in the library study room.",
    category: "Electronics",
    lat: 37.5500,
    lng: 127.0752,
    radius: 20,
    status: "approved",
    storagePlace: "Library Information Desk",
    createdBy: "student5"
  },
  {
    title: "Red Umbrella",
    description: "Red folding umbrella. Found near the main entrance during rainy day.",
    category: "Other",
    lat: 37.5505,
    lng: 127.0742,
    radius: 35,
    status: "pending",
    storagePlace: null,
    createdBy: "student6"
  },
  {
    title: "MacBook Pro 13-inch",
    description: "Space Gray MacBook Pro 13-inch. Found in the computer lab, Science Building.",
    category: "Laptop",
    lat: 37.5492,
    lng: 127.0748,
    radius: 45,
    status: "approved",
    storagePlace: "IT Support Office, 2nd Floor",
    createdBy: "student7"
  },
  {
    title: "Keys with Keychain",
    description: "Set of keys with a small keychain. Found in the parking lot near Business Building.",
    category: "Keys",
    lat: 37.5512,
    lng: 127.0765,
    radius: 30,
    status: "approved",
    storagePlace: "Security Office, Main Building",
    createdBy: "student8"
  },
  {
    title: "Water Bottle",
    description: "Stainless steel water bottle with stickers. Found in the gymnasium locker room.",
    category: "Other",
    lat: 37.5518,
    lng: 127.0772,
    radius: 25,
    status: "pending",
    storagePlace: null,
    createdBy: "student9"
  },
  {
    title: "Sunglasses",
    description: "Black Ray-Ban sunglasses in case. Found in the cafeteria.",
    category: "Other",
    lat: 37.5506,
    lng: 127.0758,
    radius: 20,
    status: "approved",
    storagePlace: "Student Affairs Office, 1st Floor",
    createdBy: "student10"
  }
];

const sampleChatMessages = [
  { nick: "student1", text: "Has anyone seen a black wallet? I lost it near the library." },
  { nick: "admin1", text: "Please check the lost and found section. We have several items waiting to be claimed." },
  { nick: "student2", text: "Found an iPhone! Already reported it. Check the map for location." },
  { nick: "student3", text: "Thanks for the quick response! I found my backpack." },
  { nick: "admin2", text: "Remember to update your contact information if you've lost something." },
  { nick: "student4", text: "The system is really helpful! Found my student ID quickly." },
  { nick: "student5", text: "Is there a way to get notifications when items are found?" },
  { nick: "admin1", text: "We're working on adding notification features. Stay tuned!" },
  { nick: "student6", text: "Lost my umbrella yesterday. Hope someone found it." },
  { nick: "student7", text: "Great service! Very easy to use." }
];

async function addDummyDataPostgres() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') ? false : {
      rejectUnauthorized: false
    }
  });

  const client = await pool.connect();
  try {
    console.log('Adding dummy data to PostgreSQL...\n');

    // Add items
    console.log('Adding items...');
    for (const item of sampleItems) {
      await client.query(
        `INSERT INTO items (title, description, category, lat, lng, radius, status, storage_place, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [item.title, item.description, item.category, item.lat, item.lng, item.radius, item.status, item.storagePlace, item.createdBy]
      );
      console.log(`  ✅ Added item: ${item.title}`);
    }

    // Get item IDs for thread messages
    const itemsResult = await client.query('SELECT id FROM items ORDER BY id');
    const itemIds = itemsResult.rows.map(row => row.id);

    // Add chat messages
    console.log('\nAdding chat messages...');
    for (const msg of sampleChatMessages) {
      await client.query(
        'INSERT INTO chat_messages (nick, text) VALUES ($1, $2)',
        [msg.nick, msg.text]
      );
      console.log(`  ✅ Added chat message from ${msg.nick}`);
    }

    // Add thread messages for each item
    console.log('\nAdding thread messages...');
    const threadMessages = [
      { text: "I think I saw this! When did you lose it?", nick: "student2" },
      { text: "I lost it yesterday around 3 PM.", nick: "student1" },
      { text: "I'll check the location you mentioned.", nick: "student3" },
      { text: "Thank you for reporting this!", nick: "admin1" },
      { text: "Is this still available?", nick: "student4" }
    ];

    for (let i = 0; i < itemIds.length && i < threadMessages.length; i++) {
      await client.query(
        'INSERT INTO thread_messages (item_id, nick, text) VALUES ($1, $2, $3)',
        [itemIds[i], threadMessages[i].nick, threadMessages[i].text]
      );
      console.log(`  ✅ Added thread message for item ${itemIds[i]}`);
    }

    console.log('\n✅ All dummy data added successfully!');
  } catch (err) {
    console.error('❌ Error adding dummy data:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

function addDummyDataSQLite() {
  // Database file is in app/ directory (parent directory)
  const dbPath = path.join(__dirname, '..', 'app', 'unilost.db');
  const db = new Database(dbPath);

  try {
    console.log('Adding dummy data to SQLite...\n');

    // Add items
    console.log('Adding items...');
    const insertItem = db.prepare(
      `INSERT INTO items (title, description, category, lat, lng, radius, status, storage_place, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    for (const item of sampleItems) {
      insertItem.run(
        item.title, item.description, item.category, item.lat, item.lng,
        item.radius, item.status, item.storagePlace, item.createdBy
      );
      console.log(`  ✅ Added item: ${item.title}`);
    }

    // Get item IDs for thread messages
    const itemIds = db.prepare('SELECT id FROM items ORDER BY id').all().map(row => row.id);

    // Add chat messages
    console.log('\nAdding chat messages...');
    const insertChat = db.prepare('INSERT INTO chat_messages (nick, text) VALUES (?, ?)');
    for (const msg of sampleChatMessages) {
      insertChat.run(msg.nick, msg.text);
      console.log(`  ✅ Added chat message from ${msg.nick}`);
    }

    // Add thread messages for each item
    console.log('\nAdding thread messages...');
    const insertThread = db.prepare('INSERT INTO thread_messages (item_id, nick, text) VALUES (?, ?, ?)');
    const threadMessages = [
      { text: "I think I saw this! When did you lose it?", nick: "student2" },
      { text: "I lost it yesterday around 3 PM.", nick: "student1" },
      { text: "I'll check the location you mentioned.", nick: "student3" },
      { text: "Thank you for reporting this!", nick: "admin1" },
      { text: "Is this still available?", nick: "student4" }
    ];

    for (let i = 0; i < itemIds.length && i < threadMessages.length; i++) {
      insertThread.run(itemIds[i], threadMessages[i].nick, threadMessages[i].text);
      console.log(`  ✅ Added thread message for item ${itemIds[i]}`);
    }

    console.log('\n✅ All dummy data added successfully!');
  } catch (err) {
    console.error('❌ Error adding dummy data:', err);
    throw err;
  } finally {
    db.close();
  }
}

// Main execution
(async () => {
  try {
    if (usePostgres) {
      await addDummyDataPostgres();
    } else {
      addDummyDataSQLite();
    }
    process.exit(0);
  } catch (err) {
    console.error('Failed to add dummy data:', err);
    process.exit(1);
  }
})();

