# Lekka Backend API Requirements

This document outlines all API endpoints required by the Lekka frontend application.

## Base URL
```
http://localhost:8080/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 1. Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "+91 98765 43210",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "+91 98765 43210",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "rahul@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "+91 98765 43210",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get Current User
**GET** `/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "id": 1,
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "+91 98765 43210",
  "totalLekkas": 15,
  "totalFriends": 8,
  "settledLekkas": 10,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## 2. Lekka Endpoints

### Create Lekka
**POST** `/lekkas`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "friendId": 5,
  "friendName": "Priya Kumar",
  "friendPhone": "+91 99887 76655",
  "amount": 2000,
  "type": "lent",
  "description": "Dinner at Cafe",
  "dueDate": "2024-02-20T00:00:00Z"
}
```

**Notes:**
- `type` can be: "lent" (you gave money) or "borrowed" (you took money)
- `friendId` is optional for new friends
- `dueDate` is optional

**Response (201):**
```json
{
  "id": 123,
  "userId": 1,
  "friendId": 5,
  "friendName": "Priya Kumar",
  "friendPhone": "+91 99887 76655",
  "amount": 2000,
  "type": "lent",
  "description": "Dinner at Cafe",
  "status": "pending",
  "confirmationLink": "abc123xyz",
  "dueDate": "2024-02-20T00:00:00Z",
  "createdAt": "2024-01-20T15:30:00Z",
  "updatedAt": "2024-01-20T15:30:00Z"
}
```

### Get All Lekkas
**GET** `/lekkas`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): "pending", "confirmed", "settled"
- `friendId` (optional): Filter by specific friend

**Response (200):**
```json
[
  {
    "id": 123,
    "friendId": 5,
    "friendName": "Priya Kumar",
    "amount": 2000,
    "type": "lent",
    "description": "Dinner at Cafe",
    "status": "pending",
    "dueDate": "2024-02-20T00:00:00Z",
    "createdAt": "2024-01-20T15:30:00Z"
  },
  {
    "id": 124,
    "friendId": 7,
    "friendName": "Arjun Patel",
    "amount": 500,
    "type": "borrowed",
    "description": "Movie tickets",
    "status": "confirmed",
    "createdAt": "2024-01-18T12:00:00Z"
  }
]
```

### Get Lekka by ID
**GET** `/lekkas/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "id": 123,
  "userId": 1,
  "friendId": 5,
  "friendName": "Priya Kumar",
  "friendPhone": "+91 99887 76655",
  "amount": 2000,
  "type": "lent",
  "description": "Dinner at Cafe",
  "status": "confirmed",
  "confirmationLink": "abc123xyz",
  "dueDate": "2024-02-20T00:00:00Z",
  "createdAt": "2024-01-20T15:30:00Z",
  "updatedAt": "2024-01-20T16:00:00Z",
  "timeline": [
    {
      "icon": "⚡",
      "action": "Lekka Created",
      "description": "You created this Lekka",
      "timestamp": "2024-01-20T15:30:00Z"
    },
    {
      "icon": "✅",
      "action": "Confirmed",
      "description": "Priya confirmed this Lekka",
      "timestamp": "2024-01-20T16:00:00Z"
    }
  ]
}
```

### Confirm Lekka (Public - No Auth Required)
**POST** `/lekkas/confirm/:linkId`

**Request Body:**
```json
{
  "action": "confirm",
  "name": "Priya Kumar"
}
```

**Notes:**
- `action` can be "view" or "confirm"
- Use "view" to get lekka details, "confirm" to actually confirm

**Response (200) for "view":**
```json
{
  "id": 123,
  "creatorName": "Rahul Sharma",
  "amount": 2000,
  "type": "lent",
  "description": "Dinner at Cafe",
  "friendName": "Priya Kumar",
  "dueDate": "2024-02-20T00:00:00Z"
}
```

**Response (200) for "confirm":**
```json
{
  "message": "Lekka confirmed successfully",
  "lekka": {
    "id": 123,
    "status": "confirmed",
    "confirmedAt": "2024-01-20T16:00:00Z"
  }
}
```

### Settle Lekka
**POST** `/lekkas/:id/settle`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Lekka marked as settled",
  "lekka": {
    "id": 123,
    "status": "settled",
    "settledAt": "2024-01-25T10:00:00Z"
  }
}
```

