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

const request = require('supertest');
const express = require('express');
const session = require('express-session');
const path = require('path');

// Mock environment to use SQLite for testing
process.env.NODE_ENV = 'test';
delete process.env.DATABASE_URL;
process.env.SESSION_SECRET = 'test-secret-key';

// Import server setup
const { userDB, itemDB } = require('../../app/db');

// Create a test app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 6,
  },
}));

// Import routes from server.js
// We'll need to extract the route handlers or create a test version
// For now, we'll set up basic routes for testing

app.get('/api/me', (req, res) => {
  res.json({ user: req.session.user || null });
});

app.post('/api/login', async (req, res) => {
  try {
    const { id, pw } = req.body || {};
    if (!id || !pw) return res.status(400).json({ error: 'ID and password required' });
    
    const user = await userDB.findById(id);
    if (!user) return res.status(400).json({ error: 'User not found' });
    
    const bcrypt = require('bcrypt');
    const ok = bcrypt.compareSync(pw, user.pw_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid password' });

    req.session.user = { 
      id: user.id, 
      name: user.name, 
      isAdmin: !!user.is_admin 
    };
    res.json({ ok: true, user: req.session.user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/items', async (req, res) => {
  try {
    const { status } = req.query;
    let items;
    if (status) {
      items = await itemDB.findAll(status);
    } else {
      items = await itemDB.findAll();
    }
    const formatted = items.map(item => ({
      id: item.id,
      title: item.title,
      desc: item.description || item.desc,
      cat: item.category || item.cat,
      imgData: item.img_data || item.imgData,
      lat: item.lat,
      lng: item.lng,
      radius: item.radius,
      status: item.status,
      storagePlace: item.storage_place || item.storagePlace,
      created_at: item.created_at ? (typeof item.created_at === 'string' ? item.created_at : item.created_at.toISOString()) : null,
      createdBy: item.created_by || item.createdBy
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Item fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await itemDB.findById(parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: 'Item not found' });
    
    const formatted = {
      id: item.id,
      title: item.title,
      desc: item.description || item.desc,
      cat: item.category || item.cat,
      imgData: item.img_data || item.imgData,
      lat: item.lat,
      lng: item.lng,
      radius: item.radius,
      status: item.status,
      storagePlace: item.storage_place || item.storagePlace,
      created_at: item.created_at ? (typeof item.created_at === 'string' ? item.created_at : item.created_at.toISOString()) : null,
      createdBy: item.created_by || item.createdBy
    };
    res.json(formatted);
  } catch (err) {
    console.error('Item fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Login required' });
    }

    const { title, desc, cat, imgData, lat, lng, radius } = req.body;
    if (!title || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Title, lat, and lng are required' });
    }

    const item = await itemDB.create({
      title,
      description: desc,
      category: cat,
      imgData,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      radius: radius ? parseFloat(radius) : 0,
      status: 'pending',
      createdBy: req.session.user.id
    });

    res.status(201).json({
      id: item.id,
      title: item.title,
      desc: item.description,
      cat: item.category,
      imgData: item.imgData,
      lat: item.lat,
      lng: item.lng,
      radius: item.radius,
      status: item.status,
      createdBy: item.createdBy
    });
  } catch (err) {
    console.error('Item creation error:', err);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

describe('API Integration Tests', () => {
  let testItemId;
  let authCookie;

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
  });

  describe('Authentication Endpoints', () => {
    test('GET /api/me should return null when not logged in', async () => {
      const response = await request(app)
        .get('/api/me')
        .expect(200);

      expect(response.body.user).toBeNull();
    });

    test('POST /api/login should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ id: 'student1', pw: '1234' })
        .expect(200);

      expect(response.body.ok).toBe(true);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.id).toBe('student1');
      expect(response.body.user.name).toBe('Student 1');
      expect(response.body.user.isAdmin).toBe(false);

      // Save cookie for authenticated requests
      authCookie = response.headers['set-cookie'];
    });

    test('POST /api/login should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ id: 'student1', pw: 'wrongpassword' })
        .expect(401);

      expect(response.body.error).toBe('Invalid password');
    });

    test('POST /api/login should reject missing credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ id: 'student1' })
        .expect(400);

      expect(response.body.error).toBe('ID and password required');
    });

    test('GET /api/me should return user when logged in', async () => {
      // First login
      const loginResponse = await request(app)
        .post('/api/login')
        .send({ id: 'student1', pw: '1234' });

      const cookie = loginResponse.headers['set-cookie'];

      const response = await request(app)
        .get('/api/me')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body.user).toBeDefined();
      expect(response.body.user.id).toBe('student1');
    });

    test('POST /api/logout should logout user', async () => {
      // First login
      const loginResponse = await request(app)
        .post('/api/login')
        .send({ id: 'student1', pw: '1234' });

      const cookie = loginResponse.headers['set-cookie'];

      // Logout
      const response = await request(app)
        .post('/api/logout')
        .set('Cookie', cookie)
        .expect(200);

      expect(response.body.ok).toBe(true);

      // Verify session is destroyed
      const meResponse = await request(app)
        .get('/api/me')
        .set('Cookie', cookie)
        .expect(200);

      expect(meResponse.body.user).toBeNull();
    });
  });

  describe('Items Endpoints', () => {
    test('GET /api/items should return all items', async () => {
      const response = await request(app)
        .get('/api/items')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/items?status=pending should return only pending items', async () => {
      const response = await request(app)
        .get('/api/items?status=pending')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach(item => {
        expect(item.status).toBe('pending');
      });
    });

    test('GET /api/items/:id should return specific item', async () => {
      // Create a test item first
      const loginResponse = await request(app)
        .post('/api/login')
        .send({ id: 'student1', pw: '1234' });
      const cookie = loginResponse.headers['set-cookie'];

      const createResponse = await request(app)
        .post('/api/items')
        .set('Cookie', cookie)
        .send({
          title: 'Test Item for GET',
          desc: 'Test Description',
          cat: 'Other',
          lat: 37.5665,
          lng: 126.9780
        })
        .expect(201);

      testItemId = createResponse.body.id;

      // Get the item
      const response = await request(app)
        .get(`/api/items/${testItemId}`)
        .expect(200);

      expect(response.body.id).toBe(testItemId);
      expect(response.body.title).toBe('Test Item for GET');
    });

    test('GET /api/items/:id should return 404 for non-existent item', async () => {
      const response = await request(app)
        .get('/api/items/999999')
        .expect(404);

      expect(response.body.error).toBe('Item not found');
    });

    test('POST /api/items should create item when authenticated', async () => {
      // Login first
      const loginResponse = await request(app)
        .post('/api/login')
        .send({ id: 'student1', pw: '1234' });
      const cookie = loginResponse.headers['set-cookie'];

      const response = await request(app)
        .post('/api/items')
        .set('Cookie', cookie)
        .send({
          title: 'Test Item',
          desc: 'Test Description',
          cat: 'Other',
          lat: 37.5665,
          lng: 126.9780,
          radius: 50
        })
        .expect(201);

      expect(response.body.id).toBeDefined();
      expect(response.body.title).toBe('Test Item');
      expect(response.body.status).toBe('pending');
      expect(response.body.createdBy).toBe('student1');

      testItemId = response.body.id;
    });

    test('POST /api/items should require authentication', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({
          title: 'Test Item',
          lat: 37.5665,
          lng: 126.9780
        })
        .expect(401);

      expect(response.body.error).toBe('Login required');
    });

    test('POST /api/items should require title, lat, and lng', async () => {
      // Login first
      const loginResponse = await request(app)
        .post('/api/login')
        .send({ id: 'student1', pw: '1234' });
      const cookie = loginResponse.headers['set-cookie'];

      const response = await request(app)
        .post('/api/items')
        .set('Cookie', cookie)
        .send({
          title: 'Test Item'
          // Missing lat and lng
        })
        .expect(400);

      expect(response.body.error).toBe('Title, lat, and lng are required');
    });
  });
});
