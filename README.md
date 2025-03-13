# Authentication System

A full-stack authentication system built with Node.js, Express, MongoDB, and React. The system includes user signup and login functionality with JWT-based authentication, cookies, and protected routes.

## Features

- User signup with email and password
- Password hashing using bcryptjs
- JWT authentication with HTTP-only cookies
- Protected routes (dashboard)
- Error handling middleware
- MongoDB database integration
- Form validation
- Cross-Origin Resource Sharing (CORS) support

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- cookie-parser for handling HTTP cookies

### Frontend

- React
- React Router for navigation
- Axios for HTTP requests
- Notistack for notifications

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install backend dependencies

```bash
cd server
npm install
```

3. Install frontend dependencies

```bash
cd client
npm install
```

4. Create a `.env` file in the server directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. Start the backend server

```bash
cd server
npm start
```

2. Start the frontend development server

```bash
cd client
npm run dev
```

## API Endpoints

### Authentication Routes

- `POST /signup` - Register a new user
- `POST /login` - Login user
- `GET /dashboard/:id` - Protected route for user dashboard

## Error Handling

The application includes centralized error handling for:

- Validation errors
- Authentication errors
- Duplicate email errors
- Server errors

## Security Features

- Password hashing
- HTTP-only cookies for JWT
- CORS configuration
- Input validation
- Protected routes with JWT verification

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

- Express.js documentation
- MongoDB documentation
- React documentation
- JWT.io
