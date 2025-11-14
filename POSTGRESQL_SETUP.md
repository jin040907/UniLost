# PostgreSQL Configuration Guide

## Setting Up PostgreSQL with Supabase (Recommended)

### 1. Create a Supabase Project
1. Go to https://supabase.com
2. Click "Start your project"
3. Log in with GitHub
4. Click "New Project"
5. Enter project information:
- Name: unilost (any name you want)
- Database Password: Set a strong password (save it!)
- Region: Northeast Asia (Seoul) - Closest to Korea
6. Click "Create new project"

### 2. Get connection information
1. In the project dashboard, click "Settings" → "Database"
2. In the "Connection string" section, select "URI"
3. Copy the connection string:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```
4. Enter `[YOUR-PASSWORD]` Replace with your actual password.

### 3. Add an environment variable to Render
1. Render Dashboard → Your Service → Environment
2. Click "Add Environment Variable"
3. Key: `DATABASE_URL`
4. Value: The connection string copied above (including the password)
5. Click "Save Changes."

### 4. Redeployment
- Render automatically redeploys, or
- Click "Manual Deploy."

## Setting Up PostgreSQL with Neon

### 1. Create a Neon Project
1. Go to https://neon.tech
2. Click "Sign Up"
3. Click "Create a Project"
4. Enter a Project Name
5. Select a Region (your nearest region)
6. Click "Create Project"

### 2. Get Connection Information
1. Check "Connection Details" in the project dashboard.
2. Copy the connection string:
```
postgresql://user:password@host.neon.tech/database?sslmode=require
```

### 3. Add Environment Variables to Render
- Add `DATABASE_URL` using the same method as above.

## Test

After deployment, check the log for the following message:
```
✅ PostgreSQL connection pool creation complete
✅ PostgreSQL database initialization complete
```

## Notes

⚠️ **Security**
- `DATABASE_URL` contains your password, so never commit it to GitHub.
- Manage it only as an environment variable in Render.

⚠️ **Free Plan Limits**
- Supabase: 500MB of storage
- Neon: 3GB of storage
- You'll have plenty!

## Troubleshooting

### When a connection fails
1. Check that the password in the connection string is correct.
2. Check the IP whitelist (for Supabase).
3. Check the SSL settings (`sslmode=require` is usually required).

### When a table is not created
- Check the log for error messages.
- Check database permissions.
