# Security Policy

## Supported Versions

The following versions of UniLost are currently being supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.9.x   | :white_check_mark: |
| < 0.9   | :x:                |

**Note:** UniLost is currently in pre-release (v0.9.0). Security updates will be provided for the latest version.

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

- **Email**: [unilost2025@gmail.com](mailto:unilost2025@gmail.com)
- **Google Groups**: [unilost@googlegroups.com](mailto:unilost@googlegroups.com)

### What to Include

When reporting a vulnerability, please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: Depends on severity and complexity

### What to Expect

- **Accepted**: We will acknowledge receipt and work on a fix
- **Declined**: We will explain why the issue is not considered a vulnerability
- **Duplicate**: We will inform you if the issue has already been reported

### Security Best Practices

UniLost implements the following security measures:

- **Password Hashing**: bcrypt with salt rounds
- **Session Security**: HttpOnly cookies, SameSite protection
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization and output encoding
- **Environment Variables**: Sensitive data stored in environment variables

For production deployments, ensure:

- Set a strong `SESSION_SECRET` environment variable
- Use HTTPS for all connections
- Keep dependencies up to date
- Use PostgreSQL with secure credentials
- Regularly review and update default passwords

Thank you for helping keep UniLost secure!
