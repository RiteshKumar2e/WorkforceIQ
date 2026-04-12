# WorkforceIQ Backend API

Node.js/Express backend for WorkforceIQ People Intelligence Application with MongoDB.

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Environment Setup
```bash
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb://localhost:27017/workforceiq
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

### Start Server
```bash
npm run dev      # Development with auto-reload
npm start        # Production
```

### Seed Database
```bash
npm run seed
```

## 📁 Project Structure

```
backend/
├── config/
│   ├── db.js            # MongoDB connection
│   └── jwt.js           # JWT utilities
├── controllers/         # Route handlers
│   ├── authController.js
│   ├── employeeController.js
│   ├── dashboardController.js
│   ├── assessmentController.js
│   ├── teamController.js
│   └── trainingController.js
├── models/             # Mongoose schemas
│   ├── User.js
│   ├── Employee.js
│   ├── Assessment.js
│   ├── TrainingFlag.js
│   ├── Department.js
│   └── Notification.js
├── routes/             # API routes
│   ├── authRoutes.js
│   ├── employeeRoutes.js
│   ├── dashboardRoutes.js
│   ├── assessmentRoutes.js
│   ├── teamRoutes.js
│   └── trainingRoutes.js
├── middlewares/        # Express middlewares
│   ├── authMiddleware.js
│   ├── validateMiddleware.js
│   └── errorMiddleware.js
├── utils/             # Utilities
│   └── responseHandler.js
├── seed/              # Database seeding
│   └── seedData.js
├── app.js             # Express app setup
├── server.js          # Server entry point
├── package.json
└── .env.example
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

### Authentication Endpoints

#### Register User
```
POST /auth/register
Body: { name, email, password, role, employeeId }
Response: { token, user }
```

#### Login
```
POST /auth/login
Body: { email, password }
Response: { token, user }
```

#### Get Profile
```
GET /auth/profile
Headers: Authorization: Bearer <token>
Response: { user }
```

#### Update Profile
```
PUT /auth/profile
Body: { name, department }
Response: { user }
```

#### Change Password
```
POST /auth/change-password
Body: { currentPassword, newPassword }
Response: { }
```

### Employee Endpoints

#### Get All Employees
```
GET /employees
Query: ?department=Production&status=active
Response: Array of employees
```

#### Get Employee by ID
```
GET /employees/:id
Response: { employee }
```

#### Create Employee
```
POST /employees
Body: Employee data
Response: { employee }
```

#### Update Employee
```
PUT /employees/:id
Body: { updated fields }
Response: { employee }
```

#### Delete Employee
```
DELETE /employees/:id
Response: { }
```

#### Search Employees
```
GET /employees/search?q=query
Response: Array of matching employees
```

### Dashboard Endpoints

#### Get Dashboard Data
```
GET /dashboard
Response: { totalEmployees, activeEmployees, trainingAlerts, promotionReady }
```

#### Get Dashboard Stats
```
GET /dashboard/stats
Response: { totalEmployees, activeEmployees, pendingAssessments, ... }
```

#### Get Chart Data
```
GET /dashboard/charts
Response: { engagementDistribution, promotionPipeline }
```

### Assessment Endpoints

#### Get Assessments
```
GET /assessments
Query: ?status=pending&type=technical
Response: Array of assessments
```

#### Create Assessment
```
POST /assessments
Body: { employeeId, assessmentType, scheduledDate }
Response: { assessment }
```

#### Get Assessment by ID
```
GET /assessments/:id
Response: { assessment }
```

#### Schedule Assessment
```
POST /assessments/schedule
Body: { employeeId, assessmentType, scheduledDate }
Response: { assessment }
```

#### Submit Assessment Results
```
POST /assessments/:assessmentId/results
Body: { score, grade, feedback }
Response: { assessment }
```

#### Get Scheduled Assessments
```
GET /assessments/scheduled
Response: Array of pending assessments
```

### Team Endpoints

#### Analyze Team
```
POST /team/analyze
Body: { employeeIds: [...] }
Response: { analysis metrics }
```

#### Generate Team Report
```
POST /team/report
Body: { employeeIds: [...] }
Response: { team report }
```

### Training Endpoints

#### Get Training Flags
```
GET /training/flags
Query: ?urgency=critical&status=pending
Response: Array of training flags
```

#### Get Employee Training Alerts
```
GET /training/flags/:employeeId
Response: Array of employee's training flags
```

