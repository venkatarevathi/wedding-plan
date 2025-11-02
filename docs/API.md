# Wedding Planner API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "fullname": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "fullname": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

### Contact

#### Submit Contact Form
```http
POST /contact
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "number": "1234567890",
  "subject": "Wedding Inquiry",
  "message": "I would like to know more about your services."
}
```

**Response:**
```json
{
  "message": "Message sent successfully! We will get back to you soon.",
  "id": "contact-id"
}
```

### Bookings

#### Create Wedding Booking
```http
POST /bookings
```

**Request Body:**
```json
{
  "groom": "John Doe",
  "bride": "Jane Smith",
  "email": "john@example.com",
  "phone": "1234567890",
  "date": "2024-06-15",
  "time": "14:00",
  "guests": 150,
  "venue": "garden",
  "package": "premium",
  "services": ["catering", "photography"],
  "paymentMethod": "credit-card"
}
```

**Response:**
```json
{
  "message": "Booking confirmed successfully!",
  "booking": {
    "id": "WED-1234567890-ABC123",
    "groom": "John Doe",
    "bride": "Jane Smith",
    "date": "2024-06-15T00:00:00.000Z",
    "time": "14:00",
    "venue": "garden",
    "package": "premium",
    "services": ["catering", "photography"],
    "status": "confirmed",
    "transactionId": "TXN-XYZ789ABC"
  }
}
```

#### Get User Bookings (Authenticated)
```http
GET /bookings
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "bookings": [
    {
      "bookingId": "WED-1234567890-ABC123",
      "groom": "John Doe",
      "bride": "Jane Smith",
      "date": "2024-06-15T00:00:00.000Z",
      "venue": "garden",
      "package": "premium",
      "status": "confirmed"
    }
  ]
}
```

#### Get Specific Booking
```http
GET /bookings/:id
```

**Response:**
```json
{
  "booking": {
    "bookingId": "WED-1234567890-ABC123",
    "groom": "John Doe",
    "bride": "Jane Smith",
    "date": "2024-06-15T00:00:00.000Z",
    "time": "14:00",
    "guests": 150,
    "venue": "garden",
    "package": "premium",
    "services": ["catering", "photography"],
    "paymentMethod": "credit-card",
    "status": "confirmed",
    "transactionId": "TXN-XYZ789ABC"
  }
}
```

## Error Responses

### Validation Error (400)
```json
{
  "errors": [
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Authentication Error (401)
```json
{
  "error": "Access token required"
}
```

### Not Found Error (404)
```json
{
  "error": "Booking not found"
}
```

### Server Error (500)
```json
{
  "error": "Internal server error"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error
