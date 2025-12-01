# Project Structure

This document describes the organization of the UniLost project files.

## Directory Structure

```
.
├── app/                          # Application source code
│   ├── server.js                 # Express server main file
│   ├── db.js                     # PostgreSQL/SQLite database module
│   ├── unilost.html              # Frontend HTML file (main application)
│   └── unilost.db                # SQLite database file (local development)
│
├── scripts/                      # Utility scripts
│   ├── add-dummy-data.js         # Add sample data to database
│   ├── update-user-names.js      # Update user names
│   ├── update-item-locations.js  # Update item locations
│   └── utils/                    # Utility scripts
│       └── check-critical-functions.sh
│
├── docs/                         # Documentation (Sphinx)
│   ├── source/                   # Sphinx source files (.rst)
│   │   ├── index.rst
│   │   ├── about.rst
│   │   ├── getting-started.rst
│   │   ├── api-reference.rst
│   │   └── ...
│   ├── build/                    # Sphinx build output (generated, gitignored)
│   ├── Makefile                  # Sphinx build commands
│   ├── make.bat                  # Sphinx build commands (Windows)
│   └── requirements.txt          # Python dependencies for Sphinx
│
├── guidelines/                   # Project guidelines and documentation
│   ├── APACHE_LICENSE_COMPLIANCE.md
│   ├── CHECKLIST.md
│   ├── COMPATIBILITY.md
│   ├── DATABASE_SETUP.md
│   ├── DEPLOY.md
│   ├── PROJECT_STRUCTURE.md
│   └── UniLost_Deliverable.docx
│
├── website/                      # Jekyll Website (GitHub Pages)
│   ├── _config.yml               # Jekyll configuration
│   ├── Gemfile                   # Ruby dependencies for Jekyll
│   ├── index.md                  # Homepage
│   ├── features.md               # Features page
│   ├── community.md              # Community page
│   ├── contact.md                # Contact page
│   ├── _layouts/                 # Jekyll layouts
│   │   └── default.html
│   ├── _includes/                # Jekyll includes
│   │   ├── header.html
│   │   └── footer.html
│   └── assets/                   # Jekyll assets
│       ├── css/
│       │   └── main.css
│       └── js/
│           └── main.js
│
├── .github/                      # GitHub configuration
│   └── workflows/
│       └── pages.yml             # GitHub Pages deployment
│
├── server.js                     # Entry point (runs app/server.js)
├── package.json                  # Node.js dependencies
├── package-lock.json             # Node.js lock file
├── render.yaml                   # Render deployment configuration
├── LICENSE                       # Apache License 2.0
├── README.md                     # Project documentation
├── CODE_OF_CONDUCT.md            # Code of conduct
├── CONTRIBUTING.md               # Contribution guidelines
├── PRESENTATION_OUTLINE.md       # Presentation guide
├── .gitignore                    # Git ignore rules
│
├── guidelines/                   # Project guidelines and documentation
│   ├── APACHE_LICENSE_COMPLIANCE.md
│   ├── CHECKLIST.md
│   ├── COMPATIBILITY.md
│   ├── DATABASE_SETUP.md
│   ├── DEPLOY.md
│   ├── PROJECT_STRUCTURE.md
│   └── UniLost_Deliverable.docx
│
├── website/                      # Jekyll Website (GitHub Pages)
│   ├── _config.yml               # Jekyll configuration
│   ├── Gemfile                   # Ruby dependencies for Jekyll
│   ├── index.md                  # Homepage
│   ├── features.md               # Features page
│   ├── community.md              # Community page
│   ├── contact.md                # Contact page
│   ├── _layouts/                 # Jekyll layouts
│   ├── _includes/                # Jekyll includes
│   └── assets/                   # CSS and JavaScript assets
```

## File Descriptions

### Application Files (`app/`)

- **`server.js`**: Main Express server file. Handles HTTP requests, API endpoints, and Socket.IO connections.
- **`db.js`**: Database module supporting both PostgreSQL and SQLite. Provides unified interface for database operations.
- **`unilost.html`**: Frontend single-page application with map integration, chat, and item management.
- **`unilost.db`**: SQLite database file for local development (tracked in Git).

### Utility Scripts (`scripts/`)

- **`add-dummy-data.js`**: Adds sample users, items, chat messages, and thread messages to the database.
- **`update-user-names.js`**: Updates user names from Korean to English.
- **`update-item-locations.js`**: Updates item locations to Sejong University campus coordinates.
- **`utils/check-critical-functions.sh`**: Verifies that critical functions exist in `unilost.html`.

### Documentation (`docs/`)

- **`source/`**: Sphinx documentation source files (reStructuredText format).
- **`build/`**: Generated Sphinx documentation (excluded from Git via .gitignore).
- **`Makefile`**: Sphinx build commands (Unix/Linux/macOS).
- **`make.bat`**: Sphinx build commands (Windows).
- **`requirements.txt`**: Python dependencies for building Sphinx documentation.

### Guidelines (`guidelines/`)

- **`PROJECT_STRUCTURE.md`**: This file - describes the project structure.
- **`APACHE_LICENSE_COMPLIANCE.md`**: Apache License 2.0 compliance guidelines.
- **`CHECKLIST.md`**: Pre-deployment checklist.
- **`COMPATIBILITY.md`**: Browser and environment compatibility information.
- **`DATABASE_SETUP.md`**: Database setup and configuration guide.
- **`DEPLOY.md`**: Deployment guide for various platforms.
- **`UniLost_Deliverable.docx`**: Project deliverable document (Word format).

### Jekyll Website (`website/`)

- **`_config.yml`**: Jekyll configuration file.
- **`index.md`**: Homepage with mission statement and project overview.
- **`features.md`**: Features showcase page.
- **`community.md`**: Community page with forums, mailing lists, and communication channels.
- **`contact.md`**: Contact page with links and contact form.
- **`_layouts/`**: Jekyll layout templates.
- **`_includes/`**: Jekyll include files (header, footer).
- **`assets/`**: CSS and JavaScript assets for Jekyll site.

### Configuration Files

- **`package.json`**: Node.js project configuration and dependencies.
- **`render.yaml`**: Render.com deployment configuration.
- **`Gemfile`**: Ruby dependencies for Jekyll.
- **`.github/workflows/pages.yml`**: GitHub Actions workflow for deploying Jekyll site to GitHub Pages.

### Entry Point

- **`server.js`** (root): Entry point that requires and runs `app/server.js`. This allows the application to run from the root directory while keeping source code organized in `app/`.

## Running the Application

### Local Development

```bash
# Install dependencies
npm install

# Start the server
npm start
# or
node server.js
```

The server will start at `http://localhost:3000`.

### Running Scripts

```bash
# Add dummy data
node scripts/add-dummy-data.js

# Update user names
node scripts/update-user-names.js

# Update item locations
node scripts/update-item-locations.js
```

### Building Documentation

```bash
# Build Sphinx documentation
cd docs
make html

# Build Jekyll website
bundle exec jekyll build
bundle exec jekyll serve
```

## Notes

- The `app/` directory contains all application source code.
- The `scripts/` directory contains utility scripts for database management.
- The `docs/` directory contains only Sphinx-related files for documentation.
- The `guidelines/` directory contains project structure and guideline documents.
- The `website/` directory contains Jekyll files for GitHub Pages.
- The root `server.js` is a thin wrapper that runs `app/server.js`.
- Database file (`unilost.db`) is located in `app/` directory.
- Sphinx build output (`docs/build/`) is excluded from Git via `.gitignore`.

