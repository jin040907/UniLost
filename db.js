// db.js - PostgreSQL 데이터베이스 모듈
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// 데이터베이스 연결 설정
// 환경변수 DATABASE_URL이 있으면 사용, 없으면 로컬 개발용 SQLite로 폴백
const usePostgres = !!process.env.DATABASE_URL;

let pool;
let db; // SQLite 호환성을 위한 변수 (사용하지 않음)

if (usePostgres) {
  // PostgreSQL 연결 풀 생성
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') ? false : {
      rejectUnauthorized: false
    }
  });

  pool.on('error', (err) => {
    console.error('❌ PostgreSQL 연결 풀 에러:', err);
  });
} else {
  // 로컬 개발용 SQLite (선택적)
  try {
    const Database = require('better-sqlite3');
    const path = require('path');
    const dbPath = path.join(__dirname, 'unilost.db');
    db = new Database(dbPath);
  } catch (err) {
    console.error('❌ SQLite 연결 실패:', err);
    throw new Error('DATABASE_URL 환경변수를 설정하거나 SQLite를 사용할 수 없습니다.');
  }
}

// 데이터베이스 초기화 (PostgreSQL)
async function initDBPostgres() {
  const client = await pool.connect();
  try {
    // 사용자 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        pw_hash VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 분실물 항목 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        img_data TEXT,
        lat DOUBLE PRECISION NOT NULL,
        lng DOUBLE PRECISION NOT NULL,
        radius DOUBLE PRECISION DEFAULT 0,
        status VARCHAR(50) DEFAULT 'pending',
        storage_place VARCHAR(255),
        created_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);

    // 전역 채팅 메시지 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        nick VARCHAR(100) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 항목별 스레드 메시지 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS thread_messages (
        id SERIAL PRIMARY KEY,
        item_id INTEGER NOT NULL,
        nick VARCHAR(100) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
      )
    `);

    // 인덱스 생성
    await client.query(`CREATE INDEX IF NOT EXISTS idx_items_status ON items(status)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_thread_item_id ON thread_messages(item_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_chat_created_at ON chat_messages(created_at)`);

    // 기본 사용자 추가 (없는 경우만)
    const userCount = await client.query('SELECT COUNT(*) as count FROM users');
    if (parseInt(userCount.rows[0].count) === 0) {
      await client.query(
        'INSERT INTO users (id, name, pw_hash, is_admin) VALUES ($1, $2, $3, $4)',
        ['student1', '학생1', bcrypt.hashSync('1234', 10), false]
      );
      await client.query(
        'INSERT INTO users (id, name, pw_hash, is_admin) VALUES ($1, $2, $3, $4)',
        ['admin1', '관리자1', bcrypt.hashSync('admin123', 10), true]
      );
      // 기본 사용자 생성 완료
    }
  } finally {
    client.release();
  }
}

// 데이터베이스 초기화 (SQLite - 로컬 개발용)
function initDBSQLite() {
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
  }
}

// 사용자 관련 함수 (PostgreSQL)
const userDBPostgres = {
  findById: async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  },
  findAll: async () => {
    const result = await pool.query('SELECT id, name, is_admin FROM users');
    return result.rows;
  },
  create: async (id, name, pwHash, isAdmin = false) => {
    const result = await pool.query(
      'INSERT INTO users (id, name, pw_hash, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, name, pwHash, isAdmin]
    );
    return result.rows[0];
  }
};

// 사용자 관련 함수 (SQLite)
const userDBSQLite = {
  findById: (id) => {
    const result = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    return result || null;
  },
  findAll: () => {
    return db.prepare('SELECT id, name, is_admin FROM users').all();
  },
  create: (id, name, pwHash, isAdmin = 0) => {
    const stmt = db.prepare('INSERT INTO users (id, name, pw_hash, is_admin) VALUES (?, ?, ?, ?)');
    return stmt.run(id, name, pwHash, isAdmin);
  }
};

// 분실물 항목 관련 함수 (PostgreSQL)
const itemDBPostgres = {
  findAll: async (status = null) => {
    if (status) {
      const result = await pool.query(
        'SELECT * FROM items WHERE status = $1 ORDER BY created_at DESC',
        [status]
      );
      return result.rows;
    }
    const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
    return result.rows;
  },
  findById: async (id) => {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return result.rows[0] || null;
  },
  create: async (data) => {
    const result = await pool.query(`
      INSERT INTO items (title, description, category, img_data, lat, lng, radius, status, storage_place, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
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
    ]);
    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      category: row.category,
      imgData: row.img_data,
      lat: row.lat,
      lng: row.lng,
      radius: row.radius,
      status: row.status,
      storagePlace: row.storage_place,
      created_at: row.created_at,
      createdBy: row.created_by
    };
  },
  update: async (id, data) => {
    const fields = [];
    const values = [];
    let paramIndex = 1;
    
    Object.keys(data).forEach(key => {
      if (key === 'storage_place' || key === 'storagePlace') {
        fields.push(`storage_place = $${paramIndex++}`);
        values.push(data[key] || null);
      } else if (key === 'status') {
        fields.push(`status = $${paramIndex++}`);
        values.push(data[key]);
      }
    });
    
    if (fields.length === 0) return null;
    values.push(id);
    const result = await pool.query(
      `UPDATE items SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    const row = result.rows[0];
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      category: row.category,
      imgData: row.img_data,
      lat: row.lat,
      lng: row.lng,
      radius: row.radius,
      status: row.status,
      storagePlace: row.storage_place,
      created_at: row.created_at,
      createdBy: row.created_by
    };
  },
  delete: async (id) => {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    return { ok: true };
  }
};

// 분실물 항목 관련 함수 (SQLite)
const itemDBSQLite = {
  findAll: (status = null) => {
    if (status) {
      return db.prepare('SELECT * FROM items WHERE status = ? ORDER BY created_at DESC').all(status);
    }
    return db.prepare('SELECT * FROM items ORDER BY created_at DESC').all();
  },
  findById: (id) => {
    return db.prepare('SELECT * FROM items WHERE id = ?').get(id);
  },
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

// 채팅 메시지 관련 함수 (PostgreSQL)
const chatDBPostgres = {
  findAll: async (limit = 200) => {
    const result = await pool.query(
      'SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT $1',
      [limit]
    );
    return result.rows.reverse(); // 최신순으로 정렬
  },
  create: async (nick, text) => {
    const result = await pool.query(
      'INSERT INTO chat_messages (nick, text) VALUES ($1, $2) RETURNING *',
      [nick, text]
    );
    const row = result.rows[0];
    return {
      id: row.id,
      nick: row.nick,
      text: row.text,
      ts: row.created_at.toISOString()
    };
  }
};

// 채팅 메시지 관련 함수 (SQLite)
const chatDBSQLite = {
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

// 스레드 메시지 관련 함수 (PostgreSQL)
const threadDBPostgres = {
  findByItemId: async (itemId, limit = 200) => {
    const result = await pool.query(
      'SELECT * FROM thread_messages WHERE item_id = $1 ORDER BY created_at ASC LIMIT $2',
      [itemId, limit]
    );
    return result.rows;
  },
  create: async (itemId, nick, text) => {
    const result = await pool.query(
      'INSERT INTO thread_messages (item_id, nick, text) VALUES ($1, $2, $3) RETURNING *',
      [itemId, nick, text]
    );
    const row = result.rows[0];
    return {
      id: row.id,
      itemId: row.item_id,
      nick: row.nick,
      text: row.text,
      ts: row.created_at.toISOString()
    };
  }
};

// 스레드 메시지 관련 함수 (SQLite)
const threadDBSQLite = {
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

// 데이터베이스 타입에 따라 적절한 함수 선택
const userDB = usePostgres ? userDBPostgres : userDBSQLite;
const itemDB = usePostgres ? itemDBPostgres : itemDBSQLite;
const chatDB = usePostgres ? chatDBPostgres : chatDBSQLite;
const threadDB = usePostgres ? threadDBPostgres : threadDBSQLite;

// 초기화 실행
(async () => {
  try {
    if (usePostgres) {
      await initDBPostgres();
    } else {
      initDBSQLite();
    }
  } catch (err) {
    console.error('❌ 데이터베이스 초기화 실패:', err);
    throw err;
  }
})();

module.exports = {
  db: usePostgres ? pool : db,
  userDB,
  itemDB,
  chatDB,
  threadDB,
  usePostgres
};
