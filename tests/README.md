# UniLost Test Suite

This directory contains the test suite for the UniLost project.

## Test Structure

```
tests/
├── unit/           # Unit tests for individual modules
│   └── db.test.js  # Database module tests
└── integration/    # Integration tests for API endpoints
    └── api.test.js # API endpoint tests
```

## Running Tests

### Prerequisites

Make sure you have installed all dependencies:

```bash
npm install
```

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

Automatically re-run tests when files change:

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

Coverage reports will be generated in the `coverage/` directory.

### Run Specific Test Suites

**Unit tests only:**
```bash
npm run test:unit
```

**Integration tests only:**
```bash
npm run test:integration
```

## Test Environment

Tests run in a test environment that:
- Uses SQLite database (no PostgreSQL required for testing)
- Sets `NODE_ENV=test`
- Uses a test session secret
- Automatically cleans up test data

## Writing Tests

### Unit Tests

Unit tests should be placed in `tests/unit/` and test individual functions or modules in isolation.

Example:
```javascript
describe('Module Name', () => {
  test('should do something', () => {
    // Test implementation
  });
});
```

### Integration Tests

Integration tests should be placed in `tests/integration/` and test API endpoints and full request/response cycles.

Example:
```javascript
describe('API Endpoint', () => {
  test('should return expected response', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .expect(200);
    
    expect(response.body).toBeDefined();
  });
});
```

## Test Coverage Goals

- **Unit Tests**: Aim for >80% coverage of core modules (db.js, server.js)
- **Integration Tests**: Cover all API endpoints and authentication flows
- **Edge Cases**: Test error handling and boundary conditions

## CI/CD Integration

Tests are automatically run on:
- Every push to `main` or `develop` branches
- Every pull request
- Manual workflow dispatch

See `.github/workflows/test.yml` for the CI/CD configuration.

## Troubleshooting

### Tests fail with database errors

Make sure you're running tests in the test environment. The test suite automatically uses SQLite and doesn't require a PostgreSQL connection.

### Tests timeout

If tests are timing out, check:
1. Database initialization is complete
2. No hanging connections or processes
3. Test data cleanup is working correctly

### Coverage report not generating

Make sure you're running `npm run test:coverage` and that the `coverage/` directory is not in `.gitignore` (it should be ignored, but the directory should be created locally).
