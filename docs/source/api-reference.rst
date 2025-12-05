API Reference
=============

This document provides detailed information about all available API endpoints, request/response formats, and usage examples.

Base URL
--------

All API endpoints are relative to the base URL:

.. code-block:: text

   http://localhost:3000/api

Authentication
--------------

Most endpoints require authentication via session cookies. The session is established through the login endpoint.

Authentication Endpoints
------------------------

GET /api/me
~~~~~~~~~~~

Get information about the currently logged-in user.

**Request:**

.. code-block:: http

   GET /api/me HTTP/1.1
   Cookie: sid=session_id_here

**Response (200 OK):**

.. code-block:: json

   {
     "user": {
       "id": "student1",
       "name": "Student 1",
       "isAdmin": false
     }
   }

**Response (Not Logged In):**

.. code-block:: json

   {
     "user": null
   }

POST /api/login
~~~~~~~~~~~~~~~

Authenticate a user and create a session.

**Request:**

.. code-block:: http

   POST /api/login HTTP/1.1
   Content-Type: application/json

   {
     "id": "student1",
     "pw": "1234"
   }

**Response (200 OK):**

.. code-block:: json

   {
     "ok": true,
     "user": {
       "id": "student1",
       "name": "Student 1",
       "isAdmin": false
     }
   }

**Response (400 Bad Request):**

.. code-block:: json

   {
     "error": "ID and password required"
   }

**Response (401 Unauthorized):**

.. code-block:: json

   {
     "error": "Invalid password"
   }

POST /api/logout
~~~~~~~~~~~~~~~~

Destroy the current session.

**Request:**

.. code-block:: http

   POST /api/logout HTTP/1.1
   Cookie: sid=session_id_here

**Response (200 OK):**

.. code-block:: json

   {
     "ok": true
   }

Item Endpoints
--------------

GET /api/items
~~~~~~~~~~~~~~

Retrieve all items, optionally filtered by status.

**Query Parameters:**

* ``status`` (optional): Filter by status (``pending``, ``approved``)

**Request:**

.. code-block:: http

   GET /api/items?status=approved HTTP/1.1

**Response (200 OK):**

.. code-block:: json

   [
     {
       "id": 1,
       "title": "Lost Black Wallet",
       "desc": "Black leather wallet with credit cards",
       "cat": "Wallet",
       "imgData": "data:image/jpeg;base64,...",
       "lat": 37.5502,
       "lng": 127.0750,
       "radius": 50,
       "status": "approved",
       "storagePlace": "Student Affairs Office, 1st Floor, Locker A-3",
       "created_at": "2025-01-17T10:30:00.000Z",
       "createdBy": "student1"
     }
   ]

GET /api/items/:id
~~~~~~~~~~~~~~~~~~

Retrieve a specific item by ID.

**Path Parameters:**

* ``id``: Item ID (integer)

**Request:**

.. code-block:: http

   GET /api/items/1 HTTP/1.1

**Response (200 OK):**

.. code-block:: json

   {
     "id": 1,
     "title": "Lost Black Wallet",
     "desc": "Black leather wallet with credit cards",
     "cat": "Wallet",
     "imgData": "data:image/jpeg;base64,...",
     "lat": 37.5502,
     "lng": 127.0750,
     "radius": 50,
     "status": "approved",
     "storagePlace": "Student Affairs Office, 1st Floor, Locker A-3",
     "created_at": "2025-01-17T10:30:00.000Z",
     "createdBy": "student1"
   }

**Response (404 Not Found):**

.. code-block:: json

   {
     "error": "Item not found"
   }

POST /api/items
~~~~~~~~~~~~~~~

Create a new lost item. Requires authentication.

**Request:**

.. code-block:: http

   POST /api/items HTTP/1.1
   Content-Type: application/json
   Cookie: sid=session_id_here

   {
     "title": "Lost Black Wallet",
     "desc": "Black leather wallet with credit cards",
     "cat": "Wallet",
     "imgData": "data:image/jpeg;base64,...",
     "lat": 37.5502,
     "lng": 127.0750,
     "radius": 50,
     "storagePlace": "Student Affairs Office, 1st Floor, Locker A-3"
   }

**Required Fields:**

* ``title``: Item title (string)
* ``lat``: Latitude (number)
* ``lng``: Longitude (number)

**Optional Fields:**

* ``desc``: Description (string)
* ``cat``: Category (string)
* ``imgData``: Base64 encoded image (string)
* ``radius``: Search radius in meters (number, default: 0)
* ``storagePlace``: Storage location (string)

