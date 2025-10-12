# UniFind

UniFind is an open-source, map-based lost-and-found platform for university campuses.  
It helps students, faculty, and staff register, verify, and locate lost items quickly and transparently.

---

## Objective
A unified web system for managing campus lost-and-found items with:
- Photo and description uploads  
- Precise map-based tagging  
- Real-time chat and admin approval  
- Automatic item classification  

---

## Key Features
- Item registration & auto classification  
- Map tagging with OpenStreetMap  
- Admin approval dashboard  
- Real-time chat (planned)  
- Local storage & JSON backup (planned)

---

## Tech Stack
**Frontend:** HTML5, Tailwind CSS, Leaflet.js  
**Backend:** Node.js (Express.js, Socket.IO)  
**Database:** SQLite (dev) / PostgreSQL (prod)  
**Deployment:** Docker / GitHub Actions  

---

## Quick Start
```bash
git clone https://github.com/unifind/unifind.git
cd unifind
npm install
npm start
