# API Reference

## Overview

The nap-sack API provides endpoints for managing digital products, logging, and sync operations.

## Base URL

```
https://api.nap-sack.local/v1
```

## Authentication

All requests require a valid API key in the `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Digital Products

#### Create Digital Product
```
POST /digital-products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "type": "DigitalProduct",
  "metadata": {
    "version": "1.0.0",
    "category": "category"
  }
}

Response: 201 Created
{
  "id": "dp-123",
  "name": "Product Name",
  "created_at": "2026-05-27T06:09:21Z",
  "status": "active"
}
```

#### Get Digital Product
```
GET /digital-products/{id}

Response: 200 OK
{
  "id": "dp-123",
  "name": "Product Name",
  "description": "Product description",
  "type": "DigitalProduct",
  "status": "active",
  "created_at": "2026-05-27T06:09:21Z",
  "updated_at": "2026-05-27T06:09:21Z"
}
```

#### List Digital Products
```
GET /digital-products?limit=10&offset=0

Response: 200 OK
{
  "items": [...],
  "total": 42,
  "limit": 10,
  "offset": 0
}
```

### Logging

#### Get Entry Point Logs
```
GET /logs/entry-points?startTime=2026-05-27T00:00:00Z&endTime=2026-05-27T23:59:59Z

Response: 200 OK
{
  "logs": [
    {
      "timestamp": "2026-05-27T06:09:21Z",
      "level": "INFO",
      "endpoint": "/api/v1/resource",
      "method": "POST",
      "status": 200,
      "duration_ms": 45
    }
  ],
  "total": 156
}
```

#### Get Error Logs
```
GET /logs/errors?limit=50

Response: 200 OK
{
  "errors": [
    {
      "id": "err-789",
      "timestamp": "2026-05-27T06:09:21Z",
      "level": "ERROR",
      "message": "Error message",
      "stack": "Error stack trace",
      "context": {...}
    }
  ],
  "total": 3
}
```

### Sync

#### Get Sync Status
```
GET /sync/status

Response: 200 OK
{
  "last_sync": "2026-05-27T06:09:21Z",
  "status": "success",
  "duration_ms": 1234,
  "items_synced": 42,
  "next_sync": "2026-05-27T07:09:21Z"
}
```

#### Trigger Manual Sync
```
POST /sync/trigger

Response: 202 Accepted
{
  "sync_id": "sync-456",
  "status": "pending",
  "started_at": "2026-05-27T06:09:21Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "invalid_request",
  "message": "Request validation failed",
  "details": {...}
}
```

### 401 Unauthorized
```json
{
  "error": "unauthorized",
  "message": "Invalid or missing API key"
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
  "error": "internal_error",
  "message": "An unexpected error occurred",
  "error_id": "err-123"
}
```

## Rate Limiting

API endpoints are rate limited:
- **Default**: 1000 requests per hour
- **Premium**: 10000 requests per hour

Rate limit information is included in response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1234567890
```
