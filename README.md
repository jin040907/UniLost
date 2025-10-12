# UniFind – Campus Lost & Found Platform

**UniFind** is an open-source, map-based platform that helps university students, faculty, and staff easily report, track, and recover lost items.  
It unifies scattered campus systems into one verified and interactive platform for efficient item recovery.

---

## Objective
UniFind provides a **centralized system** for managing campus lost-and-found data.  
Users can **register, verify, and locate** items through:
- Photos and detailed descriptions  
- Interactive **map tagging** using OpenStreetMap  
- **Admin approval** for verified listings  
- **Real-time chat** between users and admins  
- **Automatic classification** based on keywords or image features  

These functions increase transparency, reduce confusion, and speed up the recovery process.

---

## Target Audience
- University students and faculty who frequently lose or find items  
- Campus administrative offices that manage lost-and-found  
- Universities aiming to digitize manual lost-item handling  

UniFind turns passive item posting into active collaboration with location accuracy and chat-based verification.

---

## Features

| Feature | Status | Description |
|----------|---------|-------------|
| Lost Item Registration | Ready | Upload images and descriptions; automatic keyword-based classification. |
| Map-Based Tagging | 🔧 In Progress | Pin items via Leaflet map or search by address (OpenStreetMap API). |
| Admin Approval Dashboard | 🔧 In Progress | Admins can review, approve, or delete submitted reports. |
| Real-Time Chat | 🔜 Planned | WebSocket chat between users and admins for quick coordination. |
| Local Storage + Backup | 🔜 Planned | Store reports locally and export/import JSON backups. |

---

## Tech Stack

| Category | Tools |
|-----------|-------|
| **Languages** | JavaScript (Node.js, ES6), HTML5, CSS3 |
| **Frameworks / Libraries** | Express.js, Socket.IO, Tailwind CSS, Leaflet.js, Multer |
| **Database** | SQLite (dev) / MySQL or PostgreSQL (prod) |
| **Auth & Session** | express-session |
| **Runtime** | Node.js ≥ 18 (recommended v20 LTS), npm ≥ 9 |
| **Deployment** | Docker / Docker Compose |
| **CI/CD** | GitHub Actions |
| **Docs** | README.md, CONTRIBUTING.md, MkDocs |

---

## Quick Start

```bash
# 1. Clone repository
git clone https://github.com/unifind/unifind.git
cd unifind

# 2. Install dependencies
npm install

# 3. Run development server
npm start
