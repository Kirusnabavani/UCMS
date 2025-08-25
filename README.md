# University Course Management System

A comprehensive University Course Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring role-based authentication, course management, and student registration capabilities.

## 🚀 Features

### Authentication & Authorization
- **Role-based authentication** (Admin, Student)
- **JWT-based authentication**
- **Secure password hashing**
- **Protected routes** based on user roles

### Admin Features
- **Dashboard** with comprehensive analytics and statistics
- **Course Management**: Add, edit, delete, and view all courses
- **Student Management**: View all registered students
- **Results Management**: Assign grades and manage student results
- **Real-time enrollment tracking**

### Student Features
- **Personal Dashboard** with academic overview
- **Course Browser**: Browse and search available courses
- **Course Registration**: Register for available courses
- **My Courses**: View registered courses and status
- **Results Viewer**: View grades and academic performance

### Technical Features
- **Responsive Design** for all device types
- **Modern UI/UX** with glass morphism effects
- **Real-time data updates**
- **Advanced search and filtering**
- **Data validation** on both frontend and backend
- **Security middleware** (Helmet, Rate limiting, CORS)

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API communication
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **Rate limiting** for API protection

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd university-cms
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/university-cms
   JWT_SECRET=your-super-secret-jwt-key-here
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   - Local MongoDB: `mongod`
   - Or use MongoDB Atlas cloud database

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ..  # If in backend directory
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Registrations
- `GET /api/registrations/my-courses` - Get student's courses
- `POST /api/registrations/register/:courseId` - Register for course
- `DELETE /api/registrations/:courseId` - Drop course
- `GET /api/registrations/course/:courseId` - Get course registrations (Admin)

## 👥 Default Accounts

After seeding the database:

### Admin Account
- **Email**: `admin@university.edu`
- **Password**: `admin123`

### Student Account
- **Email**: `student@university.edu`
- **Password**: `student123`

## 🏗️ Project Structure

```
university-cms/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── scripts/         # Database scripts
│   ├── server.js        # Express server
│   └── package.json
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   ├── types/           # TypeScript types
│   └── App.tsx
├── public/
└── package.json
```

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. **Prepare for deployment**
   - Ensure all environment variables are set
   - Update CORS origins for production
   - Set up MongoDB Atlas for cloud database

2. **Deploy to Railway**
   ```bash
   railway login
   railway init
   railway deploy
   ```

3. **Deploy to Render**
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically on push

### Frontend Deployment (Vercel/Netlify)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Deploy to Netlify**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt with salt rounds
- **Input Validation** using express-validator
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for secure cross-origin requests
- **Helmet.js** for security headers
- **Environment Variables** for sensitive data

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1024px and above)
- **Tablet** (768px - 1024px)
- **Mobile** (below 768px)

## 🎨 UI/UX Features

- **Glass Morphism Effects** for modern aesthetics
- **Smooth Animations** and transitions
- **Hover Effects** for interactive elements
- **Loading States** for better user experience
- **Error Handling** with user-friendly messages
- **Toast Notifications** for user feedback

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@university-cms.com or create an issue in the repository.

## 🔄 Future Enhancements

- **Real-time Notifications** using WebSockets
- **Advanced Analytics** and reporting
- **Email Integration** for notifications
- **File Upload** for course materials
- **Calendar Integration** for scheduling
- **Mobile App** using React Native
- **Advanced Search** with filters and sorting
- **Bulk Operations** for admin tasks

## 📊 Database Schema

### Users
- Authentication and profile information
- Role-based access control
- Student ID for academic tracking

### Courses
- Complete course information
- Enrollment tracking
- Status management

### Registrations
- Student-course relationships
- Registration status tracking
- Date tracking

### Results
- Grade management
- Feedback system
- Performance tracking

---

**Built with ❤️ using the MERN Stack**