### Send Reminder
**POST** `/lekkas/:id/remind`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Reminder sent successfully",
  "reminderSentAt": "2024-01-22T14:30:00Z"
}
```

### Upload Proof
**POST** `/lekkas/:id/proof`

**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body (FormData):**
```
proof: <image file>
```

**Response (200):**
```json
{
  "message": "Proof uploaded successfully",
  "proofUrl": "/uploads/proofs/abc123.jpg"
}
```

### Update Lekka
**PUT** `/lekkas/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amount": 2500,
  "description": "Updated: Dinner at Cafe + Drinks",
  "dueDate": "2024-02-25T00:00:00Z"
}
```

**Response (200):**
```json
{
  "id": 123,
  "amount": 2500,
  "description": "Updated: Dinner at Cafe + Drinks",
  "dueDate": "2024-02-25T00:00:00Z",
  "updatedAt": "2024-01-21T10:00:00Z"
}
```

### Delete Lekka
**DELETE** `/lekkas/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Lekka deleted successfully"
}
```

---

## 3. Friends Endpoints

### Get All Friends
**GET** `/friends`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
[
  {
    "id": 5,
    "name": "Priya Kumar",
    "phone": "+91 99887 76655",
    "netBalance": 1500,
    "totalLekkas": 5,
    "pendingLekkas": 2,
    "createdAt": "2024-01-10T08:00:00Z"
  },
  {
    "id": 7,
    "name": "Arjun Patel",
    "phone": "+91 88776 65544",
    "netBalance": -500,
    "totalLekkas": 3,
    "pendingLekkas": 1,
    "createdAt": "2024-01-12T09:00:00Z"
  }
]
```

**Notes:**
- `netBalance` > 0 means they owe you
- `netBalance` < 0 means you owe them

### Add Friend
**POST** `/friends`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Sanjay Singh",
  "phone": "+91 77665 54433",
  "email": "sanjay@example.com"
}
```

**Response (201):**
```json
{
  "id": 10,
  "name": "Sanjay Singh",
  "phone": "+91 77665 54433",
  "email": "sanjay@example.com",
  "netBalance": 0,
  "totalLekkas": 0,
  "pendingLekkas": 0,
  "createdAt": "2024-01-25T11:00:00Z"
}
```

### Get Friend Details
**GET** `/friends/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "id": 5,
  "name": "Priya Kumar",
  "phone": "+91 99887 76655",
  "email": "priya@example.com",
  "netBalance": 1500,
  "totalLekkas": 5,
  "pendingLekkas": 2,
  "settledLekkas": 3,
  "recentLekkas": [
    {
      "id": 123,
      "amount": 2000,
      "type": "lent",
      "status": "confirmed",
      "createdAt": "2024-01-20T15:30:00Z"
    }
  ],
  "createdAt": "2024-01-10T08:00:00Z"
}
```

### Get Net Balance with Friend
**GET** `/friends/:id/balance`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "friendId": 5,
  "friendName": "Priya Kumar",
  "netBalance": 1500,
  "breakdown": {
    "youLent": 3500,
    "youBorrowed": 2000,
    "net": 1500
  }
}
```

---

## 4. Group Pool Endpoints

### Create Group
**POST** `/groups`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Priya's Birthday Gift",
  "description": "Gift for Priya's 25th birthday",
  "targetAmount": 5000
}
```

**Response (201):**
```json
{
  "id": 50,
  "name": "Priya's Birthday Gift",
  "description": "Gift for Priya's 25th birthday",
  "targetAmount": 5000,
  "collected": 0,
  "status": "active",
  "contributors": 0,
  "createdBy": 1,
  "createdAt": "2024-01-25T12:00:00Z"
}
```

### Get All Groups
**GET** `/groups`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
[
  {
    "id": 50,
    "name": "Priya's Birthday Gift",
    "description": "Gift for Priya's 25th birthday",
    "targetAmount": 5000,
    "collected": 3000,
    "status": "active",
    "contributors": 6,
    "createdAt": "2024-01-25T12:00:00Z"
  }
]
```

