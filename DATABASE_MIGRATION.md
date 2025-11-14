# Database Migration Guide

## SQLite → PostgreSQL migraion

SQLite is not suitable for the Render Free Plan. We recommend migrating to PostgreSQL.

## Free PostgreSQL options

### 1. Supabase (Recommended ⭐)
- **Free plan**: 500MB of storage, unlimited API requests
- **URL**: https://supabase.com
- **Setting**: Very simple, automatic backup

### 2. Neon
- **Free Plan**: 3GB of storage
- **URL**: https://neon.tech
- **Settings**: Simple

### 3. Railway
- **Free Plan**: $5 credit/month
- **URL**: https://railway.app
- **Setup**: Easy
- 
## Migrate to Supabase

### 1. Create a Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Enter a project name
4. Set a database password
5. Select a region (your nearest region)

### 2. Verify the connection information
In the Supabase dashboard → Settings → Database:
- Copy the connection string (URI)
- Example: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

### 3. Set the environment variable
In the Render dashboard → Environment, add:
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

### 4. Code Modification
Modify `db.js` to use PostgreSQL (see below)

## PostgreSQL Migration Code

Migrate to PostgreSQL using the `pg` package:

```bash
npm install pg
```

You just need to change `db.js` to use PostgreSQL.

## Using Render Disk (Paid Plan)

If you're on a paid plan, you can use Render Disk:
1. Render Dashboard → Disk tab
2. Create a new disk
3. Save the database file to the disk path

However, using PostgreSQL is strongly recommended for the free plan.

