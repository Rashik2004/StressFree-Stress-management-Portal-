# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register User

- **Endpoint**: `POST /auth/register`
- **Description**: Register a new user and get a JWT token.
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secretpassword",
    "stressTriggers": ["Work", "Exams"],
    "relaxationMethods": ["Meditation"]
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "_id": "6583...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```

### Login User

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticate user and get a JWT token.
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "secretpassword"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "_id": "6583...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```

### Get Current User

- **Endpoint**: `GET /auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Description**: Get profile of the currently logged-in user.
- **Response** (200 OK):
  ```json
  {
    "id": "6583...",
    "name": "John Doe",
    "email": "john@example.com",
    "stressTriggers": ["Work", "Exams"],
    "relaxationMethods": ["Meditation"]
  }
  ```