#### Update Training Flag
```
PUT /training/flags/:id
Body: { status, targetCompletionDate }
Response: { flag }
```

#### Create Training Plan
```
POST /training/plans
Body: { employeeId, skillGap, urgency, trainingType }
Response: { flag }
```

#### Get Training Plans
```
GET /training/plans
Response: Array of active training plans
```

## 📊 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'shift_manager' | 'line_manager' | 'hr_admin',
  employeeId: String,
  department: String,
  status: 'active' | 'inactive',
  createdAt: Date,
  updatedAt: Date
}
```

### Employee
```javascript
{
  userId: ObjectId (ref: User),
  name: String,
  email: String,
  employeeId: String,
  department: String,
  designation: String,
  dateOfJoining: Date,
  technicalCompetency: Number (0-100),
  leadershipScore: Number (0-100),
  communicationScore: Number (0-100),
  engagementScore: Number (0-100),
  personality: {
    openness: Number,
    conscientiousness: Number,
    extraversion: Number,
    agreeableness: Number,
    neuroticism: Number
  },
  promotionReadiness: 'ready_now' | 'ready_3_6_months' | 'needs_development',
  trainingFlags: Array,
  assessments: [ObjectId] (ref: Assessment),
  status: 'active' | 'inactive',
  createdAt: Date,
  updatedAt: Date
}
```

### Assessment
```javascript
{
  employeeId: ObjectId (ref: Employee),
  assessmentType: 'technical' | 'behavioral' | 'leadership' | 'engagement',
  scheduledDate: Date,
  completionDate: Date,
  status: 'pending' | 'completed' | 'cancelled',
  results: {
    score: Number,
    grade: String,
    feedback: String
  },
  assessor: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### TrainingFlag
```javascript
{
  employeeId: ObjectId (ref: Employee),
  skillGap: String,
  urgency: 'critical' | 'high' | 'medium' | 'low',
  trainingType: String,
  recommendedCourse: String,
  status: 'pending' | 'in_progress' | 'completed',
  targetCompletionDate: Date,
  assignedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Department
```javascript
{
  name: String,
  code: String,
  description: String,
  manager: ObjectId (ref: User),
  employees: [ObjectId] (ref: Employee),
  createdAt: Date,
  updatedAt: Date
}
```

### Notification
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  message: String,
  type: 'alert' | 'info' | 'success' | 'warning',
  read: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication

### JWT Implementation
- Tokens expire after 7 days
- Include token in Authorization header: `Bearer <token>`
- Token payload contains: `{ id, role }`

### Password Security
- Passwords hashed with bcryptjs (10 salt rounds)
- Passwords never stored or logged in plain text

## 🧪 Testing

### Using Postman

1. **Register**
   - POST: `http://localhost:5000/api/auth/register`
   - Body: `{ "name": "John", "email": "john@test.com", "password": "test123", "role": "shift_manager" }`

2. **Login**
   - POST: `http://localhost:5000/api/auth/login`
   - Body: `{ "email": "manager1@munger.com", "password": "password123" }`
   - Copy token from response

3. **Get Employees**
   - GET: `http://localhost:5000/api/employees`
   - Header: `Authorization: Bearer <token>`

## 🚀 Deployment

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Environment Variables on Heroku
```bash
heroku config:set MONGODB_URI=<atlas-connection-string>
heroku config:set JWT_SECRET=<strong-secret>
heroku config:set NODE_ENV=production
```

### AWS EC2 / DigitalOcean
1. Install Node.js
2. Clone repository
3. Install dependencies
4. Set environment variables
5. Use PM2 for process management

## 📝 Error Handling

### Standard Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (duplicate)
- `500` - Server Error

## 🔄 Middleware Stack

1. **CORS** - Enable cross-origin requests
2. **JSON Parser** - Parse request body
3. **Auth Middleware** - Verify JWT token
4. **Validation Middleware** - Validate request data
5. **Error Middleware** - Handle errors

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT tokens
- **express-validator**: Input validation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

## 🛠️ Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server (auto-reload)
- `npm run seed` - Seed database with sample data

## 📞 Server Endpoints

- Health Check: `http://localhost:5000/api/health`
- All API routes: `http://localhost:5000/api/*`

---

**Version**: 1.0.0
**Node Version**: 16+
**Last Updated**: 2024
