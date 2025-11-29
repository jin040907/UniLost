Configuration Guide
===================

This guide explains all configuration options, default settings, and customization methods for UniLost.

Environment Variables
---------------------

PORT
~~~~

Server port number.

* **Default**: ``3000``
* **Example**: ``export PORT=8080``
* **Usage**: Set the port where the server will listen for connections

SESSION_SECRET
~~~~~~~~~~~~~~

Secret key for session encryption. **Required for production environments.**

* **Default**: ``demo-lost-and-found-secret`` (development only)
* **Example**: ``export SESSION_SECRET="your-random-secret-key-here"``
* **Usage**: Used to sign and encrypt session cookies
* **Security**: Use a strong, random string in production (minimum 32 characters)

DATABASE_URL
~~~~~~~~~~~~

PostgreSQL connection string. If not set, SQLite will be used.

* **Default**: Not set (uses SQLite)
* **Format**: ``postgresql://user:password@host:port/database``
* **Example**: ``export DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/unilost"``
* **SSL**: Automatically enabled for non-localhost connections

NODE_ENV
~~~~~~~~

Node.js environment mode.

* **Default**: Not set (development mode)
* **Options**: ``production``, ``development``
* **Example**: ``export NODE_ENV=production``
* **Effects**: 
  * Production: Disables debug logging, enables optimizations
  * Development: Enables debug logging

Setting Environment Variables
-----------------------------

Linux/macOS
~~~~~~~~~~~

**Temporary (Current Session):**

.. code-block:: bash

   export PORT=3000
   export SESSION_SECRET="your-secret"
   export DATABASE_URL="postgresql://user:pass@host:5432/db"

**Permanent (Add to ~/.bashrc or ~/.zshrc):**

.. code-block:: bash

   echo 'export PORT=3000' >> ~/.bashrc
   echo 'export SESSION_SECRET="your-secret"' >> ~/.bashrc
   echo 'export DATABASE_URL="postgresql://user:pass@host:5432/db"' >> ~/.bashrc
   source ~/.bashrc

**Using .env file (with dotenv package):**

Create a ``.env`` file in the project root:

.. code-block:: text

   PORT=3000
   SESSION_SECRET=your-secret-key
   DATABASE_URL=postgresql://user:pass@host:5432/db
   NODE_ENV=production

Windows
~~~~~~~

**Command Prompt:**

.. code-block:: cmd

   set PORT=3000
   set SESSION_SECRET=your-secret
   set DATABASE_URL=postgresql://user:pass@host:5432/db

**PowerShell:**

.. code-block:: powershell

   $env:PORT=3000
   $env:SESSION_SECRET="your-secret"
   $env:DATABASE_URL="postgresql://user:pass@host:5432/db"

Database Configuration
----------------------

SQLite Configuration
~~~~~~~~~~~~~~~~~~~~

SQLite is used by default when ``DATABASE_URL`` is not set.

* **Database File**: ``unilost.db`` (created in project root)
* **No Configuration Required**: Works out of the box
* **Limitations**: 
  * Single file database
  * Not suitable for production with high concurrency
  * Ephemeral on Render free plan

PostgreSQL Configuration
~~~~~~~~~~~~~~~~~~~~~~~~

For production deployment, use PostgreSQL.

**Connection String Format:**

.. code-block:: text

   postgresql://[user]:[password]@[host]:[port]/[database]?[options]

**Components:**

* **user**: Database username
* **password**: Database password
* **host**: Database hostname or IP address
* **port**: Database port (default: 5432)
* **database**: Database name
* **options**: Additional connection options

**Example Connection Strings:**

.. code-block:: text

   # Local PostgreSQL
   postgresql://postgres:mypassword@localhost:5432/unilost

   # Remote PostgreSQL (with SSL)
   postgresql://user:pass@db.example.com:5432/unilost?sslmode=require

   # Neon PostgreSQL
   postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

**SSL Configuration:**

SSL is automatically enabled for non-localhost connections. To disable SSL:

.. code-block:: text

   postgresql://user:pass@host:5432/db?sslmode=disable

Session Configuration
---------------------

Session settings are configured in ``server.js``:

* **Cookie Name**: ``sid``
* **HttpOnly**: ``true`` (prevents JavaScript access)
* **SameSite**: ``lax`` (CSRF protection)
* **Max Age**: 6 hours (21600000 milliseconds)
* **Secure**: Automatically set in production (HTTPS only)

To modify session settings, edit ``server.js``:

.. code-block:: javascript

   app.use(session({
     name: 'sid',
     secret: process.env.SESSION_SECRET || 'demo-secret',
     resave: false,
     saveUninitialized: false,
     cookie: {
       httpOnly: true,
       sameSite: 'lax',
       maxAge: 1000 * 60 * 60 * 6, // 6 hours
       secure: process.env.NODE_ENV === 'production' // HTTPS only in production
     },
   }));

Map Configuration
-----------------

Map bounds are configured in ``unilost.html``:

* **South Korea Bounds**: 
  * South: 33.1
  * North: 38.6
  * West: 124.6
  * East: 131.9

To modify map bounds, edit ``unilost.html``:

.. code-block:: javascript

   const koreaBounds = [[33.1, 124.6], [38.6, 131.9]];
   mapRegister = L.map('mapRegister', {
     maxBounds: koreaBounds,
     maxBoundsViscosity: 1.0,
     minZoom: 7
   });

Default Users
-------------

Default users are created automatically on first database initialization:

**Student Accounts:**
* Usernames: ``student1`` ~ ``student10``
* Password: ``1234``
* Admin: ``false``

**Administrator Accounts:**
* Usernames: ``admin1`` ~ ``admin10``
* Password: ``admin123``
* Admin: ``true``

To modify default users, edit ``db.js``:

.. code-block:: javascript

   // Create student accounts (student1 ~ student10)
   for (let i = 1; i <= 10; i++) {
     await client.query(
       'INSERT INTO users (id, name, pw_hash, is_admin) VALUES ($1, $2, $3, $4)',
       [`student${i}`, `Student ${i}`, bcrypt.hashSync('1234', 10), false]
     );
   }

Production Configuration Checklist
----------------------------------

Before deploying to production:

- [ ] Set ``SESSION_SECRET`` to a strong, random value
- [ ] Set ``NODE_ENV=production``
- [ ] Configure ``DATABASE_URL`` for PostgreSQL
- [ ] Verify SSL is enabled for database connections
- [ ] Review and update default user passwords
- [ ] Configure reverse proxy (nginx, etc.) if needed
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Configure logging and monitoring

Render Deployment Configuration
-------------------------------

The ``render.yaml`` file contains deployment settings:

.. code-block:: yaml

   services:
     - type: web
       name: unilost
       env: node
       buildCommand: npm install
       startCommand: node server.js
       envVars:
         - key: NODE_ENV
           value: production
         - key: SESSION_SECRET
           generateValue: true

For more deployment information, see :doc:`getting-started` and :doc:`maintenance-troubleshooting`.

