About the Project
=================

Overview
--------

UniLost is an integrated lost and found management system designed specifically for Sejong University. The system provides a comprehensive solution for managing lost and found items on campus using modern web technologies and real-time communication features.

Purpose
-------

The primary purpose of UniLost is to:

* **Streamline Lost and Found Operations**: Provide a centralized platform for reporting and managing lost items on campus
* **Improve Item Recovery Rates**: Enable quick and efficient matching of lost items with their owners through map-based search
* **Enhance Communication**: Facilitate real-time communication between users and administrators through integrated chat features
* **Support Administrative Workflow**: Provide administrators with tools to approve, manage, and track lost and found items

Objectives
----------

The project aims to achieve the following objectives:

1. **User-Friendly Interface**
   * Intuitive map-based interface for item registration and search
   * Responsive design supporting both desktop and mobile devices
   * Real-time updates and notifications

2. **Efficient Item Management**
   * Location-based item registration with precise coordinates
   * Category-based organization of items
   * Status tracking (pending, approved, rejected)

3. **Secure Authentication**
   * Session-based user authentication
   * Role-based access control (students and administrators)
   * Secure password hashing using bcrypt

4. **Real-Time Communication**
   * Global chat for general discussions
   * Item-specific threaded discussions
   * Socket.IO-based real-time messaging

5. **Scalable Architecture**
   * Support for both SQLite (development) and PostgreSQL (production)
   * RESTful API design
   * Modular code structure

Key Features
------------

* 🗺️ **Map-based Lost and Found Registration/Search**: Location-based lost and found management using Leaflet maps
* 💬 **Real-time Chat**: Socket.IO-based global chat and item-specific threaded chat
* 👤 **User Authentication**: Session-based login/logout system
* 🔐 **Administrator Functions**: Lost and found approval/rejection, storage location management
* 💾 **Permanent Data Storage**: Data preservation via PostgreSQL (distributed) / SQLite (local development) database
* 📱 **Responsive Design**: Supports both mobile and desktop

Target Users
------------

* **Students**: Can register lost items, search for found items, and communicate with other users
* **Administrators**: Can approve/reject item registrations, manage storage locations, and oversee the system

Technology Stack
----------------

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL (production) / SQLite (development)
* **Real-time**: Socket.IO
* **Frontend**: HTML, JavaScript, Tailwind CSS
* **Maps**: Leaflet.js, OpenStreetMap

License
-------

This project is licensed under the Apache License 2.0. See the LICENSE file for details.

