Contribution Guidelines
=======================

Thank you for your interest in contributing to UniLost! This document outlines the process for contributing to the project, including coding standards and submission procedures.

Getting Started
---------------

Before contributing:

1. **Fork the Repository**: Create your own fork of the repository
2. **Clone Your Fork**: Clone your fork to your local machine
3. **Create a Branch**: Create a new branch for your changes
4. **Make Changes**: Implement your changes following the coding standards
5. **Test Your Changes**: Ensure your changes work correctly
6. **Submit a Pull Request**: Create a pull request with a clear description

Code of Conduct
---------------

* Be respectful and inclusive
* Welcome newcomers and help them learn
* Focus on constructive feedback
* Respect different viewpoints and experiences

Coding Standards
----------------

JavaScript Style
~~~~~~~~~~~~~~~~

* **Indentation**: Use 2 spaces (no tabs)
* **Semicolons**: Use semicolons at the end of statements
* **Quotes**: Use single quotes for strings
* **Naming**: 
  * Variables and functions: ``camelCase``
  * Constants: ``UPPER_SNAKE_CASE``
  * Classes: ``PascalCase``

**Example:**

.. code-block:: javascript

   const userName = 'student1';
   const MAX_RETRIES = 3;
   
   function getUserById(id) {
     return userDB.findById(id);
   }

Code Comments
~~~~~~~~~~~~~

* Write clear, concise comments
* Explain "why" not "what"
* Use English for all comments
* Update comments when code changes

**Example:**

.. code-block:: javascript

   // Check if user has admin privileges before allowing item deletion
   if (!req.session.user || !req.session.user.isAdmin) {
     return res.status(403).json({ error: 'Admin privileges required' });
   }

Database Code
~~~~~~~~~~~~~

* Always use parameterized queries to prevent SQL injection
* Handle errors appropriately
* Use transactions for multiple related operations
* Add indexes for frequently queried columns

**Example:**

.. code-block:: javascript

   // ✅ Good: Parameterized query
   await client.query('SELECT * FROM users WHERE id = $1', [userId]);

   // ❌ Bad: String concatenation
   await client.query(`SELECT * FROM users WHERE id = '${userId}'`);

API Design
~~~~~~~~~~

* Follow RESTful conventions
* Use appropriate HTTP status codes
* Return consistent response formats
* Include error messages in error responses

**Example:**

.. code-block:: javascript

   // ✅ Good: Consistent error format
   res.status(400).json({ error: 'ID and password required' });

   // ✅ Good: Consistent success format
   res.json({ ok: true, user: req.session.user });

Commit Messages
---------------

Write clear, descriptive commit messages:

* **Format**: ``<type>: <subject>``
* **Types**: ``feat``, ``fix``, ``docs``, ``style``, ``refactor``, ``test``, ``chore``
* **Subject**: Brief description (50 characters or less)
* **Body**: Detailed explanation (if needed)

**Examples:**

.. code-block:: text

   feat: Add user profile page
   fix: Resolve database connection timeout issue
   docs: Update API reference documentation
   style: Format code with ESLint

Pull Request Process
--------------------

1. **Update Documentation**: Update relevant documentation if needed
2. **Add Tests**: Add tests for new features or bug fixes (if applicable)
3. **Update CHANGELOG**: Add entry to CHANGELOG if applicable
4. **Check Compatibility**: Ensure changes work with both SQLite and PostgreSQL
5. **Test Locally**: Test your changes thoroughly before submitting

Pull Request Template
~~~~~~~~~~~~~~~~~~~~~

When creating a pull request, include:

* **Description**: Clear description of changes
* **Type**: Type of change (feature, bug fix, documentation, etc.)
* **Testing**: How you tested your changes
* **Screenshots**: Screenshots if UI changes are involved
* **Related Issues**: Link to related issues (if any)

**Example:**

.. code-block:: markdown

   ## Description
   Add user profile page with edit functionality.

   ## Type of Change
   - [ ] Bug fix
   - [x] New feature
   - [ ] Documentation update
   - [ ] Code refactoring

   ## Testing
   - Tested user profile display
   - Tested profile edit functionality
   - Tested with both student and admin accounts

   ## Screenshots
   [Add screenshots if applicable]

   ## Related Issues
   Closes #123

Review Process
--------------

* All pull requests require review before merging
* Address review comments promptly
* Be open to feedback and suggestions
* Keep discussions focused and constructive

Development Setup
-----------------

1. **Install Dependencies**: ``npm install``
2. **Set Environment Variables**: Configure ``DATABASE_URL``, ``SESSION_SECRET``, etc.
3. **Run Server**: ``npm start``
4. **Test Changes**: Verify your changes work correctly

Testing
-------

UniLost includes comprehensive unit and integration tests. Before submitting:

**Run the test suite:**
.. code-block:: bash

   # Run all tests
   npm test

   # Run tests in watch mode
   npm run test:watch

   # Run tests with coverage
   npm run test:coverage

   # Run only unit tests
   npm run test:unit

   # Run only integration tests
   npm run test:integration

**Manual Testing Checklist:**

* Test with both SQLite and PostgreSQL
* Test with different user roles (student, admin)
* Test error cases and edge cases
* Test on different browsers (if UI changes)
* Ensure all tests pass before submitting

Areas for Contribution
----------------------

We welcome contributions in the following areas:

* **Bug Fixes**: Fix reported bugs
* **New Features**: Implement new features
* **Documentation**: Improve documentation
* **Code Quality**: Refactor and improve code
* **Testing**: Add tests
* **Performance**: Optimize performance
* **Security**: Improve security
* **UI/UX**: Improve user interface and experience

Reporting Issues
----------------

When reporting issues:

* **Use GitHub Issues**: Create an issue on GitHub
* **Provide Details**: Include steps to reproduce, expected behavior, actual behavior
* **Include Environment**: Node.js version, database type, operating system
* **Include Logs**: Relevant error messages or logs

Issue Template
~~~~~~~~~~~~~~

.. code-block:: markdown

   ## Description
   [Clear description of the issue]

   ## Steps to Reproduce
   1. Step one
   2. Step two
   3. Step three

   ## Expected Behavior
   [What should happen]

   ## Actual Behavior
   [What actually happens]

   ## Environment
   - Node.js version: [version]
   - Database: [SQLite/PostgreSQL]
   - Operating System: [OS]

   ## Logs
   [Relevant error messages or logs]

License
-------

By contributing to UniLost, you agree that your contributions will be licensed under the Apache License 2.0.

Questions?
----------

If you have questions about contributing:

* Check existing documentation
* Review existing issues and pull requests
* Create a new issue with your question
* Join our Google Groups: `unilost@googlegroups.com <mailto:unilost@googlegroups.com>`_ or visit `https://groups.google.com/g/unilost <https://groups.google.com/g/unilost>`_
* Join GitHub Discussions: https://github.com/jin040907/UniLost/discussions

Thank you for contributing to UniLost!