### Get Group Details
**GET** `/groups/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "id": 50,
  "name": "Priya's Birthday Gift",
  "description": "Gift for Priya's 25th birthday",
  "targetAmount": 5000,
  "collected": 3000,
  "status": "active",
  "contributors": 6,
  "contributions": [
    {
      "id": 1,
      "userId": 1,
      "userName": "Rahul Sharma",
      "amount": 500,
      "createdAt": "2024-01-25T13:00:00Z"
    },
    {
      "id": 2,
      "userId": 5,
      "userName": "Priya Kumar",
      "amount": 1000,
      "createdAt": "2024-01-25T14:00:00Z"
    }
  ],
  "createdBy": 1,
  "createdAt": "2024-01-25T12:00:00Z"
}
```

### Add Contribution
**POST** `/groups/:id/contribute`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amount": 500
}
```

**Response (200):**
```json
{
  "message": "Contribution added successfully",
  "contribution": {
    "id": 3,
    "groupId": 50,
    "userId": 1,
    "amount": 500,
    "createdAt": "2024-01-26T10:00:00Z"
  },
  "group": {
    "collected": 3500,
    "contributors": 7
  }
}
```

### Close Group
**POST** `/groups/:id/close`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Group closed successfully",
  "group": {
    "id": 50,
    "status": "closed",
    "closedAt": "2024-02-01T12:00:00Z"
  }
}
```

---

## 5. Statistics Endpoints

### Dashboard Statistics
**GET** `/stats/dashboard`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "totalLekkas": 15,
  "netBalance": 2500,
  "pendingLekkas": 5,
  "totalTracked": 50000
}
```

### Monthly Statistics
**GET** `/stats/monthly`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `year` (optional): default current year
- `month` (optional): default current month

**Response (200):**
```json
{
  "month": "January",
  "year": 2024,
  "totalLekkas": 8,
  "totalAmount": 15000,
  "lent": 10000,
  "borrowed": 5000,
  "settled": 3
}
```

---

## Error Responses

All endpoints should return appropriate HTTP status codes and error messages:

**400 Bad Request:**
```json
{
  "error": "Validation failed",
  "message": "Amount must be greater than 0",
  "details": {
    "field": "amount",
    "value": 0
  }
}
```

**401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**404 Not Found:**
```json
{
  "error": "Not found",
  "message": "Lekka with id 123 not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

---

## Database Schema Recommendations

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Lekkas Table
```sql
CREATE TABLE lekkas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    friend_id BIGINT,
    friend_name VARCHAR(255) NOT NULL,
    friend_phone VARCHAR(20) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type ENUM('lent', 'borrowed') NOT NULL,
    description TEXT,
    status ENUM('pending', 'confirmed', 'settled') DEFAULT 'pending',
    confirmation_link VARCHAR(255) UNIQUE,
    due_date TIMESTAMP,
    confirmed_at TIMESTAMP,
    settled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Friends Table
```sql
CREATE TABLE friends (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY (user_id, phone)
);
```

### Groups Table
```sql
CREATE TABLE groups (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    target_amount DECIMAL(10, 2) NOT NULL,
    collected DECIMAL(10, 2) DEFAULT 0,
    status ENUM('active', 'closed') DEFAULT 'active',
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

### Contributions Table
```sql
CREATE TABLE contributions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    group_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## Notes for Backend Developers

1. **JWT Authentication**: Use a secure JWT implementation with at least 256-bit key
2. **Confirmation Links**: Generate unique, secure, time-limited confirmation links
3. **SMS Integration**: Integrate with SMS service (Twilio, MSG91, etc.) for sending confirmation links
4. **File Upload**: Implement secure file upload for payment proofs (limit size, validate file types)
5. **CORS**: Enable CORS for `http://localhost:3000` during development
6. **Validation**: Validate all inputs (amount > 0, valid phone numbers, etc.)
7. **Transactions**: Use database transactions for operations that update multiple tables
8. **Indexes**: Add indexes on frequently queried fields (user_id, status, confirmation_link)

---

This API documentation provides all the endpoints needed for the Lekka frontend to function properly. Implement these endpoints with proper error handling, validation, and security measures.
