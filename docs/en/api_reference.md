# PrismX API Reference

## Overview

The PrismX API provides endpoints for interacting with the privacy platform, including pattern generation, validation, and management.

## Authentication

All API requests require authentication using a Bearer token:

```http
Authorization: Bearer <your_token>
```

## Base URL

The base URL for all API endpoints is:
```
http://localhost:3000/api/v1
```

## Endpoints

### Patterns

#### Generate Pattern

```http
POST /patterns/generate
```

Generate a new privacy pattern.

**Request Body:**
```json
{
  "type": "string",
  "parameters": {
    "key": "value"
  }
}
```

**Response:**
```json
{
  "id": "string",
  "pattern": "string",
  "type": "string",
  "parameters": {
    "key": "value"
  },
  "metadata": {
    "source": "string",
    "tags": ["string"],
    "usageCount": 0
  }
}
```

#### Get Pattern

```http
GET /patterns/{id}
```

Retrieve a specific pattern by ID.

**Response:**
```json
{
  "id": "string",
  "pattern": "string",
  "type": "string",
  "parameters": {
    "key": "value"
  },
  "metadata": {
    "source": "string",
    "tags": ["string"],
    "usageCount": 0
  }
}
```

#### List Patterns

```http
GET /patterns
```

List all available patterns.

**Query Parameters:**
- `type` (optional): Filter by pattern type
- `tags` (optional): Filter by tags
- `limit` (optional): Maximum number of patterns to return
- `offset` (optional): Number of patterns to skip

**Response:**
```json
{
  "patterns": [
    {
      "id": "string",
      "pattern": "string",
      "type": "string",
      "parameters": {
        "key": "value"
      },
      "metadata": {
        "source": "string",
        "tags": ["string"],
        "usageCount": 0
      }
    }
  ],
  "total": 0,
  "limit": 0,
  "offset": 0
}
```

#### Validate Pattern

```http
POST /patterns/{id}/validate
```

Validate a specific pattern.

**Response:**
```json
{
  "id": "string",
  "isValid": true,
  "effectiveness": 0.95,
  "validationTime": "string"
}
```

#### Update Pattern Metadata

```http
PUT /patterns/{id}/metadata
```

Update metadata for a specific pattern.

**Request Body:**
```json
{
  "source": "string",
  "tags": ["string"]
}
```

**Response:**
```json
{
  "id": "string",
  "metadata": {
    "source": "string",
    "tags": ["string"],
    "usageCount": 0
  }
}
```

### Health Check

```http
GET /health
```

Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "version": "string",
  "timestamp": "string"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": "string",
  "message": "string"
}
```

### 401 Unauthorized

```json
{
  "error": "unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 404 Not Found

```json
{
  "error": "not_found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "internal_server_error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute per IP
- 1000 requests per hour per API key

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1234567890
```

## SDK Examples

### JavaScript/TypeScript

```typescript
import { PrismXClient } from '@prismx/sdk';

const client = new PrismXClient({
  apiKey: 'your_api_key'
});

// Generate pattern
const pattern = await client.generatePattern({
  type: 'encryption',
  parameters: {
    algorithm: 'aes-256-gcm'
  }
});

// Get pattern
const pattern = await client.getPattern('pattern_id');

// List patterns
const patterns = await client.listPatterns({
  type: 'encryption',
  limit: 10
});

// Validate pattern
const validation = await client.validatePattern('pattern_id');

// Update metadata
const updated = await client.updatePatternMetadata('pattern_id', {
  source: 'custom',
  tags: ['encryption', 'secure']
});
```

### Python

```python
from prismx import PrismXClient

client = PrismXClient(api_key='your_api_key')

# Generate pattern
pattern = client.generate_pattern(
    type='encryption',
    parameters={'algorithm': 'aes-256-gcm'}
)

# Get pattern
pattern = client.get_pattern('pattern_id')

# List patterns
patterns = client.list_patterns(
    type='encryption',
    limit=10
)

# Validate pattern
validation = client.validate_pattern('pattern_id')

# Update metadata
updated = client.update_pattern_metadata(
    'pattern_id',
    source='custom',
    tags=['encryption', 'secure']
)
```

## Support

For API support:
- Email: api@prismx.network 