Release Notes
=============

This document provides a history of releases, highlighting new features, improvements, and bug fixes.

Version 1.0.0 (2024-11-17)
---------------------------

Initial Release
~~~~~~~~~~~~~~~

This is the first stable release of UniLost.

New Features
~~~~~~~~~~~~

* **Map-based Item Registration**: Register lost items with precise location coordinates
* **Interactive Map Browsing**: Browse all approved items on an interactive map
* **Real-time Global Chat**: Communicate with all users through a global chat room
* **Item-specific Threads**: Discuss specific items in dedicated threads
* **User Authentication**: Session-based login/logout system
* **Administrator Functions**: Approve/reject items, manage storage locations
* **Database Support**: Support for both SQLite (development) and PostgreSQL (production)
* **Responsive Design**: Mobile and desktop friendly interface
* **Map Bounds Restriction**: Map restricted to South Korea boundaries

Technical Features
~~~~~~~~~~~~~~~~~~

* **RESTful API**: Clean API design with proper HTTP methods and status codes
* **Socket.IO Integration**: Real-time bidirectional communication
* **Database Abstraction**: Unified interface for PostgreSQL and SQLite
* **Session Management**: Secure session handling with HttpOnly cookies
* **Password Security**: bcrypt password hashing
* **Error Handling**: Comprehensive error handling and logging

Database Schema
~~~~~~~~~~~~~~~

* **users**: User accounts with authentication
* **items**: Lost and found items with location data
* **chat_messages**: Global chat messages
* **thread_messages**: Item-specific thread messages

Default Accounts
~~~~~~~~~~~~~~~~

* **Student**: ``student1`` / ``1234``
* **Administrator**: ``admin1`` / ``admin123``

Known Issues
~~~~~~~~~~~~

* None at this time

Future Plans
------------

Potential features for future releases:

* **Email Notifications**: Notify users when items are found
* **Image Upload**: Direct image file upload (currently base64)
* **Advanced Search**: Search by date, category, location radius
* **User Profiles**: User profile pages with edit functionality
* **Item Categories**: Customizable item categories
* **Statistics Dashboard**: Administrator dashboard with statistics
* **Mobile App**: Native mobile applications
* **Multi-language Support**: Support for multiple languages

Contributors
------------

* Sejong University Open Source Software Introduction Project

License
-------

Apache License 2.0

For more information, see the LICENSE file.

