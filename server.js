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
// 요구 패키지: express, express-session, bcrypt, socket.io, pg (PostgreSQL)
// 설치: npm i express express-session bcrypt socket.io pg
// 실행: node server.js
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

// 개발 모드 확인
const isDev = process.env.NODE_ENV !== 'production';
const debugLog = (...args) => {
  if (isDev) console.log(...args);
};

// --- 세션 설정 ---
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'demo-lost-and-found-secret', // 운영환경에서는 환경변수 사용
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 6, // 6시간
  },
}));

// --- 미들웨어 ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 정적 파일 제공 (현재 디렉터리) ---
app.use(express.static(path.join(__dirname)));

// ✅ 기본 페이지 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'unilost.html'));
});

// --- 로그인/로그아웃 API ---
app.get('/api/me', (req, res) => {
  res.json({ user: req.session.user || null });
});

app.post('/api/login', async (req, res) => {
  try {
    const { id, pw } = req.body || {};
    if (!id || !pw) return res.status(400).json({ error: '아이디/비밀번호 필요' });
    
    const user = await userDB.findById(id);
    if (!user) return res.status(400).json({ error: '존재하지 않는 아이디' });
    
    const ok = bcrypt.compareSync(pw, user.pw_hash);
    if (!ok) return res.status(401).json({ error: '비밀번호 불일치' });

    req.session.user = { 
      id: user.id, 
      name: user.name, 
      isAdmin: !!user.is_admin 
    };
    res.json({ ok: true, user: req.session.user });
  } catch (err) {
    console.error('로그인 오류:', err);
    res.status(500).json({ error: '로그인 실패' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

// --- 분실물 항목 API ---
app.get('/api/items', async (req, res) => {
  try {
    const { status } = req.query;
    let items;
    if (status) {
      items = await itemDB.findAll(status);
    } else {
      items = await itemDB.findAll();
    }
    // 데이터베이스 필드명을 클라이언트가 기대하는 형식으로 변환
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
    console.error('항목 조회 오류:', err);
    res.status(500).json({ error: '항목 조회 실패' });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await itemDB.findById(parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: '항목을 찾을 수 없습니다' });
    
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
    console.error('항목 조회 오류:', err);
    res.status(500).json({ error: '항목 조회 실패' });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ error: '로그인이 필요합니다' });
    }
    
    const { title, desc, cat, imgData, lat, lng, radius, storagePlace } = req.body;
    if (!title || !lat || !lng) {
      return res.status(400).json({ error: '필수 필드가 누락되었습니다' });
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
    console.error('항목 생성 오류:', err);
    res.status(500).json({ error: '항목 생성 실패' });
  }
});

app.patch('/api/items/:id', async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(403).json({ error: '관리자 권한이 필요합니다' });
    }

    const id = parseInt(req.params.id);
    const updates = {};
    
    if (req.body.status !== undefined) updates.status = req.body.status;
    if (req.body.storagePlace !== undefined) updates.storagePlace = req.body.storagePlace;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: '업데이트할 필드가 없습니다' });
    }

    await itemDB.update(id, updates);
    const item = await itemDB.findById(id);
    
    if (!item) return res.status(404).json({ error: '항목을 찾을 수 없습니다' });

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
    console.error('항목 업데이트 오류:', err);
    res.status(500).json({ error: '항목 업데이트 실패' });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(403).json({ error: '관리자 권한이 필요합니다' });
    }

    const id = parseInt(req.params.id);
    await itemDB.delete(id);
    res.json({ ok: true });
  } catch (err) {
    console.error('항목 삭제 오류:', err);
    res.status(500).json({ error: '항목 삭제 실패' });
  }
});

// --- Socket.IO (채팅 + 항목별 스레드) ---
io.on('connection', (socket) => {
  debugLog('✅ 클라이언트 연결됨');

  // 전역 채팅
  socket.on('chat:join', async ({ nick }) => {
    try {
      const messages = await chatDB.findAll(200);
      // 데이터베이스 형식을 클라이언트 형식으로 변환
      const formatted = messages.map(msg => ({
        nick: msg.nick,
        text: msg.text,
        ts: msg.created_at ? (typeof msg.created_at === 'string' ? msg.created_at : msg.created_at.toISOString()) : new Date().toISOString()
      }));
      socket.emit('chat:history', formatted);
    } catch (err) {
      console.error('채팅 히스토리 로드 오류:', err);
      socket.emit('chat:history', []);
    }
  });

  socket.on('chat:send', async (msg) => {
    try {
      const nick = (msg.nick || '익명').toString().slice(0, 50);
      const text = (msg.text || '').toString().slice(0, 2000);
      
      const saved = await chatDB.create(nick, text);
      io.emit('chat:new', {
        nick: saved.nick,
        text: saved.text,
        ts: saved.ts
      });
    } catch (err) {
      console.error('채팅 메시지 저장 오류:', err);
    }
  });

  // 항목별 스레드 채팅
  socket.on('thread:join', async ({ itemId, nick }) => {
    if (!itemId) return;
    const roomName = `item:${itemId}`;
    socket.join(roomName);
    debugLog(`👤 스레드 참여: itemId=${itemId}, room=${roomName}, socketId=${socket.id}`);
    try {
      const messages = await threadDB.findByItemId(itemId, 200);
      const formatted = messages.map(msg => ({
        nick: msg.nick,
        text: msg.text,
        ts: msg.created_at ? (typeof msg.created_at === 'string' ? msg.created_at : msg.created_at.toISOString()) : new Date().toISOString()
      }));
      socket.emit('thread:history', { itemId, msgs: formatted });
    } catch (err) {
      console.error('스레드 히스토리 로드 오류:', err);
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
      const safeNick = (nick || '익명').toString().slice(0, 50);
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
      
      // 해당 room에 있는 모든 클라이언트에게 브로드캐스트
      io.to(roomName).emit('thread:new', message);
      debugLog(`📨 스레드 메시지 전송: itemId=${itemId}, room=${roomName}, nick=${safeNick}`);
    } catch (err) {
      console.error('스레드 메시지 저장 오류:', err);
    }
  });
});

// --- 서버 시작 ---
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // 모든 네트워크 인터페이스에서 접속 가능

// 에러 핸들링
server.on('error', (err) => {
  console.error('❌ 서버 에러:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`포트 ${PORT}가 이미 사용 중입니다.`);
  }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ 처리되지 않은 예외:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ 처리되지 않은 Promise 거부:', reason);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  console.log(`http://localhost:${PORT}`);
});
