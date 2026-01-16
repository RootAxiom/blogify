# Blog App Backend [ reference for backend]

A simple MERN stack backend for a blog application with JWT authentication, user/admin roles, and blog post management.

## Features

- **User Authentication**: Register, login with JWT tokens
- **Role-based Access**: User and Admin roles
- **Blog Management**: Create, read, update, delete blog posts
- **Admin Panel**: Admin can manage all blogs
- **MongoDB Integration**: Using Mongoose ODM

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info (requires auth)

### Blogs
- `GET /api/blogs` - Get all published blogs (public)
- `GET /api/blogs/:id` - Get single blog (public)
- `POST /api/blogs` - Create new blog (requires auth)
- `PUT /api/blogs/:id` - Update blog (author/admin only)
- `DELETE /api/blogs/:id` - Delete blog (author/admin only)
- `GET /api/blogs/user/me` - Get current user's blogs (requires auth)
- `GET /api/blogs/admin/all` - Get all blogs including unpublished (admin only)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
MONGO_URI=404
JWT_SECRET=super secret stuff here 
PORT=5000
```

3. Start the server:
```bash
npm run dev
```

## Usage

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "sample user",
    "email": "test@test.com",
    "password": "password123",
    "role": "user"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a blog post (with auth token)
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my blog post...",
    "tags": ["tech", "programming"],
    "published": true
  }'
```

### Get all published blogs
```bash
curl http://localhost:5000/api/blogs
```

## Database Models

### User
- name (String, required)
- email (String, required, unique)
- password (String, required)
- role (String, enum: ['user', 'admin'], default: 'user')

### Blog
- title (String, required)
- content (String, required)
- author (ObjectId, ref: 'User', required)
- tags (Array of Strings)
- published (Boolean, default: false)
- timestamps (createdAt, updatedAt)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- express-validator
- CORS