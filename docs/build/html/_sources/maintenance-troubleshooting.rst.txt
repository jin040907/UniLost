Maintenance and Troubleshooting
================================

This guide provides procedures for routine maintenance, common issues, and their resolutions.

Routine Maintenance
-------------------

Database Maintenance
~~~~~~~~~~~~~~~~~~~~

**PostgreSQL:**

* **Regular Backups**: Schedule automated backups of your PostgreSQL database
* **Vacuum**: Run ``VACUUM`` periodically to reclaim storage space
* **Analyze**: Run ``ANALYZE`` to update query planner statistics
* **Connection Pooling**: Monitor connection pool usage

**SQLite:**

* **Backup Database File**: Regularly copy ``unilost.db`` to a backup location
* **Vacuum**: Run ``VACUUM`` to optimize database file size
* **Integrity Check**: Run ``PRAGMA integrity_check`` to verify database integrity

**Example Backup Script (PostgreSQL):**

.. code-block:: bash

   #!/bin/bash
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

**Example Backup Script (SQLite):**

.. code-block:: bash

   #!/bin/bash
   cp unilost.db backup_$(date +%Y%m%d_%H%M%S).db

Log Monitoring
~~~~~~~~~~~~~~

Monitor server logs for:

* **Error Messages**: Check for uncaught exceptions or database errors
* **Performance Issues**: Monitor response times and connection counts
* **Security Events**: Watch for failed login attempts or suspicious activity

**View Logs:**

.. code-block:: bash

   # If using PM2
   pm2 logs unilost

   # If using systemd
   journalctl -u unilost -f

   # Direct output
   node server.js 2>&1 | tee server.log

Session Management
~~~~~~~~~~~~~~~~~~

* **Session Cleanup**: Sessions expire after 6 hours automatically
* **Monitor Active Sessions**: Check session store for active sessions
* **Clear Expired Sessions**: Expired sessions are automatically cleaned up

Common Issues and Solutions
---------------------------

Port Already in Use
~~~~~~~~~~~~~~~~~~~

**Error Message:**

.. code-block:: text

   Error: listen EADDRINUSE: address already in use :::3000

**Solution 1: Change Port**

.. code-block:: bash

   export PORT=3001
   node server.js

**Solution 2: Kill Process Using Port**

.. code-block:: bash

   # Find process using port 3000
   lsof -ti:3000

   # Kill the process
   kill -9 $(lsof -ti:3000)

Database Connection Error
~~~~~~~~~~~~~~~~~~~~~~~~~

**Error Message:**

.. code-block:: text

   ❌ PostgreSQL connection pool error: connect ECONNREFUSED

**Solutions:**

1. **Check DATABASE_URL**: Verify the connection string is correct
2. **Check Database Server**: Ensure PostgreSQL is running
3. **Check Network**: Verify network connectivity to database host
4. **Check Credentials**: Verify username and password are correct
5. **Check Firewall**: Ensure firewall allows connections on port 5432

**Test Connection:**

.. code-block:: bash

   # PostgreSQL
   psql $DATABASE_URL

   # SQLite
   sqlite3 unilost.db

Module Not Found
~~~~~~~~~~~~~~~~

**Error Message:**

.. code-block:: text

   Error: Cannot find module 'express'

**Solution:**

.. code-block:: bash

   npm install

**Verify Installation:**

.. code-block:: bash

   npm list

Session Not Persisting
~~~~~~~~~~~~~~~~~~~~~~

**Symptoms:**

* User gets logged out immediately
* Session data is lost on page refresh

**Solutions:**

1. **Check SESSION_SECRET**: Ensure it's set and consistent
2. **Check Cookie Settings**: Verify cookies are enabled in browser
3. **Check HTTPS**: In production, ensure HTTPS is used (secure cookies)
4. **Check SameSite**: Verify SameSite cookie setting is appropriate

**Debug Session:**

.. code-block:: javascript

   // Add to server.js temporarily
   app.get('/debug/session', (req, res) => {
     res.json({
       session: req.session,
       cookies: req.cookies
     });
   });

Map Not Loading
~~~~~~~~~~~~~~~

**Symptoms:**

* Map tiles don't appear
* Map shows gray background

**Solutions:**

