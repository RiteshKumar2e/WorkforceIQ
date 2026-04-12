# WorkforceIQ - People Intelligence Application

WorkforceIQ is a comprehensive People Intelligence Platform designed for HR managers and shift managers to make data-driven workforce decisions. It provides tools for employee assessment, skill gap analysis, team composition evaluation, and promotion readiness tracking.

## 🎯 Features

- **Employee Management**: Comprehensive employee profiles with competency tracking
- **Assessment System**: Multiple assessment types (technical, behavioral, leadership, engagement)
- **Team Analysis**: Analyze team composition and generate team reports
- **Promotion Readiness**: Track promotion pipeline with three readiness levels
- **Training Alerts**: Automated flagging of training needs based on skill gaps
- **Dashboard Analytics**: Real-time insights into workforce metrics
- **Role-Based Access**: Three user roles - Shift Manager, Line Manager, HR Admin
- **Secure Authentication**: JWT-based authentication system

## 📋 System Requirements

- **Frontend**: Node.js 16+, React 18+
- **Backend**: Node.js 16+, npm or yarn
- **Database**: MongoDB 5.0+
- **Browser**: Chrome, Firefox, Safari, Edge (latest versions)

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance like MongoDB Atlas)
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd WorkforceIQ
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=WorkforceIQ
```

Start development server:
```bash
npm run dev
```
Frontend will be available at `http://localhost:3000`

### 3. Backend Setup

```bash
cd ../backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/workforceiq
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas (Cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/workforceiq
```

Start backend server:
```bash
npm run dev
```
Backend will be available at `http://localhost:5000`

### 4. Seed Sample Data (Optional)

```bash
cd backend
npm run seed
```

This will populate the database with sample users and employees.

## 📊 Demo Credentials

After seeding, use these credentials to test the application:

**Shift Manager:**
- Email: `manager1@munger.com`
- Password: `password123`

**Line Manager:**
- Email: `manager2@munger.com`
- Password: `password123`

**HR Admin:**
- Email: `hr@munger.com`
- Password: `password123`

## 🏗️ Project Structure

```
WorkforceIQ/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components (15 pages)
│   │   ├── styles/              # Centralized CSS (11 files)
│   │   ├── services/            # API service layer (7 services)
│   │   ├── hooks/               # Custom React hooks (4 hooks)
│   │   ├── context/             # State management contexts
│   │   ├── utils/               # Utility functions
│   │   ├── App.jsx              # Root component
│   │   └── main.jsx             # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── backend/
│   ├── config/                  # Configuration files (db, jwt)
│   ├── controllers/             # Route controllers (6 controllers)
│   ├── routes/                  # API routes (6 route files)
│   ├── models/                  # Database models (6 models)
│   ├── middlewares/             # Express middlewares (3 middleware)
│   ├── utils/                   # Utility functions
│   ├── seed/                    # Database seed data
│   ├── app.js                   # Express app setup
│   ├── server.js                # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── README.md    # This file
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/search?q=query` - Search employees

