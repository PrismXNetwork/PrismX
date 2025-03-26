# PrismX Backend

The backend service for PrismX, a decentralized privacy platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MONGODB_URI=mongodb://localhost:27017/prismx
REDIS_URL=redis://localhost:6379
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /health`
  - Returns the health status of the server
  - Response: `{ status: 'healthy' }`

### Privacy Patterns

#### Generate Pattern
- `POST /patterns/generate`
  - Generates a new privacy pattern
  - Response:
    ```json
    {
      "success": true,
      "pattern": {
        "id": "string",
        "effectiveness": number,
        "resourceUsage": number,
        "timestamp": number
      }
    }
    ```

#### Get Pattern by ID
- `GET /patterns/:id`
  - Retrieves a specific pattern by ID
  - Response:
    ```json
    {
      "success": true,
      "pattern": {
        "id": "string",
        "effectiveness": number,
        "resourceUsage": number,
        "timestamp": number
      }
    }
    ```

#### List Patterns
- `GET /patterns?count=10`
  - Lists multiple patterns
  - Query Parameters:
    - `count`: Number of patterns to return (default: 10)
  - Response:
    ```json
    {
      "success": true,
      "patterns": [
        {
          "id": "string",
          "effectiveness": number,
          "resourceUsage": number,
          "timestamp": number
        }
      ]
    }
    ```

#### Validate Pattern
- `POST /patterns/:id/validate`
  - Validates a specific pattern
  - Response:
    ```json
    {
      "success": true,
      "isValid": boolean
    }
    ```

## Error Handling

All endpoints return errors in the following format:
```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Development

### Scripts
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the project
- `npm start`: Start production server
- `npm test`: Run tests
- `npm run lint`: Run linter

### Project Structure
```
backend/
├── src/
│   ├── core/           # Core business logic
│   ├── api/            # API routes and controllers
│   ├── data/           # Data models and database
│   ├── security/       # Security utilities
│   └── index.ts        # Entry point
├── tests/              # Test files
├── .env               # Environment variables
└── package.json       # Dependencies and scripts
``` 