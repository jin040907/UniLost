/*
 * Copyright 2025 UniLost Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Error handling utility module

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Custom error classes for better error handling
 */
class DatabaseError extends Error {
  constructor(message, originalError = null) {
    super(message);
    this.name = 'DatabaseError';
    this.originalError = originalError;
    this.statusCode = 500;
  }
}

class ValidationError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.statusCode = 400;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(resource = 'Resource') {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

/**
 * Logs error with appropriate detail level based on environment
 * @param {Error} error - The error object
 * @param {string} context - Context where error occurred (e.g., 'Login', 'Item Creation')
 * @param {Object} metadata - Additional metadata to log
 */
function logError(error, context = 'Unknown', metadata = {}) {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    error: {
      name: error.name || 'Error',
      message: error.message,
      ...(isDev && { stack: error.stack }),
      ...(error.originalError && isDev && { 
        originalError: {
          name: error.originalError.name,
          message: error.originalError.message,
          stack: error.originalError.stack
        }
      })
    },
    ...(Object.keys(metadata).length > 0 && { metadata })
  };

  // In production, use structured logging (could be extended to use a logging service)
  // In development, use console.error with full details
  if (isDev) {
    console.error(`[${timestamp}] ❌ Error in ${context}:`, errorInfo);
  } else {
    // Production: Log only essential information
    console.error(JSON.stringify({
      timestamp,
      context,
      error: error.name,
      message: error.message,
      ...metadata
    }));
  }
}

/**
 * Handles errors and sends appropriate HTTP response
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 * @param {string} context - Context where error occurred
 * @param {Object} metadata - Additional metadata
 */
function handleError(error, res, context = 'Request', metadata = {}) {
  // Log the error
  logError(error, context, metadata);

  // Determine status code
  const statusCode = error.statusCode || 500;

  // Prepare error response
  const errorResponse = {
    error: error.message || 'An error occurred',
    ...(isDev && {
      details: {
        name: error.name,
        ...(error.stack && { stack: error.stack }),
        ...(error.field && { field: error.field }),
        ...(error.originalError && {
          originalError: {
            name: error.originalError.name,
            message: error.originalError.message
          }
        })
      }
    })
  };

  // Send response
  if (!res.headersSent) {
    res.status(statusCode).json(errorResponse);
  }
}

/**
 * Wraps async route handlers to automatically catch errors
 * @param {Function} fn - Async route handler function
 * @returns {Function} - Wrapped function with error handling
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      handleError(error, res, `${req.method} ${req.path}`);
    });
  };
}

/**
 * Checks if error is a database-related error
 * @param {Error} error - The error object
 * @returns {boolean} - True if database error
 */
function isDatabaseError(error) {
  return error.code === 'ECONNREFUSED' ||
         error.code === 'ENOTFOUND' ||
         error.code === 'ETIMEDOUT' ||
         error.code === '23505' || // PostgreSQL unique violation
         error.code === '23503' || // PostgreSQL foreign key violation
         error.code === '23502' || // PostgreSQL not null violation
         error.message?.includes('database') ||
         error.message?.includes('SQL') ||
         error.message?.includes('connection');
}

/**
 * Converts unknown errors to appropriate error types
 * @param {Error} error - The error object
 * @param {string} context - Context where error occurred
 * @returns {Error} - Typed error object
 */
function normalizeError(error, context = 'Operation') {
  // If already a custom error, return as is
  if (error instanceof DatabaseError ||
      error instanceof ValidationError ||
      error instanceof AuthenticationError ||
      error instanceof AuthorizationError ||
      error instanceof NotFoundError) {
    return error;
  }

  // Check for database errors
  if (isDatabaseError(error)) {
    return new DatabaseError(
      `Database operation failed: ${context}`,
      error
    );
  }

  // Check for validation errors (common patterns)
  if (error.message?.includes('required') ||
      error.message?.includes('invalid') ||
      error.message?.includes('missing')) {
    return new ValidationError(error.message, error.field);
  }

  // Default to generic error
  return new DatabaseError(
    `An unexpected error occurred: ${context}`,
    error
  );
}

module.exports = {
  DatabaseError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  logError,
  handleError,
  asyncHandler,
  isDatabaseError,
  normalizeError
};
