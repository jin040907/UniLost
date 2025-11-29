# Database Setup Guide

This guide explains how to set up and use databases with UniLost. The application supports both SQLite (for local development) and PostgreSQL (for production deployment).

## Overview

UniLost automatically selects the database based on the `DATABASE_URL` environment variable:

- **No `DATABASE_URL` set** → Uses SQLite (`unilost.db`)
- **`DATABASE_URL` set** → Uses PostgreSQL

---

## Option 1: SQLite (Local Development) ⭐ Recommended for Development

SQLite is perfect for local development and testing. It requires no setup and works out of the box.

### Setup Steps

1. **No configuration needed!**
   - Simply run the server: `node server.js`
   - The application will automatically create `unilost.db` if it doesn't exist

2. **Initial Data**
   - Default users are automatically created on first run:
     - **Student Accounts**: `student1` ~ `student10` / `1234`
     - **Administrator Accounts**: `admin1` ~ `admin10` / `admin123`

3. **Database File**
   - Location: `unilost.db` in the project root
   - The file is included in the repository with sample data
   - You can delete it to start fresh (it will be recreated automatically)

### Advantages

- ✅ Zero configuration required
- ✅ Fast and lightweight
- ✅ Perfect for development and testing
- ✅ No external dependencies

### Limitations

- ⚠️ Not suitable for production (single file, no concurrent writes)
- ⚠️ Data may be lost on cloud platforms (Render free plan)

---

## Option 2: PostgreSQL (Production Deployment) ⭐ Recommended for Production

PostgreSQL is recommended for production deployments, especially on cloud platforms like Render.

### Setup Steps

#### Step 1: Create PostgreSQL Database

Choose one of the following free PostgreSQL services:

**Option A: Neon (Recommended)**
1. Go to https://neon.tech
2. Sign up or log in
3. Click "Create a Project"
4. Enter project name and select region
5. Click "Create Project"
6. Copy the connection string from "Connection Details"

**Option B: Supabase**
1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Enter project details and set database password
5. Wait for project creation (1-2 minutes)
6. Go to Settings → Database
7. Copy the connection string (URI format)

#### Step 2: Set Environment Variable

**For Local Development:**
```bash
# macOS/Linux
export DATABASE_URL="postgresql://user:password@host:5432/database"

# Windows (PowerShell)
$env:DATABASE_URL="postgresql://user:password@host:5432/database"

# Windows (CMD)
set DATABASE_URL=postgresql://user:password@host:5432/database
```

**For Render Deployment:**
1. Go to Render Dashboard → Your Web Service
2. Click "Environment" tab
3. Click "Add Environment Variable"
4. Key: `DATABASE_URL`
5. Value: Your PostgreSQL connection string (including password)
6. Click "Save Changes"
7. The service will automatically redeploy

#### Step 3: Verify Setup

Start the server and check the logs:
```bash
node server.js
```

You should see:
```
✅ PostgreSQL connection pool created successfully
✅ PostgreSQL database initialization complete
```

### Connection String Format

**Neon:**
```
postgresql://user:password@host.neon.tech/database?sslmode=require
```