1. **Check Internet Connection**: Map tiles are loaded from OpenStreetMap
2. **Check Browser Console**: Look for JavaScript errors
3. **Check Leaflet.js**: Verify Leaflet.js is loaded correctly
4. **Check CORS**: Ensure no CORS issues with map tile servers

**Debug Map:**

.. code-block:: javascript

   // Check if Leaflet is loaded
   console.log(typeof L);

   // Check map instance
   console.log(mapRegister);

Socket.IO Connection Issues
~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Symptoms:**

* Chat messages not sending
* Real-time updates not working

**Solutions:**

1. **Check Socket.IO Server**: Verify server is running
2. **Check Client Connection**: Verify Socket.IO client is connected
3. **Check CORS**: Ensure CORS is configured correctly
4. **Check Firewall**: Ensure WebSocket connections are allowed

**Debug Socket.IO:**

.. code-block:: javascript

   // Server side
   io.on('connection', (socket) => {
     console.log('Client connected:', socket.id);
   });

   // Client side
   socket.on('connect', () => {
     console.log('Connected to server');
   });

   socket.on('disconnect', () => {
     console.log('Disconnected from server');
   });

Database Schema Errors
~~~~~~~~~~~~~~~~~~~~~~

**Error Message:**

.. code-block:: text

   Error: relation "users" does not exist

**Solution:**

The database tables are created automatically on first run. If this error occurs:

1. **Check Database Connection**: Ensure database is accessible
2. **Check Permissions**: Verify database user has CREATE TABLE permissions
3. **Manual Initialization**: Run database initialization manually

**Manual Initialization:**

.. code-block:: javascript

   // In db.js, call initDBPostgres() or initDBSQLite()
   const { initDBPostgres, initDBSQLite } = require('./db');
   
   if (usePostgres) {
     initDBPostgres().then(() => {
       console.log('Database initialized');
     });
   } else {
     initDBSQLite();
     console.log('Database initialized');
   }

Performance Issues
------------------

Slow Response Times
~~~~~~~~~~~~~~~~~~~

**Possible Causes:**

* Database queries are slow
* Too many concurrent connections
* Large image data in database
* Missing database indexes

**Solutions:**

1. **Add Database Indexes**: Ensure indexes exist on frequently queried columns
2. **Optimize Queries**: Review and optimize slow queries
3. **Connection Pooling**: Adjust PostgreSQL connection pool size
4. **Image Optimization**: Compress images before storing
5. **Caching**: Implement caching for frequently accessed data

High Memory Usage
~~~~~~~~~~~~~~~~~

**Possible Causes:**

* Memory leaks in code
* Large session data
* Too many concurrent connections

**Solutions:**

1. **Monitor Memory**: Use tools like ``node --inspect`` or ``clinic.js``
2. **Review Code**: Check for memory leaks (unclosed connections, etc.)
3. **Limit Sessions**: Reduce session max age if needed
4. **Connection Limits**: Limit database connection pool size

Security Issues
---------------

Failed Login Attempts
~~~~~~~~~~~~~~~~~~~~~

**Monitoring:**

Monitor logs for repeated failed login attempts from the same IP address.

**Prevention:**

* Implement rate limiting for login endpoints
* Use CAPTCHA for repeated failures
* Implement account lockout after multiple failures

SQL Injection Prevention
~~~~~~~~~~~~~~~~~~~~~~~~

**Current Protection:**

* All queries use parameterized statements
* Input validation on all endpoints

**Verification:**

Review all database queries to ensure they use parameterized statements:

.. code-block:: javascript

   // ✅ Good: Parameterized query
   await client.query('SELECT * FROM users WHERE id = $1', [userId]);

   // ❌ Bad: String concatenation (vulnerable)
   await client.query(`SELECT * FROM users WHERE id = '${userId}'`);

XSS Prevention
~~~~~~~~~~~~~~

**Current Protection:**

* Input sanitization
* Output encoding

**Verification:**

Ensure all user input is sanitized before storing and encoded before displaying.

Getting Help
------------

If you encounter issues not covered in this guide:

1. **Check Logs**: Review server and browser console logs
2. **Check Documentation**: Review other documentation pages
3. **GitHub Issues**: Report issues on the GitHub repository
4. **Community**: Reach out to the project maintainers

For more information, see :doc:`configuration-guide` and :doc:`api-reference`.

