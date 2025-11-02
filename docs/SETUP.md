# Wedding Planner - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd wedding-planner
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   **Backend (.env in backend folder):**
   ```env
   PORT=3000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=development
   ```
   
   **Frontend (.env in frontend folder):**
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_APP_NAME=Wedding Planner
   VITE_APP_VERSION=1.0.0
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run start` - Start both frontend and backend in production mode
- `npm run build` - Build frontend for production
- `npm run clean` - Clean all node_modules

### Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health

## 📁 Project Structure

```
wedding-planner/
├── frontend/           # React application
├── backend/           # Node.js API server
├── docs/             # Documentation
├── assets/           # Shared assets
└── package.json      # Root package configuration
```

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd backend
# Set environment variables on your platform
# Deploy the backend folder
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Contact Endpoints
- `POST /api/contact` - Submit contact form

### Booking Endpoints
- `POST /api/bookings` - Create wedding booking
- `GET /api/bookings` - Get user bookings (authenticated)
- `GET /api/bookings/:id` - Get specific booking

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your MongoDB Atlas connection string
   - Ensure IP whitelist includes your current IP
   - Verify database user credentials

2. **CORS Errors**
   - Ensure frontend URL is in backend CORS configuration
   - Check that both servers are running

3. **Build Errors**
   - Clear node_modules: `npm run clean`
   - Reinstall dependencies: `npm run install:all`

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review the API documentation
- Contact the development team
