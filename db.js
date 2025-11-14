// db.js - SQLite 데이터베이스 모듈
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'campuslost.db');
const db = new Database(dbPath);

// 데이터베이스 초기화
function initDB() {
  // 사용자 테이블
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      pw_hash TEXT NOT NULL,
      is_admin INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 분실물 항목 테이블
  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      img_data TEXT,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      radius REAL DEFAULT 0,
      status TEXT DEFAULT 'pending',
      storage_place TEXT,
      created_by TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  // 전역 채팅 메시지 테이블
  db.exec(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nick TEXT NOT NULL,
      text TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 항목별 스레드 메시지 테이블
  db.exec(`
    CREATE TABLE IF NOT EXISTS thread_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL,
      nick TEXT NOT NULL,
      text TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
    )
  `);

  // 인덱스 생성
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_items_status ON items(status);
    CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at);
    CREATE INDEX IF NOT EXISTS idx_thread_item_id ON thread_messages(item_id);
    CREATE INDEX IF NOT EXISTS idx_chat_created_at ON chat_messages(created_at);
  `);

  // 기본 사용자 추가 (없는 경우만)
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (userCount.count === 0) {
    const insertUser = db.prepare('INSERT INTO users (id, name, pw_hash, is_admin) VALUES (?, ?, ?, ?)');
    insertUser.run('student1', '학생1', bcrypt.hashSync('1234', 10), 0);
    insertUser.run('admin1', '관리자1', bcrypt.hashSync('admin123', 10), 1);
    console.log('✅ 기본 사용자 생성 완료');
  }

  console.log('✅ 데이터베이스 초기화 완료');
}

// 사용자 관련 함수
const userDB = {
  findById: (id) => db.prepare('SELECT * FROM users WHERE id = ?').get(id),
  findAll: () => db.prepare('SELECT id, name, is_admin FROM users').all(),
  create: (id, name, pwHash, isAdmin = 0) => {
    const stmt = db.prepare('INSERT INTO users (id, name, pw_hash, is_admin) VALUES (?, ?, ?, ?)');
    return stmt.run(id, name, pwHash, isAdmin);
  }
};

// 분실물 항목 관련 함수
const itemDB = {
  findAll: (status = null) => {
    if (status) {
      return db.prepare('SELECT * FROM items WHERE status = ? ORDER BY created_at DESC').all(status);
    }
    return db.prepare('SELECT * FROM items ORDER BY created_at DESC').all();
  },
  findById: (id) => db.prepare('SELECT * FROM items WHERE id = ?').get(id),
  create: (data) => {
    const stmt = db.prepare(`
      INSERT INTO items (title, description, category, img_data, lat, lng, radius, status, storage_place, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.title,
      data.description || null,
      data.category || null,
      data.imgData || null,
      data.lat,
      data.lng,
      data.radius || 0,
      data.status || 'pending',
      data.storagePlace || null,
      data.createdBy || null
    );
    return { id: result.lastInsertRowid, ...data };
  },
  update: (id, data) => {
    const fields = [];
    const values = [];
    Object.keys(data).forEach(key => {
      if (key === 'storage_place' || key === 'storagePlace') {
        fields.push('storage_place = ?');
        values.push(data[key] || null);
      } else if (key === 'status') {
        fields.push('status = ?');
        values.push(data[key]);
      }
    });
    if (fields.length === 0) return null;
    values.push(id);
    const stmt = db.prepare(`UPDATE items SET ${fields.join(', ')} WHERE id = ?`);
    return stmt.run(...values);
  },
  delete: (id) => {
    const stmt = db.prepare('DELETE FROM items WHERE id = ?');
    return stmt.run(id);
  }
};

// 채팅 메시지 관련 함수
const chatDB = {
  findAll: (limit = 200) => {
    return db.prepare('SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT ?').all(limit);
  },
  create: (nick, text) => {
    const stmt = db.prepare('INSERT INTO chat_messages (nick, text) VALUES (?, ?)');
    const result = stmt.run(nick, text);
    return {
      id: result.lastInsertRowid,
      nick,
      text,
      ts: new Date().toISOString()
    };
  }
};

// 스레드 메시지 관련 함수
const threadDB = {
  findByItemId: (itemId, limit = 200) => {
    return db.prepare('SELECT * FROM thread_messages WHERE item_id = ? ORDER BY created_at ASC LIMIT ?').all(itemId, limit);
  },
  create: (itemId, nick, text) => {
    const stmt = db.prepare('INSERT INTO thread_messages (item_id, nick, text) VALUES (?, ?, ?)');
    const result = stmt.run(itemId, nick, text);
    return {
      id: result.lastInsertRowid,
      itemId,
      nick,
      text,
      ts: new Date().toISOString()
    };
  }
};

// 초기화 실행
initDB();

module.exports = {
  db,
  userDB,
  itemDB,
  chatDB,
  threadDB
};

