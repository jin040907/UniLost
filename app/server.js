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
const {
  DatabaseError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  handleError,
  normalizeError,
  logError
} = require('./utils/errorHandler');

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
    if (!id || !pw) {
      throw new ValidationError('ID and password are required');
    }
    
    const user = await userDB.findById(id);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }
    
    const ok = bcrypt.compareSync(pw, user.pw_hash);
    if (!ok) {
      throw new AuthenticationError('Invalid credentials');
    }

    req.session.user = { 
      id: user.id, 
      name: user.name, 
      isAdmin: !!user.is_admin 
    };
    res.json({ ok: true, user: req.session.user });
  } catch (err) {
    const normalizedError = normalizeError(err, 'Login');
    handleError(normalizedError, res, 'Login', { userId: req.body?.id });
  }
});

app.post('/api/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        logError(err, 'Logout', { sessionId: req.sessionID });
        return res.status(500).json({ error: 'Failed to logout' });
      }
      res.json({ ok: true });
    });
  } catch (err) {
    handleError(normalizeError(err, 'Logout'), res, 'Logout');
  }
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
    const normalizedError = normalizeError(err, 'Fetch Items');
    handleError(normalizedError, res, 'GET /api/items', { status: req.query.status });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    if (isNaN(itemId)) {
      throw new ValidationError('Invalid item ID', 'id');
    }

    const item = await itemDB.findById(itemId);
    if (!item) {
      throw new NotFoundError('Item');
    }
    
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
    const normalizedError = normalizeError(err, 'Fetch Item');
    handleError(normalizedError, res, 'GET /api/items/:id', { itemId: req.params.id });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    if (!req.session.user) {
      throw new AuthenticationError('Login required');
    }
    
    const { title, desc, cat, imgData, lat, lng, radius, storagePlace } = req.body;
    if (!title || lat === undefined || lng === undefined) {
      throw new ValidationError('Title, latitude, and longitude are required');
    }

    // Validate numeric values
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      throw new ValidationError('Latitude and longitude must be valid numbers');
    }

    const item = await itemDB.create({
      title,
      description: desc,
      category: cat,
      imgData,
      lat: parsedLat,
      lng: parsedLng,
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

    res.status(201).json(formatted);
  } catch (err) {
    const normalizedError = normalizeError(err, 'Create Item');
    handleError(normalizedError, res, 'POST /api/items', { 
      userId: req.session?.user?.id,
      hasTitle: !!req.body?.title 
    });
  }
});

app.patch('/api/items/:id', async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin) {
      throw new AuthorizationError('Admin privileges required');
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new ValidationError('Invalid item ID', 'id');
    }

    const updates = {};
    
    if (req.body.status !== undefined) updates.status = req.body.status;
    if (req.body.storagePlace !== undefined) updates.storagePlace = req.body.storagePlace;

    if (Object.keys(updates).length === 0) {
      throw new ValidationError('No fields to update');
    }

    await itemDB.update(id, updates);
    const item = await itemDB.findById(id);
    
    if (!item) {
      throw new NotFoundError('Item');
    }

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
    const normalizedError = normalizeError(err, 'Update Item');
    handleError(normalizedError, res, 'PATCH /api/items/:id', { 
      itemId: req.params.id,
      userId: req.session?.user?.id,
      isAdmin: req.session?.user?.isAdmin 
    });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin) {
      throw new AuthorizationError('Admin privileges required');
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new ValidationError('Invalid item ID', 'id');
    }

    // Check if item exists before deletion
    const item = await itemDB.findById(id);
    if (!item) {
      throw new NotFoundError('Item');
    }

    await itemDB.delete(id);
    res.json({ ok: true });
  } catch (err) {
    const normalizedError = normalizeError(err, 'Delete Item');
    handleError(normalizedError, res, 'DELETE /api/items/:id', { 
      itemId: req.params.id,
      userId: req.session?.user?.id,
      isAdmin: req.session?.user?.isAdmin 
    });
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
      const normalizedError = normalizeError(err, 'Load Chat History');
      logError(normalizedError, 'Socket: chat:join', { socketId: socket.id, nick });
      socket.emit('chat:history', []);
      socket.emit('error', { message: 'Failed to load chat history' });
    }
  });

  socket.on('chat:send', async (msg) => {
    try {
      const nick = (msg.nick || 'Anonymous').toString().slice(0, 50);
      const text = (msg.text || '').toString().slice(0, 2000);
      
      if (!text.trim()) {
        socket.emit('error', { message: 'Message cannot be empty' });
        return;
      }

      const saved = await chatDB.create(nick, text);
      io.emit('chat:new', {
        nick: saved.nick,
        text: saved.text,
        ts: saved.ts
      });
    } catch (err) {
      const normalizedError = normalizeError(err, 'Save Chat Message');
      logError(normalizedError, 'Socket: chat:send', { socketId: socket.id, nick: msg?.nick });
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Item-specific thread chat
  socket.on('thread:join', async ({ itemId, nick }) => {
    if (!itemId) {
      socket.emit('error', { message: 'Item ID is required' });
      return;
    }
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
      const normalizedError = normalizeError(err, 'Load Thread History');
      logError(normalizedError, 'Socket: thread:join', { socketId: socket.id, itemId, nick });
      socket.emit('thread:history', { itemId, msgs: [] });
      socket.emit('error', { message: 'Failed to load thread history' });
    }
  });

  socket.on('thread:leave', ({ itemId }) => {
    if (!itemId) return;
    socket.leave(`item:${itemId}`);
  });

  socket.on('thread:send', async ({ itemId, nick, text, ts }) => {
    if (!itemId || !text) {
      socket.emit('error', { message: 'Item ID and message text are required' });
      return;
    }
    try {
      const safeNick = (nick || 'Anonymous').toString().slice(0, 50);
      const safeText = text.toString().slice(0, 2000);
      
      if (!safeText.trim()) {
        socket.emit('error', { message: 'Message cannot be empty' });
        return;
      }

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
      const normalizedError = normalizeError(err, 'Save Thread Message');
      logError(normalizedError, 'Socket: thread:send', { socketId: socket.id, itemId, nick });
      socket.emit('error', { message: 'Failed to send thread message' });
    }
  });
});

// --- Server Start ---
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Accessible from all network interfaces

// Error handling
server.on('error', (err) => {
  logError(err, 'Server', { port: PORT, code: err.code });
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
  }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logError(err, 'Uncaught Exception', { 
    name: err.name,
    message: err.message,
    stack: err.stack 
  });
  // Give time for error to be logged before exit
  setTimeout(() => {
    process.exit(1);
  }, 100);
});

process.on('unhandledRejection', (reason, promise) => {
  const error = reason instanceof Error ? reason : new Error(String(reason));
  logError(error, 'Unhandled Promise Rejection', { 
    promise: promise.toString(),
    reason: String(reason)
  });
  // In production, we might want to continue running, but for now exit
  setTimeout(() => {
    process.exit(1);
  }, 100);
});

server.listen(PORT, HOST, () => {
  console.log(`http://localhost:${PORT}`);
});
