Technical Overview
==================

This document provides a comprehensive overview of UniLost's architecture, core components, and underlying technologies.

Architecture
------------

UniLost follows a client-server architecture with the following components:

* **Frontend**: Single-page application (SPA) using HTML, JavaScript, and Tailwind CSS
* **Backend**: Node.js server with Express.js framework
* **Database**: PostgreSQL (production) or SQLite (development)
* **Real-time Communication**: Socket.IO for WebSocket connections

System Architecture Diagram
~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

   ┌─────────────┐
   │   Client    │
   │  (Browser)  │
   │             │
   │  Leaflet.js │
   └──────┬──────┘
          │
          ├─────────────────────────┐
          │                         │
          │ HTTP/WebSocket          │ Direct HTTP Requests
          │                         │ (Map Tiles, Geocoding)
          │                         │
   ┌──────▼──────────────────┐     │
   │   Express Server        │     │
   │   (server.js)           │     │
   │                         │     │
   │  ┌──────────────────┐   │     │
   │  │  REST API        │   │     │
   │  │  /api/*          │   │     │
   │  └──────────────────┘   │     │
   │                         │     │
   │  ┌──────────────────┐   │     │
   │  │  Socket.IO       │   │     │
   │  │  Real-time Chat  │   │     │
   │  └──────────────────┘   │     │
   └──────┬──────────────────┘     │
          │                         │
          │ Database Queries        │
          │                         │
   ┌──────▼──────────────┐          │
   │   Database Module   │          │
   │   (db.js)           │          │
   └──────┬──────────────┘          │
          │                         │
   ┌──────▼──────────────┐          │
   │  PostgreSQL/SQLite  │          │
   └─────────────────────┘          │
                                    │
                          ┌─────────▼──────────────┐
                          │  External Services     │
                          │                        │
                          │  OpenStreetMap         │
                          │  - Tile Server         │
                          │  - Nominatim API       │
                          └────────────────────────┘

Core Components
---------------

Server (server.js)
~~~~~~~~~~~~~~~~~~

The main server file handles:

* **HTTP Server**: Express.js application serving static files and API endpoints
* **Session Management**: Express-session middleware for user authentication
* **REST API**: Endpoints for authentication, item management, and data retrieval
* **Socket.IO Server**: Real-time communication for chat and item threads
* **Error Handling**: Global error handlers for uncaught exceptions

Database Module (db.js)
~~~~~~~~~~~~~~~~~~~~~~~

The database module provides:

* **Connection Management**: Handles both PostgreSQL and SQLite connections
* **Database Abstraction**: Unified interface for database operations
* **Table Initialization**: Automatic schema creation and default data
* **Query Functions**: CRUD operations for users, items, chat, and threads

Frontend (unilost.html)
~~~~~~~~~~~~~~~~~~~~~~~

The frontend includes:

* **Map Integration**: Leaflet.js for interactive maps
* **UI Components**: Modal dialogs, forms, and navigation
* **Real-time Updates**: Socket.IO client for live chat
* **API Client**: Fetch API for REST endpoint communication
* **Responsive Design**: Tailwind CSS for mobile and desktop layouts

Database Schema
---------------

Users Table
~~~~~~~~~~~

.. code-block:: sql

   CREATE TABLE users (
       id VARCHAR(255) PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       pw_hash VARCHAR(255) NOT NULL,
       is_admin BOOLEAN DEFAULT FALSE,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

Items Table
~~~~~~~~~~~

.. code-block:: sql

   CREATE TABLE items (
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
   );

Chat Messages Table
~~~~~~~~~~~~~~~~~~~

.. code-block:: sql

   CREATE TABLE chat_messages (
       id SERIAL PRIMARY KEY,
       nick VARCHAR(100) NOT NULL,
       text TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

Thread Messages Table
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: sql

   CREATE TABLE thread_messages (
       id SERIAL PRIMARY KEY,
       item_id INTEGER NOT NULL,
       nick VARCHAR(100) NOT NULL,
       text TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
   );

Technologies Used
-----------------

Backend Technologies
~~~~~~~~~~~~~~~~~~~~

* **Node.js**: JavaScript runtime environment
* **Express.js**: Web application framework
* **Express-session**: Session management middleware
* **bcrypt**: Password hashing library
* **Socket.IO**: Real-time bidirectional communication
* **pg**: PostgreSQL client for Node.js
* **better-sqlite3**: SQLite database driver

Frontend Technologies
~~~~~~~~~~~~~~~~~~~~~

* **HTML5**: Markup language
* **JavaScript (ES6+)**: Programming language
* **Tailwind CSS**: Utility-first CSS framework
* **Leaflet.js**: Interactive map library
* **OpenStreetMap**: Map tile provider
* **Socket.IO Client**: Real-time communication client

Database Technologies
~~~~~~~~~~~~~~~~~~~~~

* **PostgreSQL**: Production database (distributed)
* **SQLite**: Development database (file-based)

Security Features
-----------------

* **Password Hashing**: bcrypt with salt rounds
* **Session Security**: HttpOnly cookies, SameSite protection
* **Input Validation**: Server-side validation for all inputs
* **SQL Injection Prevention**: Parameterized queries
* **XSS Protection**: Input sanitization and output encoding

Data Flow
---------

Item Registration Flow
~~~~~~~~~~~~~~~~~~~~~~

1. User fills out registration form
2. Frontend sends POST request to ``/api/items``
3. Server validates input and checks authentication
4. Database module creates new item record
5. Server returns created item data
6. Frontend updates map with new item marker

Real-time Chat Flow
~~~~~~~~~~~~~~~~~~~

1. Client connects via Socket.IO
2. Client emits ``chat:join`` event
3. Server loads chat history from database
4. Server emits ``chat:history`` to client
5. When user sends message, client emits ``chat:send``
6. Server saves message to database
7. Server broadcasts ``chat:new`` to all connected clients

Performance Considerations
--------------------------

* **Database Indexing**: Indexes on frequently queried columns
* **Connection Pooling**: PostgreSQL connection pool management
* **Caching**: Session data caching
* **Lazy Loading**: Map markers loaded on demand
* **Pagination**: Chat history limited to recent messages

Scalability
-----------

* **Horizontal Scaling**: Stateless server design allows multiple instances
* **Database Scaling**: PostgreSQL supports replication and sharding
* **Load Balancing**: Compatible with reverse proxies (nginx, etc.)
* **CDN Integration**: Static assets can be served from CDN

For API details, see :doc:`api-reference`. For configuration options, see :doc:`configuration-guide`.

