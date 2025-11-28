# UniLost - Integrated Lost and Found Management System

This is a web application for integrated lost and found management at Sejong University. It provides map-based lost item registration/search, real-time chat, and an administrator approval system.

## 🌐 Live Demo

**Deployed Website**: https://unilost.onrender.com

> ⚠️ Render's free plan enters sleep mode after 15 minutes of inactivity. There may be a slight delay when accessing it for the first time.

## 📚 Documentation

**Full Documentation**: https://unilost.readthedocs.io/

Comprehensive documentation including installation guides, API reference, configuration options, and more is available on Read the Docs.

## Key Features

- 🗺️ **Map-based Lost and Found Registration/Search**: Location-based lost and found management using Leaflet maps
- 💬 **Real-time Chat**: Socket.IO-based global chat and item-specific threaded chat
- 👤 **User Authentication**: Session-based login/logout system
- 🔐 **Administrator Functions**: Lost and found approval/rejection, storage location management
- 💾 **Permanent Data Storage**: Data preservation via PostgreSQL (distributed) / SQLite (local development) database
- 📱 **Responsive Design**: Supports both mobile and desktop

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (distributed) / SQLite (local development)
- **Real-time**: Socket.IO
- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Maps**: Leaflet.js, OpenStreetMap

## Installation and Running

### Requirements

**Server:**
- Node.js 18.0.0 or later (recommended: Node.js 20 LTS)
- npm 9.0.0 or later
- PostgreSQL (for deployment) or SQLite (for local development)

**Client:**
- Modern web browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Mobile: iOS Safari 14+, Android Chrome 90+

For detailed compatibility information, see [COMPATIBILITY.md](./docs/COMPATIBILITY.md).

### Installation

```bash
# Clone the repository
git clone https://github.com/jin040907/UniLost.git
cd UniLost

# Install dependencies
npm install
```

### Local Execution

```bash
# Start the server
npm start
# or
node server.js
```

Once the server is running, you can access it at `http://localhost:3000`.

### Default Accounts

- **Student Account**: `student1` / `1234`
- **Administrator Account**: `admin1` / `admin123`

## Project Structure

```
. ├── server.js # Express server main file
├── db.js # PostgreSQL/SQLite database module
├── unilost.html # Frontend HTML file
├── package.json # Project dependencies
├── render.yaml # Render deployment configuration
└── DEPLOY.md # Deployment guide
```

## API Endpoints

### Authentication
- `GET /api/me` - Currently logged in user information
- `POST /api/login` - Login
- `POST /api/logout` - Logout

### Lost and Found Items
- `GET /api/items` - Retrieve all items (query: `?status=pending|approved`)
- `GET /api/items/:id` - Retrieve a specific item
- `POST /api/items` - Register an item (login required)
- `PATCH /api/items/:id` - Edit an item (admin only)
- `DELETE /api/items/:id` - Delete an item (admin only)

### Socket.IO Events
- `chat:join` - Join a global chat
- `chat:send` - Send a global chat message
- `thread:join` - Join a thread for each item
- `thread:send` - Send a thread message

## Database Schema

- **users**: User information
- **items**: Lost and Found items
- **chat_messages**: Global chat messages
- **thread_messages**: Threaded messages for each item

## Deployment

**Current Deployment Status**: ✅ [https://unilost.onrender.com](https://unilost.onrender.com)

For instructions on deploying as a web service, refer to [DEPLOY.md](./docs/DEPLOY.md).

### Quick Deployment (Render)

1. Upload your code to GitHub
2. Select "New Web Service" in [Render](https://render.com)
3. Connect your GitHub repository
4. Automatic deployment complete!

### Deployed Service Information

- **URL**: https://unilost.onrender.com
- **Hosting**: Render (Free Plan)
- **Database**: PostgreSQL (if DATABASE_URL is set) or SQLite (default)

## Environment Variables

- `PORT`: Server port (default: 3000)
- `SESSION_SECRET`: Session secret key (required for production environments)
- `DATABASE_URL`: PostgreSQL connection string (required for deployment)
- Example: `postgresql://user:password@host:5432/database`
- If not available, use SQLite for local development.

## License

Apache License 2.0

For details, refer to the [LICENSE](./LICENSE) file.

## Developer

Sejong University Open Source Software Introduction Project
