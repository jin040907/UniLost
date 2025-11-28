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

// server.js
// -------------------------------
// Required packages: express, express-session, bcrypt, socket.io, pg (PostgreSQL)
// Install: npm i express express-session bcrypt socket.io pg
// Run: node server.js
// -------------------------------
const path = require('path');
const express = require('express');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');
const bcrypt = require('bcrypt');
const { userDB, itemDB, chatDB, threadDB, usePostgres } = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Check development mode
const isDev = process.env.NODE_ENV !== 'production';
const debugLog = (...args) => {
  if (isDev) console.log(...args);
};

// --- Session Configuration ---
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'demo-lost-and-found-secret', // Use environment variable in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 6, // 6 hours
  },
}));

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Static File Serving (current directory) ---
app.use(express.static(path.join(__dirname)));

// ✅ Default Page Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'unilost.html'));
});

// --- Login/Logout API ---
app.get('/api/me', (req, res) => {
  res.json({ user: req.session.user || null });
});

app.post('/api/login', async (req, res) => {
  try {
    const { id, pw } = req.body || {};
    if (!id || !pw) return res.status(400).json({ error: 'ID and password required' });
    
    const user = await userDB.findById(id);
    if (!user) return res.status(400).json({ error: 'User not found' });
    
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

// --- Lost Item API ---
app.get('/api/items', async (req, res) => {
  try {
    const { status } = req.query;
    let items;
    if (status) {
      items = await itemDB.findAll(status);
    } else {
      items = await itemDB.findAll();
    }
    // Convert database field names to client-expected format
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
    
    const { title, desc, cat, imgData, lat, lng, radius, storagePlace } = req.body;
    if (!title || !lat || !lng) {
      return res.status(400).json({ error: 'Required fields missing' });
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
      storagePlace,
      createdBy: req.session.user.id
    });

    const formatted = {
      id: item.id,
      title: item.title,
      desc: item.description || item.desc,
      cat: item.category || item.cat,
      imgData: item.imgData,
      lat: item.lat,
      lng: item.lng,
      radius: item.radius,
      status: item.status,
      storagePlace: item.storagePlace,
      created_at: item.created_at ? (typeof item.created_at === 'string' ? item.created_at : item.created_at.toISOString()) : new Date().toISOString(),
      createdBy: item.createdBy
    };

    res.json(formatted);
  } catch (err) {
    console.error('Item creation error:', err);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

app.patch('/api/items/:id', async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    const id = parseInt(req.params.id);
    const updates = {};
    
    if (req.body.status !== undefined) updates.status = req.body.status;
    if (req.body.storagePlace !== undefined) updates.storagePlace = req.body.storagePlace;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    await itemDB.update(id, updates);
    const item = await itemDB.findById(id);
    
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
    console.error('Item update error:', err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    const id = parseInt(req.params.id);
    await itemDB.delete(id);
    res.json({ ok: true });
  } catch (err) {
    console.error('Item deletion error:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// --- Socket.IO (Chat + Item-specific Threads) ---
io.on('connection', (socket) => {
  debugLog('✅ Client connected');

  // Global chat
  socket.on('chat:join', async ({ nick }) => {
    try {
      const messages = await chatDB.findAll(200);
      // Convert database format to client format
      const formatted = messages.map(msg => ({
        nick: msg.nick,
        text: msg.text,
        ts: msg.created_at ? (typeof msg.created_at === 'string' ? msg.created_at : msg.created_at.toISOString()) : new Date().toISOString()
      }));
      socket.emit('chat:history', formatted);
    } catch (err) {
      console.error('Chat history load error:', err);
      socket.emit('chat:history', []);
    }
  });

  socket.on('chat:send', async (msg) => {
    try {
      const nick = (msg.nick || 'Anonymous').toString().slice(0, 50);
      const text = (msg.text || '').toString().slice(0, 2000);
      
      const saved = await chatDB.create(nick, text);
      io.emit('chat:new', {
        nick: saved.nick,
        text: saved.text,
        ts: saved.ts
      });
    } catch (err) {
      console.error('Chat message save error:', err);
    }
  });

  // Item-specific thread chat
  socket.on('thread:join', async ({ itemId, nick }) => {
    if (!itemId) return;
    const roomName = `item:${itemId}`;
    socket.join(roomName);
    debugLog(`👤 Thread joined: itemId=${itemId}, room=${roomName}, socketId=${socket.id}`);
    try {
      const messages = await threadDB.findByItemId(itemId, 200);
      const formatted = messages.map(msg => ({
        nick: msg.nick,
        text: msg.text,
        ts: msg.created_at ? (typeof msg.created_at === 'string' ? msg.created_at : msg.created_at.toISOString()) : new Date().toISOString()
      }));
      socket.emit('thread:history', { itemId, msgs: formatted });
    } catch (err) {
      console.error('Thread history load error:', err);
      socket.emit('thread:history', { itemId, msgs: [] });
    }
  });

  socket.on('thread:leave', ({ itemId }) => {
    if (!itemId) return;
    socket.leave(`item:${itemId}`);
  });

  socket.on('thread:send', async ({ itemId, nick, text, ts }) => {
    if (!itemId || !text) return;
    try {
      const safeNick = (nick || 'Anonymous').toString().slice(0, 50);
      const safeText = text.toString().slice(0, 2000);
      
      const saved = await threadDB.create(itemId, safeNick, safeText);
      const roomName = `item:${itemId}`;
      const message = { 
        itemId, 
        msg: {
          nick: saved.nick,
          text: saved.text,
          ts: saved.ts
        }
      };
      
      // Broadcast to all clients in the room
      io.to(roomName).emit('thread:new', message);
      debugLog(`📨 Thread message sent: itemId=${itemId}, room=${roomName}, nick=${safeNick}`);
    } catch (err) {
      console.error('Thread message save error:', err);
    }
  });
});

// --- Server Start ---
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Accessible from all network interfaces

// Error handling
server.on('error', (err) => {
  console.error('❌ Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled promise rejection:', reason);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  console.log(`http://localhost:${PORT}`);
});