**Response (200 OK):**

.. code-block:: json

   {
     "id": 1,
     "title": "Lost Black Wallet",
     "desc": "Black leather wallet with credit cards",
     "cat": "Wallet",
     "imgData": "data:image/jpeg;base64,...",
     "lat": 37.5502,
     "lng": 127.0750,
     "radius": 50,
     "status": "pending",
     "storagePlace": "Student Affairs Office, 1st Floor, Locker A-3",
     "created_at": "2025-01-17T10:30:00.000Z",
     "createdBy": "student1"
   }

**Response (401 Unauthorized):**

.. code-block:: json

   {
     "error": "Login required"
   }

**Response (400 Bad Request):**

.. code-block:: json

   {
     "error": "Required fields missing"
   }

PATCH /api/items/:id
~~~~~~~~~~~~~~~~~~~~

Update an item. Requires administrator privileges.

**Path Parameters:**

* ``id``: Item ID (integer)

**Request:**

.. code-block:: http

   PATCH /api/items/1 HTTP/1.1
   Content-Type: application/json
   Cookie: sid=session_id_here

   {
     "status": "approved",
     "storagePlace": "Student Affairs Office, 1st Floor, Locker A-3"
   }

**Updatable Fields:**

* ``status``: Item status (``pending``, ``approved``, ``rejected``)
* ``storagePlace``: Storage location (string)

**Response (200 OK):**

Returns the updated item object (same format as GET /api/items/:id).

**Response (403 Forbidden):**

.. code-block:: json

   {
     "error": "Admin privileges required"
   }

DELETE /api/items/:id
~~~~~~~~~~~~~~~~~~~~~

Delete an item. Requires administrator privileges.

**Path Parameters:**

* ``id``: Item ID (integer)

**Request:**

.. code-block:: http

   DELETE /api/items/1 HTTP/1.1
   Cookie: sid=session_id_here

**Response (200 OK):**

.. code-block:: json

   {
     "ok": true
   }

**Response (403 Forbidden):**

.. code-block:: json

   {
     "error": "Admin privileges required"
   }

Socket.IO Events
----------------

Chat Events
~~~~~~~~~~~

chat:join
^^^^^^^^^

Join the global chat and receive chat history.

**Emit:**

.. code-block:: javascript

   socket.emit('chat:join', { nick: 'username' });

**Listen:**

.. code-block:: javascript

   socket.on('chat:history', (messages) => {
     // messages: Array of chat messages
   });

chat:send
^^^^^^^^^

Send a message to the global chat.

**Emit:**

.. code-block:: javascript

   socket.emit('chat:send', {
     nick: 'username',
     text: 'Hello, everyone!'
   });

**Listen:**

.. code-block:: javascript

   socket.on('chat:new', (message) => {
     // message: { nick, text, ts }
   });

Thread Events
~~~~~~~~~~~~~

thread:join
^^^^^^^^^^^

Join an item-specific thread and receive thread history.

**Emit:**

.. code-block:: javascript

   socket.emit('thread:join', {
     itemId: 1,
     nick: 'username'
   });

**Listen:**

.. code-block:: javascript

   socket.on('thread:history', ({ itemId, msgs }) => {
     // msgs: Array of thread messages
   });

thread:send
^^^^^^^^^^^

Send a message to an item-specific thread.

**Emit:**

.. code-block:: javascript

   socket.emit('thread:send', {
     itemId: 1,
     nick: 'username',
     text: 'Is this still available?'
   });

**Listen:**

.. code-block:: javascript

   socket.on('thread:new', ({ itemId, msg }) => {
     // msg: { nick, text, ts }
   });

thread:leave
^^^^^^^^^^^^

Leave an item-specific thread.

**Emit:**

.. code-block:: javascript

   socket.emit('thread:leave', { itemId: 1 });

Error Responses
---------------

All endpoints may return the following error responses:

* **400 Bad Request**: Invalid request parameters
* **401 Unauthorized**: Authentication required
* **403 Forbidden**: Insufficient permissions
* **404 Not Found**: Resource not found
* **500 Internal Server Error**: Server error

Error response format:

**Production:**
.. code-block:: json

   {
     "error": "Error message description"
   }

**Development (additional details):**
.. code-block:: json

   {
     "error": "Error message description",
     "details": {
       "name": "ErrorType",
       "stack": "...",
       "field": "fieldName"  // if applicable
     }
   }

For more information, see :doc:`getting-started` and :doc:`technical-overview`.

