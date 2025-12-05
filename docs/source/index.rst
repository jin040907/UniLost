.. UniLost documentation master file

Welcome to UniLost Documentation
=================================

UniLost is an integrated lost and found management system designed specifically for Sejong University. The system provides a comprehensive solution for managing lost and found items on campus using modern web technologies and real-time communication features.

.. toctree::
   :maxdepth: 2
   :caption: Documentation:

   about
   getting-started
   how-to-use
   technical-overview
   api-reference
   configuration-guide
   maintenance-troubleshooting
   contribution-guidelines
   faq
   release-notes

Key Features
------------

* 🗺️ **Map-based Lost and Found Registration/Search**: Location-based lost and found management using Leaflet maps
* 💬 **Real-time Chat**: Socket.IO-based global chat and item-specific threaded chat
* 👤 **User Authentication**: Session-based login/logout system
* 🔐 **Administrator Functions**: Lost and found approval/rejection, storage location management
* 💾 **Permanent Data Storage**: Data preservation via PostgreSQL (production) / SQLite (local development) database
* 📱 **Responsive Design**: Supports both mobile and desktop

Quick Start
-----------

1. Clone the repository: ``git clone https://github.com/jin040907/UniLost.git``
2. Install dependencies: ``npm install``
3. Start the server: ``npm start``
4. Access the application: ``http://localhost:3000``

For detailed installation instructions, see :doc:`getting-started`.

Live Demo
---------

**Deployed Website**: https://unilost.onrender.com

> ⚠️ Render's free plan enters sleep mode after 15 minutes of inactivity. There may be a slight delay when accessing it for the first time.

Contact & Community
-------------------

* **Google Groups**: `unilost@googlegroups.com <mailto:unilost@googlegroups.com>`_ | `Join our mailing list <https://groups.google.com/g/unilost>`_
* **GitHub Discussions**: https://github.com/jin040907/UniLost/discussions
* **GitHub Issues**: https://github.com/jin040907/UniLost/issues
* **Project Website**: https://jin040907.github.io/UniLost/

License
-------

This project is licensed under the Apache License 2.0. See the LICENSE file for details.
