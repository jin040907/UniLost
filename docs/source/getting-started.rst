Getting Started
===============

This guide will help you get UniLost up and running on your local machine.

Prerequisites
-------------

Before you begin, ensure you have the following installed:

**Server Requirements:**

* **Node.js**: Version 18.0.0 or later (Node.js 20 LTS recommended)
* **npm**: Version 9.0.0 or later
* **Database**: 
  * PostgreSQL (for production deployment)
  * SQLite (for local development, included with better-sqlite3)

**Client Requirements:**

* Modern web browsers:
  * Chrome 90+
  * Firefox 88+
  * Safari 14+
  * Edge 90+
* Mobile browsers:
  * iOS Safari 14+
  * Android Chrome 90+

Installation
------------

Step 1: Clone the Repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Clone the repository to your local machine:

.. code-block:: bash

   git clone https://github.com/jin040907/UniLost.git
   cd UniLost

Step 2: Install Dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install all required npm packages:

.. code-block:: bash

   npm install

This will install the following dependencies:

* ``express`` - Web framework
* ``express-session`` - Session management
* ``bcrypt`` - Password hashing
* ``socket.io`` - Real-time communication
* ``pg`` - PostgreSQL client
* ``better-sqlite3`` - SQLite database

Step 3: Database Setup
~~~~~~~~~~~~~~~~~~~~~~

Choose one of the following options:

Option A: SQLite (Local Development)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

SQLite is the default option for local development. No additional setup is required. The database file (``unilost.db``) will be created automatically when you first run the server.

Option B: PostgreSQL (Production)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For production deployment, set the ``DATABASE_URL`` environment variable:

.. code-block:: bash

   export DATABASE_URL="postgresql://user:password@host:5432/database"

For detailed PostgreSQL setup instructions, see :doc:`configuration-guide`.

Step 4: Environment Variables (Optional)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Set optional environment variables:

.. code-block:: bash

   export PORT=3000                    # Server port (default: 3000)
   export SESSION_SECRET="your-secret" # Session secret (required for production)
   export NODE_ENV=production          # Environment mode

Running the Application
-----------------------

Start the server:

.. code-block:: bash

   npm start

Or directly:

.. code-block:: bash

   node server.js

The server will start and display:

.. code-block:: text

   http://localhost:3000

Access the Application
----------------------

Open your web browser and navigate to:

.. code-block:: text

   http://localhost:3000

Default Accounts
----------------

The system comes with default accounts for testing:

* **Student Account**:
  * Username: ``student1``
  * Password: ``1234``

* **Administrator Account**:
  * Username: ``admin1``
  * Password: ``admin123``

Verification
------------

To verify the installation:

1. **Check Server Status**: The server should start without errors
2. **Access Homepage**: Navigate to ``http://localhost:3000``
3. **Test Login**: Log in with one of the default accounts
4. **Check Database**: Verify that the database tables are created

Troubleshooting
---------------

Common Issues:

* **Port Already in Use**: Change the ``PORT`` environment variable or stop the process using port 3000
* **Database Connection Error**: Verify ``DATABASE_URL`` format for PostgreSQL or check SQLite file permissions
* **Module Not Found**: Run ``npm install`` again to ensure all dependencies are installed

For more troubleshooting help, see :doc:`maintenance-troubleshooting`.

Next Steps
----------

* Read :doc:`how-to-use` to learn how to use the application
* Check :doc:`technical-overview` to understand the architecture
* Review :doc:`api-reference` for API documentation

