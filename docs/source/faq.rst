FAQ
===

Frequently Asked Questions about UniLost.

General Questions
-----------------

What is UniLost?
~~~~~~~~~~~~~~~~

UniLost is an integrated lost and found management system designed for Sejong University. It provides map-based item registration, real-time chat, and administrative tools for managing lost and found items.

Who can use UniLost?
~~~~~~~~~~~~~~~~~~~~

* **Students**: Can register lost items, search for found items, and communicate with other users
* **Administrators**: Can approve/reject item registrations, manage storage locations, and oversee the system

Is UniLost free to use?
~~~~~~~~~~~~~~~~~~~~~~~

Yes, UniLost is open source and free to use. It is licensed under the Apache License 2.0.

Installation Questions
----------------------

What are the system requirements?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Server:**
* Node.js 18.0.0 or later (Node.js 20 LTS recommended)
* npm 9.0.0 or later
* PostgreSQL (for production) or SQLite (for development)

**Client:**
* Modern web browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

Do I need to install PostgreSQL?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No, PostgreSQL is optional. UniLost uses SQLite by default for local development. PostgreSQL is recommended for production deployment.

How do I set up the database?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For SQLite: No setup required. The database file (``unilost.db``) will be created automatically.

For PostgreSQL: Set the ``DATABASE_URL`` environment variable. See :doc:`configuration-guide` for details.

Usage Questions
---------------

How do I log in?
~~~~~~~~~~~~~~~~

Use the default accounts:
* **Student Accounts**: ``student1`` ~ ``student10`` / ``1234``
* **Administrator Accounts**: ``admin1`` ~ ``admin10`` / ``admin123``

How do I register a lost item?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Log in with your student account
2. Click "Register Lost Item"
3. Fill in item details
4. Click on the map to set the location
5. Click "Register"

How do I search for items?
~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Browse items on the map
2. Use the category filter to narrow down results
3. Click on item markers to see details
4. Use the item thread to communicate about the item

How do I approve items as an administrator?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Log in with your administrator account
2. View pending items
3. Review item details
4. Set storage location
5. Click "Approve" or "Reject"

Technical Questions
-------------------

What database does UniLost use?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

UniLost supports both:
* **SQLite**: Default for local development
* **PostgreSQL**: Recommended for production

The database is selected automatically based on the ``DATABASE_URL`` environment variable.

How does real-time chat work?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

UniLost uses Socket.IO for real-time communication. Messages are sent via WebSocket connections and stored in the database.

Can I customize the map bounds?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Yes, map bounds are configured in ``unilost.html``. By default, the map is restricted to South Korea. See :doc:`configuration-guide` for details.

How do I change the default port?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Set the ``PORT`` environment variable:

.. code-block:: bash

   export PORT=8080
   node server.js

Deployment Questions
--------------------

Can I deploy UniLost on Render?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Yes, UniLost is designed to work with Render. See :doc:`getting-started` for deployment instructions.

Does Render support SQLite?
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Render's free plan has an ephemeral file system, so SQLite files are lost on restart. For production, use PostgreSQL.

How do I set up PostgreSQL on Render?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Create a PostgreSQL database in Render dashboard
2. Link it to your web service
3. The ``DATABASE_URL`` will be set automatically

Can I use other hosting services?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Yes, UniLost can be deployed on any Node.js hosting service that supports:
* Node.js 18+
* PostgreSQL or SQLite
* WebSocket connections (for Socket.IO)

Security Questions
------------------

How are passwords stored?
~~~~~~~~~~~~~~~~~~~~~~~~~

Passwords are hashed using bcrypt before storage. Plain text passwords are never stored in the database.

Is the session secure?
~~~~~~~~~~~~~~~~~~~~~~

Yes, sessions use:
* HttpOnly cookies (prevents JavaScript access)
* SameSite protection (CSRF protection)
* Secure cookies in production (HTTPS only)

How do I change the session secret?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Set the ``SESSION_SECRET`` environment variable:

.. code-block:: bash

   export SESSION_SECRET="your-random-secret-key"

Troubleshooting Questions
-------------------------

The server won't start. What should I do?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Check if the port is already in use
2. Verify all dependencies are installed (``npm install``)
3. Check for error messages in the console
4. Verify environment variables are set correctly

I can't connect to the database. What's wrong?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Verify ``DATABASE_URL`` is set correctly (for PostgreSQL)
2. Check if the database server is running
3. Verify network connectivity
4. Check database credentials

The map isn't loading. Why?
~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Check your internet connection (map tiles are loaded from OpenStreetMap)
2. Check browser console for JavaScript errors
3. Verify Leaflet.js is loaded correctly

Chat messages aren't working. What's the issue?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Check if Socket.IO server is running
2. Verify WebSocket connections are allowed
3. Check browser console for connection errors
4. Verify CORS is configured correctly

Contributing Questions
----------------------

How can I contribute?
~~~~~~~~~~~~~~~~~~~~~

See :doc:`contribution-guidelines` for detailed information on contributing to UniLost.

Do I need to sign a CLA?
~~~~~~~~~~~~~~~~~~~~~~~~

No, by contributing to UniLost, you agree that your contributions will be licensed under the Apache License 2.0.

License Questions
-----------------

What license does UniLost use?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

UniLost is licensed under the Apache License 2.0. See the LICENSE file for details.

Can I use UniLost in my own project?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Yes, you can use UniLost in your own project as long as you comply with the Apache License 2.0 terms.

Still Have Questions?
---------------------

If you have questions not covered in this FAQ:

1. Check the documentation: :doc:`getting-started`, :doc:`how-to-use`, :doc:`technical-overview`
2. Review existing GitHub issues
3. Create a new GitHub issue with your question
4. Join our Google Groups: `unilost@googlegroups.com <mailto:unilost@googlegroups.com>`_ or visit `https://groups.google.com/g/unilost <https://groups.google.com/g/unilost>`_
5. Join GitHub Discussions: https://github.com/jin040907/UniLost/discussions

