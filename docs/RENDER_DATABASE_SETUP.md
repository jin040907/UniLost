# Render Database Setup Guide

This guide explains how to troubleshoot database issues in Render.

## Cause of the issue

With Render's free plan, the file system isn't persistent, so SQLite files may disappear. Therefore, you must use a PostgreSQL database.

## Solution 1: Creating a PostgreSQL Database in Render (Recommended)

### Step 1: Creating a PostgreSQL Database
1. Access the Render Dashboard (https://dashboard.render.com)
2. Click the "New +" button
3. Select "PostgreSQL"
4. Enter the following settings:
- **Name**: `unilost-db` (any name you want)
- **Database**: `unilost` (automatically generated)
- **User**: `unilost_user` (automatically generated)
- **Region**: `Singapore` (near Korea)
- **PostgreSQL Version**: `16` (latest version)
- **Plan**: `Free` (free plan)
5. Click "Create Database."
  
### Step 2: Connecting a Database to the Web Service
1. Go to the web service (`unilost`) page.
2. Click the "Environment" tab.
3. Click the "Link Resource" button.
4. Select the PostgreSQL database (`unilost-db`) you created above.
5. Click "Link."

**Done!** The `DATABASE_URL` environment variable will be automatically set.

### Step 3: Redeploy
- Render can automatically redeploy, or
- Click "Manual Deploy" → "Deploy latest commit"

## Solution 2: Using External PostgreSQL (Supabase/Neon)

### Using Supabase (Recommended)
1. Access https://supabase.com and create a project.
2. "Settings" → "Database" → Copy the "Connection string" (URI).
3. Render Web Service → "Environment" → "Add Environment Variable."
4. Key: `DATABASE_URL`, Value: Enter the copied connection string.
5. Redeploy.

For more information, see the `POSTGRESQL_SETUP.md` file.

## How to Verify

After deployment, check the log for the following messages:
```
✅ PostgreSQL connection pool creation completed
✅ PostgreSQL database initialization completed
```

Or, check if the API call is successful in the browser console.

## Troubleshooting

### If the database still fails to connect
1. Check the render log: Web Service → "Logs" tab
2. Check the `DATABASE_URL` environment variable: "Environment" tab
3. Check the database service status: Ensure the PostgreSQL service is in the "Available" state.

### If a connection error occurs
- Verify that the password in the connection string is correct
- Verify the SSL settings (most require `?sslmode=require`)
- Verify that the database service is running
  
