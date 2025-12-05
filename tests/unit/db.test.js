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

const bcrypt = require('bcrypt');
const path = require('path');

// Mock environment to use SQLite for testing
process.env.NODE_ENV = 'test';
delete process.env.DATABASE_URL;

// Import db module after setting environment
const { userDB, itemDB, chatDB, threadDB } = require('../../app/db');

describe('Database Module - Unit Tests', () => {
  let testUserId;
  let testItemId;

  beforeAll(async () => {
    // Wait for database initialization
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  afterAll(async () => {
    // Cleanup test data
    if (testItemId) {
      try {
        await itemDB.delete(testItemId);
      } catch (err) {
        // Ignore cleanup errors
      }
    }
    if (testUserId) {
      try {
        // Note: User deletion would need to be implemented in db.js
        // For now, we'll just clean up items
      } catch (err) {
        // Ignore cleanup errors
      }
    }
  });

  describe('User Database Operations', () => {
    test('should find user by ID', async () => {
      const user = await userDB.findById('student1');
      expect(user).toBeDefined();
      expect(user.id).toBe('student1');
      expect(user.name).toBe('Student 1');
    });

    test('should return null for non-existent user', async () => {
      const user = await userDB.findById('nonexistent');
      expect(user).toBeNull();
    });

    test('should find all users', async () => {
      const users = await userDB.findAll();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });

    test('should create a new user', async () => {
      const testId = `testuser_${Date.now()}`;
      const pwHash = bcrypt.hashSync('testpass', 10);
      const user = await userDB.create(testId, 'Test User', pwHash, false);
      
      expect(user).toBeDefined();
      testUserId = testId;

      // Verify user was created
      const foundUser = await userDB.findById(testId);
      expect(foundUser).toBeDefined();
      expect(foundUser.id).toBe(testId);
      expect(foundUser.name).toBe('Test User');
    });
  });

  describe('Item Database Operations', () => {
    test('should find all items', async () => {
      const items = await itemDB.findAll();
      expect(Array.isArray(items)).toBe(true);
    });

    test('should find items by status', async () => {
      const items = await itemDB.findAll('pending');
      expect(Array.isArray(items)).toBe(true);
      items.forEach(item => {
        expect(item.status).toBe('pending');
      });
    });

    test('should create a new item', async () => {
      const itemData = {
        title: 'Test Item',
        description: 'Test Description',
        category: 'Other',
        lat: 37.5665,
        lng: 126.9780,
        radius: 50,
        status: 'pending',
        createdBy: 'student1'
      };

      const item = await itemDB.create(itemData);
      expect(item).toBeDefined();
      expect(item.title).toBe('Test Item');
      expect(item.lat).toBe(37.5665);
      expect(item.lng).toBe(126.9780);
      testItemId = item.id;
    });

    test('should find item by ID', async () => {
      if (!testItemId) {
        // Create a test item if it doesn't exist
        const itemData = {
          title: 'Test Item for Find',
          description: 'Test',
          lat: 37.5665,
          lng: 126.9780,
          createdBy: 'student1'
        };
        const item = await itemDB.create(itemData);
        testItemId = item.id;
      }

      const item = await itemDB.findById(testItemId);
      expect(item).toBeDefined();
      expect(item.id).toBe(testItemId);
    });

    test('should return null for non-existent item', async () => {
      const item = await itemDB.findById(999999);
      expect(item).toBeNull();
    });

    test('should update item status', async () => {
      if (!testItemId) {
        const itemData = {
          title: 'Test Item for Update',
          description: 'Test',
          lat: 37.5665,
          lng: 126.9780,
          createdBy: 'student1'
        };
        const item = await itemDB.create(itemData);
        testItemId = item.id;
      }

      const updated = await itemDB.update(testItemId, { status: 'approved' });
      expect(updated).toBeDefined();
      expect(updated.status).toBe('approved');

      // Verify update
      const item = await itemDB.findById(testItemId);
      expect(item.status).toBe('approved');
    });

    test('should delete item', async () => {
      // Create a test item to delete
      const itemData = {
        title: 'Test Item for Delete',
        description: 'Test',
        lat: 37.5665,
        lng: 126.9780,
        createdBy: 'student1'
      };
      const item = await itemDB.create(itemData);
      const itemId = item.id;

      // Delete the item
      const result = await itemDB.delete(itemId);
      expect(result.ok).toBe(true);

      // Verify deletion
      const deletedItem = await itemDB.findById(itemId);
      expect(deletedItem).toBeNull();
    });
  });

  describe('Chat Database Operations', () => {
    test('should find all chat messages', async () => {
      const messages = await chatDB.findAll();
      expect(Array.isArray(messages)).toBe(true);
    });

    test('should create a chat message', async () => {
      const message = await chatDB.create('TestUser', 'Test message');
      expect(message).toBeDefined();
      expect(message.nick).toBe('TestUser');
      expect(message.text).toBe('Test message');
    });
  });

  describe('Thread Database Operations', () => {
    test('should create a thread message', async () => {
      if (!testItemId) {
        const itemData = {
          title: 'Test Item for Thread',
          description: 'Test',
          lat: 37.5665,
          lng: 126.9780,
          createdBy: 'student1'
        };
        const item = await itemDB.create(itemData);
        testItemId = item.id;
      }

      const message = await threadDB.create(testItemId, 'TestUser', 'Thread message');
      expect(message).toBeDefined();
      expect(message.item_id).toBe(testItemId);
      expect(message.nick).toBe('TestUser');
      expect(message.text).toBe('Thread message');
    });

    test('should find thread messages by item ID', async () => {
      if (!testItemId) {
        const itemData = {
          title: 'Test Item for Thread Find',
          description: 'Test',
          lat: 37.5665,
          lng: 126.9780,
          createdBy: 'student1'
        };
        const item = await itemDB.create(itemData);
        testItemId = item.id;
      }

      // Create a test message
      await threadDB.create(testItemId, 'TestUser', 'Test thread message');

      const messages = await threadDB.findByItemId(testItemId);
      expect(Array.isArray(messages)).toBe(true);
      expect(messages.length).toBeGreaterThan(0);
      expect(messages.some(m => m.text === 'Test thread message')).toBe(true);
    });
  });
});