### Dashboard
- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/charts` - Get chart data

### Team
- `POST /api/team/analyze` - Analyze team composition
- `POST /api/team/report` - Generate team report

### Assessments
- `GET /api/assessments` - Get all assessments
- `POST /api/assessments` - Create assessment
- `GET /api/assessments/:id` - Get assessment by ID
- `POST /api/assessments/schedule` - Schedule assessment
- `POST /api/assessments/:assessmentId/results` - Submit assessment results
- `GET /api/assessments/scheduled` - Get scheduled assessments

### Training
- `GET /api/training/flags` - Get all training flags
- `GET /api/training/flags/:employeeId` - Get employee's training alerts
- `PUT /api/training/flags/:id` - Update training flag
- `POST /api/training/plans` - Create training plan
- `GET /api/training/plans` - Get training plans

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in with email/password
2. Server validates credentials and returns JWT token
3. Client stores token in localStorage
4. Token is sent with every request via Authorization header
5. Token expires after 7 days

## 👥 User Roles

### 1. Shift Manager
- View employee information
- Schedule assessments
- Track training alerts
- View team analytics
- Personal profile management

### 2. Line Manager
- All Shift Manager permissions
- Generate team reports
- Analyze team composition
- Access extended analytics

### 3. HR Admin
- All permissions
- Bulk assessment uploads
- Company-wide reporting
- System configuration
- User management

## 🗄️ Database Models

### User
- Email, Password, Name, Role
- Role: shift_manager, line_manager, hr_admin
- Timestamps: createdAt, updatedAt

### Employee
- Name, Email, Employee ID
- Competency Scores (Technical, Leadership, Communication)
- Engagement Score, Behavioral Profile
- Personality Traits (Big Five)
- Promotion Readiness Status
- Training Flags Array
- Related Assessments

### Assessment
- Employee ID, Assessment Type
- Scheduled Date, Completion Date
- Results (Score, Grade, Feedback)
- Status (pending, completed, cancelled)

### TrainingFlag
- Employee ID, Skill Gap
- Urgency Level (critical, high, medium, low)
- Training Type, Recommended Course
- Status (pending, in_progress, completed)

### Department
- Name, Code, Description
- Manager Reference
- Employees Array

### Notification
- User ID, Title, Message
- Type (alert, info, success, warning)
- Read Status

## 🎨 Frontend Features

### Pages (15 Total)
1. **Landing Page** - Public landing with features overview
2. **Login Page** - User authentication
3. **Register Page** - New account creation
4. **Dashboard** - Main dashboard with KPIs
5. **Employee List** - Searchable employee table
6. **Employee Profile** - Detailed employee information
7. **Team Builder** - Team composition analysis
8. **Promotion Readiness** - Promotion pipeline tracking
9. **Training Alerts** - Training needs flagging
10. **Assessment Schedule** - Assessment scheduling
11. **Assessment Upload** - Bulk assessment upload
12. **HR Admin Dashboard** - HR-specific analytics
13. **Reports** - Reports and analytics
14. **Settings** - User account settings
15. **NotFound** - 404 error page

### Component Library
- **Button** - Multiple variants (primary, secondary, success, warning, danger, outline, ghost)
- **Card** - Container component with header/body/footer
- **Badge** - Status badges with color variants
- **Input** - Form input with validation
- **Modal** - Dialog component
- **Table** - Data table with sorting
- **Loader** - Loading spinner
- **Navbar** - Top navigation
- **Sidebar** - Left sidebar navigation
- **Footer** - Application footer

### Design System
- **Color Scheme**: Light theme with blue primary (#3b82f6)
- **Spacing**: 12-step spacing scale
- **Typography**: System fonts + Menlo for monospace
- **Breakpoints**: 640px, 768px, 1024px, 1280px
- **Responsive**: Mobile-first design

## 🛠️ Development Workflow

### Frontend Development
```bash
cd frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev        # Start with nodemon (auto-reload)
npm start          # Start server
npm run seed       # Seed database
```

## 📦 Dependencies

### Frontend
- React 18.2.0
- React Router DOM 6.14.0
- Axios 1.4.0
- Recharts 2.8.0
- Vite 4.4.0

### Backend
- Express 4.18.2
- Mongoose 7.4.0
- bcryptjs 2.4.3
- jsonwebtoken 9.0.2
- express-validator 7.0.0

## 🔧 Configuration

### Backend Configuration

**Database Connection:**
- Development: `mongodb://localhost:27017/workforceiq`
- Production: Use MongoDB Atlas connection string

**JWT Secret:**
- Development: Use any string (not secure)
- Production: Use strong random string

**CORS:**
- Frontend URL: `http://localhost:3000`
- In production, update to actual frontend domain

### Frontend Configuration

**API Base URL:**
- Development: `http://localhost:5000`
- Production: Update to backend domain

## 🧪 Testing the Application

### Sample Test Cases

1. **User Registration**
   - Go to `/register`
   - Fill form with new credentials
   - Select role
   - Submit

2. **User Login**
   - Go to `/login`
   - Use: `manager1@munger.com` / `password123`
   - Verify dashboard loads

3. **View Employees**
   - Navigate to Employee List
   - View all employees
   - Use search to find specific employee
   - Click on employee to view profile

4. **Team Analysis**
   - Go to Team Builder
   - Select multiple employees
   - Analyze team composition
   - View balance metrics

5. **Training Alerts**
   - View Training Alerts page
   - See flagged employees
   - Sort by urgency level

## 📈 Performance Optimization

### Frontend
- Lazy loading of routes
- Code splitting with dynamic imports
- Optimized CSS with variables
- Responsive images and sizes
- Debounced search and filters

### Backend
- MongoDB indexing on frequently queried fields
- Pagination for large datasets
- Query optimization with select()
- Caching for repeated requests

## 🔒 Security Best Practices

1. **Password Security**
   - Passwords hashed with bcryptjs
   - Salt rounds: 10
   - Never store plain passwords

2. **JWT Tokens**
   - Signed with secret key
   - Expires after 7 days
   - Sent in Authorization header

3. **CORS Configuration**
   - Configured for frontend domain
   - Credentials allowed
   - Specific methods allowed

4. **Input Validation**
   - Server-side validation
   - Email format validation
   - Password strength validation
   - MongoDB injection prevention

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED
```
**Solution**: Ensure MongoDB is running. Start with `mongod` or use MongoDB Atlas.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in .env or kill process using the port.

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Ensure backend has CORS enabled and frontend URL is in allowed origins.

### JWT Token Errors
```
Invalid token
```
**Solution**: Clear localStorage, login again, or refresh the app.

## 📚 API Documentation

### Request Format
All requests should include:
```
Headers:
- Content-Type: application/json
- Authorization: Bearer <token>
```

### Response Format
All responses follow standard format:
```json
{
  "success": true/false,
  "message": "response message",
  "data": {},
  "errors": []
}
```

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist folder
```

### Backend Deployment (Heroku/Railway/AWS)
```bash
cd backend
npm start
# Ensure .env variables are set
```

## 📞 Support & Contributing

For issues, questions, or contributions, please follow these steps:

1. Create an issue with detailed description
2. Include steps to reproduce
3. Provide environment details
4. Submit pull request for fixes

## 📄 License

This project is licensed under ISC License.

## 👨‍💻 Author

Created as a comprehensive People Intelligence Platform for HR management.

---

**Last Updated**: 2024
**Version**: 1.0.0