**Supabase:**
```
postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```
or
```
postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Important:** Replace `[PASSWORD]` with your actual database password!

### Advantages

- ✅ Production-ready
- ✅ Supports concurrent connections
- ✅ Data persistence guaranteed
- ✅ Scalable and reliable

### Initial Data

When using PostgreSQL for the first time:
- Tables are automatically created
- Default users are automatically added:
  - **Student Accounts**: `student1` ~ `student10` / `1234`
  - **Administrator Accounts**: `admin1` ~ `admin10` / `admin123`

---

## Database Schema

The application uses the following tables:

### `users`
- `id` (VARCHAR/TEXT) - Primary key, user ID
- `name` (VARCHAR/TEXT) - User display name
- `pw_hash` (VARCHAR/TEXT) - Bcrypt hashed password
- `is_admin` (BOOLEAN/INTEGER) - Admin flag
- `created_at` (TIMESTAMP/TEXT) - Creation timestamp

### `items`
- `id` (SERIAL/INTEGER) - Primary key, auto-increment
- `title` (VARCHAR/TEXT) - Item title
- `description` (TEXT) - Item description
- `category` (VARCHAR/TEXT) - Item category
- `img_data` (TEXT) - Base64 image data
- `lat` (DOUBLE PRECISION/REAL) - Latitude
- `lng` (DOUBLE PRECISION/REAL) - Longitude
- `radius` (DOUBLE PRECISION/REAL) - Search radius
- `status` (VARCHAR/TEXT) - Status: 'pending', 'approved', 'rejected'
- `storage_place` (VARCHAR/TEXT) - Storage location
- `created_by` (VARCHAR/TEXT) - User ID who created the item
- `created_at` (TIMESTAMP/TEXT) - Creation timestamp

### `chat_messages`
- `id` (SERIAL/INTEGER) - Primary key, auto-increment
- `nick` (VARCHAR/TEXT) - User nickname
- `text` (TEXT) - Message text
- `created_at` (TIMESTAMP/TEXT) - Creation timestamp

### `thread_messages`
- `id` (SERIAL/INTEGER) - Primary key, auto-increment
- `item_id` (INTEGER) - Foreign key to items table
- `nick` (VARCHAR/TEXT) - User nickname
- `text` (TEXT) - Message text
- `created_at` (TIMESTAMP/TEXT) - Creation timestamp

---

## Switching Between Databases

### From SQLite to PostgreSQL

1. Set `DATABASE_URL` environment variable
2. Restart the server
3. Tables and default users will be created automatically
4. **Note:** Existing SQLite data will not be migrated automatically

### From PostgreSQL to SQLite

1. Remove or unset `DATABASE_URL` environment variable
2. Restart the server
3. The application will use SQLite (`unilost.db`)
4. **Note:** Existing PostgreSQL data will not be accessible

---

## Troubleshooting

### SQLite Issues

**Error: "SQLite connection failed"**
- Check if `better-sqlite3` is installed: `npm install`
- Check file permissions for `unilost.db`

**Data disappears on Render**
- This is expected on Render free plan (ephemeral file system)
- Switch to PostgreSQL for data persistence

### PostgreSQL Issues

**Error: "connection refused" or "ENOTFOUND"**
- Verify your `DATABASE_URL` is correct
- Check if the database service is running
- Verify network connectivity and firewall settings
- For Supabase: Make sure the project is fully created (wait 5-10 minutes)

**Error: "relation does not exist"**
- Tables should be created automatically on first run
- Check server logs for initialization errors
- Verify database connection is working

**Error: "password authentication failed"**
- Double-check your database password in `DATABASE_URL`
- Make sure special characters in password are URL-encoded

### General Issues

**Database not initializing**
- Check server logs for error messages
- Verify all required packages are installed: `npm install`
- For PostgreSQL: Ensure connection string is correct

---

## Best Practices

1. **Development**: Use SQLite for simplicity
2. **Production**: Always use PostgreSQL
3. **Environment Variables**: Never commit `DATABASE_URL` to Git
4. **Backups**: Regularly backup your production database
5. **Passwords**: Use strong passwords for production databases

## Quick Reference

| Environment | Database | Setup Required |
|------------|----------|----------------|
| Local Development | SQLite | None (automatic) |
| Render (Free Plan) | SQLite | None (but data may be lost) |
| Render (Production) | PostgreSQL | Set `DATABASE_URL` |
| Production | PostgreSQL | Set `DATABASE_URL` |

---

## Need Help?

- Check server logs for detailed error messages
- Verify your `DATABASE_URL` format matches the examples above
- Ensure all required npm packages are installed
- For Render deployment issues, see `docs/DEPLOY.md`

