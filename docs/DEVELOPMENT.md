# Development Guide

## Setup

### Prerequisites
- Node.js v16 or higher
- npm or yarn
- Git

### Installation

```bash
npm install
```

## Project Structure

### `/src`
Source code directory containing:
- **core/** - Core business logic
- **handlers/** - Request handlers and entry points
- **logging/** - Centralized logging system
- **utils/** - Utility functions

### `/tests`
Test files organized by component:
- Unit tests
- Integration tests
- End-to-end tests

### `/docs`
Documentation:
- API reference
- Architecture guides
- Troubleshooting

## Entry Points

All entry points are logged and monitored for errors:

```javascript
// Example entry point with logging
import { logger } from './logging/logger';

export async function handleRequest(req, res) {
  logger.info('Request received', { endpoint: req.path, method: req.method });
  
  try {
    // Process request
    const result = await processData(req);
    logger.info('Request successful', { endpoint: req.path });
    res.json(result);
  } catch (error) {
    logger.error('Request failed', { endpoint: req.path, error: error.message });
    res.status(500).json({ error: error.message });
  }
}
```

## Logging Standards

### Log Levels
- **ERROR** - Critical errors requiring attention
- **WARN** - Warnings about potential issues
- **INFO** - General information about application flow
- **DEBUG** - Detailed debugging information

### Log Format
```json
{
  "timestamp": "2026-05-27T06:09:21Z",
  "level": "INFO",
  "message": "Digital product created",
  "context": {
    "productId": "dp-123",
    "userId": "user-456"
  }
}
```

## Digital Product Labels

When creating issues, use:
- `#DigitalProduct` for features
- Add relevant category tags
- Include affected entry points

## Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- tests/handlers.test.js

# Run with coverage
npm test -- --coverage
```

## Sync Process

The sync process runs automatically:
1. Scans for new issues
2. Analyzes logging errors
3. Updates tracking log
4. Reports sync status

Manual sync:
```bash
npm run sync
```

## Troubleshooting

### Logging Issues
If logs aren't appearing:
1. Check `LOG_LEVEL` environment variable
2. Verify logger configuration in `src/logging/config.js`
3. Review `logs/` directory for file-based logs

### Entry Point Errors
For debugging entry point failures:
1. Enable `DEBUG` logging level
2. Check error logs in `logs/errors.log`
3. Review request context in tracking log

## Best Practices

1. **Always log entry points** - Ensures traceability
2. **Use structured logging** - Makes analysis easier
3. **Handle errors gracefully** - Return meaningful error messages
4. **Tag digital products** - Use `#DigitalProduct` label
5. **Update tracking log** - Maintain sync status

## Resources

- [API Reference](./API.md)
- [Tracking Log](../TRACKING_LOG.md)
- [Architecture Guide](./ARCHITECTURE.md)
